"""
Technician Database & Search Service
"""

import random
import logging
from typing import List, Optional
from models import Technician, ServiceCategory

logger = logging.getLogger("home_services_ai.technician_service")

# ─── Mock Technician Database ─────────────────────────────────────────────────
TECHNICIANS_DB: List[Technician] = [
    # Plumbers
    Technician(
        id="tech_001", name="Ahmed Saber", name_ar="أحمد صابر",
        specialty=ServiceCategory.PLUMBING, specialty_ar="سباك",
        rating=4.8, reviews_count=127, location="Cairo - Nasr City",
        location_ar="القاهرة - مدينة نصر", phone="01012345678",
        price_range="150-400 EGP", price_range_ar="١٥٠-٤٠٠ جنيه",
        years_experience=12, verified=True, response_time="30 دقيقة",
    ),
    Technician(
        id="tech_002", name="Mohamed Hassan", name_ar="محمد حسن",
        specialty=ServiceCategory.PLUMBING, specialty_ar="سباك",
        rating=4.5, reviews_count=89, location="Cairo - Heliopolis",
        location_ar="القاهرة - مصر الجديدة", phone="01123456789",
        price_range="200-500 EGP", price_range_ar="٢٠٠-٥٠٠ جنيه",
        years_experience=8, verified=True, response_time="45 دقيقة",
    ),
    Technician(
        id="tech_003", name="Karim Plumber", name_ar="كريم السباك",
        specialty=ServiceCategory.PLUMBING, specialty_ar="سباك",
        rating=4.2, reviews_count=43, location="Giza - Mohandessin",
        location_ar="الجيزة - المهندسين", phone="01234567890",
        price_range="100-300 EGP", price_range_ar="١٠٠-٣٠٠ جنيه",
        years_experience=5, verified=False, response_time="ساعة",
    ),

    # Electricians
    Technician(
        id="tech_004", name="Samir Electrician", name_ar="سمير الكهربائي",
        specialty=ServiceCategory.ELECTRICITY, specialty_ar="كهربائي",
        rating=4.9, reviews_count=215, location="Cairo - Dokki",
        location_ar="القاهرة - الدقي", phone="01098765432",
        price_range="200-600 EGP", price_range_ar="٢٠٠-٦٠٠ جنيه",
        years_experience=20, verified=True, response_time="20 دقيقة",
    ),
    Technician(
        id="tech_005", name="Tarek Electric", name_ar="طارق للكهرباء",
        specialty=ServiceCategory.ELECTRICITY, specialty_ar="كهربائي",
        rating=4.6, reviews_count=98, location="Alexandria",
        location_ar="الإسكندرية", phone="01187654321",
        price_range="250-500 EGP", price_range_ar="٢٥٠-٥٠٠ جنيه",
        years_experience=10, verified=True, response_time="40 دقيقة",
    ),

    # Painters
    Technician(
        id="tech_006", name="Hassan Painter", name_ar="حسن النقاش",
        specialty=ServiceCategory.PAINTING, specialty_ar="نقاش",
        rating=4.7, reviews_count=156, location="Cairo - Zamalek",
        location_ar="القاهرة - الزمالك", phone="01011223344",
        price_range="25-60 EGP/m²", price_range_ar="٢٥-٦٠ جنيه/م²",
        years_experience=15, verified=True, response_time="ساعتين",
    ),
    Technician(
        id="tech_007", name="Ramadan Colors", name_ar="رمضان للدهانات",
        specialty=ServiceCategory.PAINTING, specialty_ar="نقاش",
        rating=4.3, reviews_count=67, location="Giza - 6th October",
        location_ar="الجيزة - ٦ أكتوبر", phone="01055667788",
        price_range="20-50 EGP/m²", price_range_ar="٢٠-٥٠ جنيه/م²",
        years_experience=7, verified=False, response_time="3 ساعات",
    ),

    # AC Technicians
    Technician(
        id="tech_008", name="Ice Cool AC", name_ar="أيس كول للتكييفات",
        specialty=ServiceCategory.AC, specialty_ar="فني تكييفات",
        rating=4.8, reviews_count=312, location="Cairo - All Areas",
        location_ar="القاهرة - جميع المناطق", phone="01099887766",
        price_range="200-1500 EGP", price_range_ar="٢٠٠-١٥٠٠ جنيه",
        years_experience=18, verified=True, response_time="ساعة",
    ),
    Technician(
        id="tech_009", name="Khalid AC Master", name_ar="خالد ماستر تكييف",
        specialty=ServiceCategory.AC, specialty_ar="فني تكييفات",
        rating=4.5, reviews_count=143, location="Giza - Haram",
        location_ar="الجيزة - الهرم", phone="01033445566",
        price_range="300-1200 EGP", price_range_ar="٣٠٠-١٢٠٠ جنيه",
        years_experience=12, verified=True, response_time="ساعتين",
    ),

    # Carpenters
    Technician(
        id="tech_010", name="Nasser Carpenter", name_ar="ناصر النجار",
        specialty=ServiceCategory.CARPENTRY, specialty_ar="نجار",
        rating=4.6, reviews_count=88, location="Cairo - Shubra",
        location_ar="القاهرة - شبرا", phone="01044556677",
        price_range="300-2000 EGP", price_range_ar="٣٠٠-٢٠٠٠ جنيه",
        years_experience=22, verified=True, response_time="يوم واحد",
    ),

    # Ceramic & Tiles
    Technician(
        id="tech_011", name="Gamal Ceramic", name_ar="جمال للسيراميك",
        specialty=ServiceCategory.CERAMIC, specialty_ar="فني سيراميك",
        rating=4.7, reviews_count=201, location="Cairo - New Cairo",
        location_ar="القاهرة - القاهرة الجديدة", phone="01066778899",
        price_range="80-200 EGP/m²", price_range_ar="٨٠-٢٠٠ جنيه/م²",
        years_experience=14, verified=True, response_time="يوم واحد",
    ),

    # Gypsum Board
    Technician(
        id="tech_012", name="Shehab Gypsum", name_ar="شهاب للجبس بورد",
        specialty=ServiceCategory.GYPSUM, specialty_ar="فني جبس بورد",
        rating=4.5, reviews_count=76, location="Cairo - Maadi",
        location_ar="القاهرة - المعادي", phone="01077889900",
        price_range="150-400 EGP/m²", price_range_ar="١٥٠-٤٠٠ جنيه/م²",
        years_experience=9, verified=True, response_time="يومين",
    ),

    # Cleaning
    Technician(
        id="tech_013", name="Sparkling Clean", name_ar="سباركلينج كلين",
        specialty=ServiceCategory.CLEANING, specialty_ar="خدمات تنظيف",
        rating=4.6, reviews_count=445, location="Cairo - All Areas",
        location_ar="القاهرة - جميع المناطق", phone="01088990011",
        price_range="500-3000 EGP", price_range_ar="٥٠٠-٣٠٠٠ جنيه",
        years_experience=6, verified=True, response_time="ساعتين",
    ),

    # Appliances
    Technician(
        id="tech_014", name="Fix It Fast", name_ar="فكس إت فاست",
        specialty=ServiceCategory.APPLIANCES, specialty_ar="صيانة أجهزة",
        rating=4.4, reviews_count=132, location="Cairo - Heliopolis",
        location_ar="القاهرة - مصر الجديدة", phone="01099001122",
        price_range="100-500 EGP", price_range_ar="١٠٠-٥٠٠ جنيه",
        years_experience=11, verified=True, response_time="ساعة",
    ),

    # Network & Cameras
    Technician(
        id="tech_015", name="Tech Vision", name_ar="تك فيجن للشبكات",
        specialty=ServiceCategory.NETWORK, specialty_ar="فني شبكات وكاميرات",
        rating=4.8, reviews_count=178, location="Cairo - All Areas",
        location_ar="القاهرة - جميع المناطق", phone="01000112233",
        price_range="200-2000 EGP", price_range_ar="٢٠٠-٢٠٠٠ جنيه",
        years_experience=8, verified=True, response_time="ساعة",
    ),
]


