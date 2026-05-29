"""
AI Service Layer - Supports Claude, OpenAI, and Cohere
"""

import json
import logging
import uuid
from typing import Optional, List, Dict, Any
from datetime import datetime

from config import settings
from prompts import SYSTEM_PROMPT, EMERGENCY_DETECTION_PROMPT, SERVICE_DETECTION_PROMPT, PRICE_ESTIMATION_PROMPT
from models import EmergencyLevel, ServiceCategory

logger = logging.getLogger("home_services_ai.ai_service")

# ─── In-Memory Session Store ──────────────────────────────────────────────────
_sessions: Dict[str, List[Dict]] = {}


def get_or_create_session(session_id: Optional[str]) -> tuple[str, List[Dict]]:
    if not session_id:
        session_id = str(uuid.uuid4())
    if session_id not in _sessions:
        _sessions[session_id] = []
    return session_id, _sessions[session_id]


def update_session(session_id: str, role: str, content: str):
    if session_id not in _sessions:
        _sessions[session_id] = []
    _sessions[session_id].append({"role": role, "content": content})
    # Keep only last N messages
    max_history = settings.MAX_CONVERSATION_HISTORY
    if len(_sessions[session_id]) > max_history:
        _sessions[session_id] = _sessions[session_id][-max_history:]


def clear_session(session_id: str):
    if session_id in _sessions:
        del _sessions[session_id]


# ─── Claude (Anthropic) Provider ─────────────────────────────────────────────
async def _call_claude(messages: List[Dict], system: str = SYSTEM_PROMPT) -> str:
    try:
        import anthropic
        client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)
        response = await client.messages.create(
            model=settings.CLAUDE_MODEL,
            max_tokens=settings.MAX_TOKENS,
            system=system,
            messages=messages,
        )
        return response.content[0].text
    except Exception as e:
        logger.error(f"Claude API error: {e}")
        raise


# ─── OpenAI Provider ──────────────────────────────────────────────────────────
async def _call_openai(messages: List[Dict], system: str = SYSTEM_PROMPT) -> str:
    try:
        import openai
        client = openai.AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        full_messages = [{"role": "system", "content": system}] + messages
        response = await client.chat.completions.create(
            model=settings.OPENAI_MODEL,
            messages=full_messages,
            max_tokens=settings.MAX_TOKENS,
        )
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"OpenAI API error: {e}")
        raise


# ─── Cohere Provider ──────────────────────────────────────────────────────────
async def _call_cohere(messages: List[Dict], system: str = SYSTEM_PROMPT) -> str:
    try:
        import cohere
        client = cohere.AsyncClientV2(api_key=settings.COHERE_API_KEY)
        cohere_messages = [{"role": "system", "content": system}] + messages
        response = await client.chat(
            model=settings.COHERE_MODEL,
            messages=cohere_messages,
            max_tokens=settings.MAX_TOKENS,
        )
        return response.message.content[0].text
    except Exception as e:
        logger.error(f"Cohere API error: {e}")
        raise


# ─── Unified AI Call ──────────────────────────────────────────────────────────
async def call_ai(messages: List[Dict], system: str = SYSTEM_PROMPT) -> str:
    provider = settings.AI_PROVIDER.lower()
    logger.info(f"Calling AI provider: {provider} | Messages: {len(messages)}")

    if provider == "claude":
        return await _call_claude(messages, system)
    elif provider == "openai":
        return await _call_openai(messages, system)
    elif provider == "cohere":
        return await _call_cohere(messages, system)
    else:
        raise ValueError(f"Unknown AI provider: {provider}")


# ─── Emergency Detection ──────────────────────────────────────────────────────
async def detect_emergency(message: str) -> Dict[str, Any]:
    prompt = f"{EMERGENCY_DETECTION_PROMPT}\n\nMessage: {message}"
    try:
        result = await call_ai(
            [{"role": "user", "content": prompt}],
            system="You are an emergency detection system. Return ONLY valid JSON, no extra text."
        )
        # Strip markdown code fences if present
        clean = result.strip().replace("```json", "").replace("```", "").strip()
        return json.loads(clean)
    except Exception as e:
        logger.error(f"Emergency detection error: {e}")
        return {"is_emergency": False, "level": "none", "type": "none"}


# ─── Service Detection ────────────────────────────────────────────────────────
async def detect_service(message: str) -> Dict[str, Any]:
    prompt = f"{SERVICE_DETECTION_PROMPT}\n\nMessage: {message}"
    try:
        result = await call_ai(
            [{"role": "user", "content": prompt}],
            system="You are a service classification system. Return ONLY valid JSON, no extra text."
        )
        clean = result.strip().replace("```json", "").replace("```", "").strip()
        return json.loads(clean)
    except Exception as e:
        logger.error(f"Service detection error: {e}")
        return {"service": "general", "confidence": 0.0, "keywords": []}


# ─── Price Estimation ─────────────────────────────────────────────────────────
async def estimate_price(message: str, service: str) -> Dict[str, Any]:
    prompt = f"{PRICE_ESTIMATION_PROMPT}\n\nService: {service}\nRequest: {message}"
    try:
        result = await call_ai(
            [{"role": "user", "content": prompt}],
            system="You are a pricing estimation system for Egyptian home services. Return ONLY valid JSON."
        )
        clean = result.strip().replace("```json", "").replace("```", "").strip()
        return json.loads(clean)
    except Exception as e:
        logger.error(f"Price estimation error: {e}")
        return {"min_price": 0, "max_price": 0, "unit": "للزيارة", "notes_ar": "غير متاح"}


# ─── Main Chat Handler ────────────────────────────────────────────────────────
async def process_chat(
    message: str,
    session_id: Optional[str] = None,
    location: Optional[str] = None,
    history: Optional[List[Dict]] = None,
) -> Dict[str, Any]:

    session_id, session_history = get_or_create_session(session_id)

    # Merge provided history into session
    if history:
        for msg in history:
            if msg not in session_history:
                session_history.append(msg)

    # Add location context to message if provided
    user_message = message
    if location:
        user_message = f"[الموقع: {location}]\n{message}"

    # Build messages for API
    api_messages = session_history + [{"role": "user", "content": user_message}]

    # Run detections in parallel
    import asyncio
    emergency_task = asyncio.create_task(detect_emergency(message))
    service_task = asyncio.create_task(detect_service(message))

    # Get main AI response
    reply = await call_ai(api_messages)

    # Await detection results
    emergency_info = await emergency_task
    service_info = await service_task

    # Update session
    update_session(session_id, "user", user_message)
    update_session(session_id, "assistant", reply)

    # Map emergency level
    level_map = {
        "none": EmergencyLevel.NONE,
        "low": EmergencyLevel.LOW,
        "medium": EmergencyLevel.MEDIUM,
        "high": EmergencyLevel.HIGH,
        "critical": EmergencyLevel.CRITICAL,
    }
    emergency_level = level_map.get(emergency_info.get("level", "none"), EmergencyLevel.NONE)

    # Get price estimate for service requests
    price_estimate = None
    if service_info.get("confidence", 0) > 0.5 and service_info.get("service") != "general":
        price_estimate = await estimate_price(message, service_info.get("service", ""))

    return {
        "reply": reply,
        "session_id": session_id,
        "detected_service": service_info.get("service"),
        "emergency_level": emergency_level,
        "emergency_message": emergency_info.get("warning_ar") if emergency_info.get("is_emergency") else None,
        "price_estimate": price_estimate,
    }
