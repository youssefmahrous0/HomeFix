"""
Pydantic Data Models
"""

from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from enum import Enum
from datetime import datetime


# ─── Enums ────────────────────────────────────────────────────────────────────

class ServiceCategory(str, Enum):
    PLUMBING = "plumbing"
    ELECTRICITY = "electricity"
    PAINTING = "painting"
    FINISHING = "finishing"
    CARPENTRY = "carpentry"
    AC = "ac"
    CERAMIC = "ceramic"
    GYPSUM = "gypsum"
    CLEANING = "cleaning"
    APPLIANCES = "appliances"
    NETWORK = "network"
    GENERAL = "general"


class EmergencyLevel(str, Enum):
    NONE = "none"
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"


# ─── Chat Models ──────────────────────────────────────────────────────────────

class ChatMessage(BaseModel):
    role: MessageRole
    content: str
    timestamp: Optional[datetime] = Field(default_factory=datetime.utcnow)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    session_id: Optional[str] = None
    location: Optional[str] = None
    history: Optional[List[Dict[str, str]]] = []

    class Config:
        json_schema_extra = {
            "example": {
                "message": "عندي تسريب مياه تحت الحوض",
                "session_id": "user_123",
                "location": "القاهرة - مدينة نصر",
                "history": []
            }
        }


class ChatResponse(BaseModel):
    reply: str
    session_id: str
    detected_service: Optional[str] = None
    emergency_level: EmergencyLevel = EmergencyLevel.NONE
    emergency_message: Optional[str] = None
    suggested_technicians: Optional[List[Dict[str, Any]]] = None
    price_estimate: Optional[Dict[str, Any]] = None
    tips: Optional[List[str]] = None
    follow_up_questions: Optional[List[str]] = None


# ─── Technician Models ────────────────────────────────────────────────────────

class Technician(BaseModel):
    id: str
    name: str
    name_ar: str
    specialty: ServiceCategory
    specialty_ar: str
    rating: float = Field(ge=0, le=5)
    reviews_count: int
    location: str
    location_ar: str
    phone: str
    available: bool = True
    price_range: str
    price_range_ar: str
    years_experience: int
    verified: bool = False
    response_time: str  # e.g., "30 mins"


class TechnicianSearchRequest(BaseModel):
    service: Optional[ServiceCategory] = None
    location: Optional[str] = None
    max_results: int = Field(default=5, le=20)

    class Config:
        json_schema_extra = {
            "example": {
                "service": "plumbing",
                "location": "القاهرة",
                "max_results": 5
            }
        }


# ─── Service Models ───────────────────────────────────────────────────────────

class ServiceInfo(BaseModel):
    id: str
    category: ServiceCategory
    name_ar: str
    name_en: str
    description_ar: str
    description_en: str
    common_problems: List[str]
    avg_price_min: int
    avg_price_max: int
    price_unit: str
    emergency_tips: Optional[List[str]] = None
    tools_needed: Optional[List[str]] = None


# ─── Recommendation Models ────────────────────────────────────────────────────

class RecommendationRequest(BaseModel):
    problem_description: str
    location: Optional[str] = None
    budget: Optional[int] = None
    urgency: Optional[str] = "normal"

    class Config:
        json_schema_extra = {
            "example": {
                "problem_description": "الكهرباء بتنقطع في أوضة النوم",
                "location": "الجيزة",
                "budget": 500,
                "urgency": "normal"
            }
        }


class RecommendationResponse(BaseModel):
    problem_summary: str
    recommended_service: ServiceCategory
    recommended_technicians: List[Technician]
    estimated_cost: Dict[str, Any]
    urgency_level: EmergencyLevel
    tips: List[str]
    warning: Optional[str] = None