# ─── Service Functions ────────────────────────────────────────────────────────

def get_all_technicians() -> List[Technician]:
    return TECHNICIANS_DB


def get_technician_by_id(tech_id: str) -> Optional[Technician]:
    for tech in TECHNICIANS_DB:
        if tech.id == tech_id:
            return tech
    return None


def search_technicians(
    service: Optional[ServiceCategory] = None,
    location: Optional[str] = None,
    max_results: int = 5,
) -> List[Technician]:
    results = TECHNICIANS_DB.copy()

    # Filter by service
    if service:
        results = [t for t in results if t.specialty == service]

    # Filter by location (fuzzy match)
    if location:
        location_lower = location.lower()
        location_words = location_lower.split()
        filtered = []
        for tech in results:
            tech_loc = tech.location_ar.lower() + " " + tech.location.lower()
            # Match if any location word found in technician location
            if any(word in tech_loc for word in location_words) or "all areas" in tech.location.lower():
                filtered.append(tech)
        if filtered:
            results = filtered

    # Sort by rating
    results.sort(key=lambda t: (t.rating, t.reviews_count), reverse=True)

    return results[:max_results]


def get_technicians_by_service(service: ServiceCategory) -> List[Technician]:
    return [t for t in TECHNICIANS_DB if t.specialty == service]
