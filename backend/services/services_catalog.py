"""
Home Services Catalog
"""

from models import ServiceInfo, ServiceCategory

SERVICES_CATALOG: list[ServiceInfo] = [
    ServiceInfo(
        id="plumbing",
        category=ServiceCategory.PLUMBING,
        name_ar="سباكة",
        name_en="Plumbing",
        description_ar="إصلاح التسريبات، الصنابير، الصرف، وخطوط المياه",
        description_en="Fix leaks, faucets, drainage, and water lines",
        common_problems=[
            "تسريب تحت الحوض",
            "انسداد الصرف",
            "الحنفية بتقطر",
            "ضغط المياه منخفض",
            "كسر في الأنبوب",
            "خزان المياه مسرب",
        ],
        avg_price_min=150,
        avg_price_max=500,
        price_unit="للزيارة + قطع الغيار",
        emergency_tips=[
            "أغلق صنبور المياه الرئيسي فورًا",
            "جفف المنطقة المتضررة",
            "اتصل بسباك فورًا",
        ],
        tools_needed=["مفتاح ربط", "لاصق سباكة", "حلقات مانعة للتسريب"],
    ),
    ServiceInfo(
        id="electricity",
        category=ServiceCategory.ELECTRICITY,
        name_ar="كهرباء",
        name_en="Electricity",
        description_ar="توصيلات كهربائية، إصلاح أعطال، تركيب قواطع",
        description_en="Electrical wiring, fault repair, breaker installation",
        common_problems=[
            "الكهرباء بتنقطع فجأة",
            "ماس كهربائي",
            "مفتاح بيطير",
            "اتجاه كهرباء وقع",
            "إضاءة بترمش",
            "أوتوماتيك بيطلع",
        ],
        avg_price_min=200,
        avg_price_max=800,
        price_unit="للزيارة + العمالة",
        emergency_tips=[
            "⚠️ افصل الكهرباء من اللوحة الرئيسية",
            "لا تلمس الأسلاك العارية",
            "اتصل بكهربائي فورًا",
        ],
        tools_needed=["مفك كهربائي", "لمبة اختبار", "شريط عازل"],
    ),
    ServiceInfo(
        id="painting",
        category=ServiceCategory.PAINTING,
        name_ar="نقاشة ودهانات",
        name_en="Painting",
        description_ar="دهان الحوائط والأسقف، تشطيب، ورق جدران",
        description_en="Wall and ceiling painting, finishing, wallpaper",
        common_problems=[
            "الدهان بيتقشر",
            "رطوبة في الحيطان",
            "تغيير لون الغرفة",
            "تشطيب شقة جديدة",
            "إصلاح تشققات",
        ],
        avg_price_min=25,
        avg_price_max=60,
        price_unit="لكل متر مربع",
        tools_needed=["فرشاة دهان", "رولة", "طاولة", "ورق مسكة", "بطارية"],
    ),
    ServiceInfo(
        id="ac",
        category=ServiceCategory.AC,
        name_ar="تكييفات",
        name_en="Air Conditioning",
        description_ar="تركيب وصيانة وإعادة تعبئة غاز التكييفات",
        description_en="AC installation, maintenance, and gas refill",
        common_problems=[
            "التكييف مش بيبرد",
            "التكييف بيسرب مياه",
            "صوت غريب في التكييف",
            "ريموت مش شغال",
            "التكييف مش بيشتغل أصلًا",
            "الغاز خلص",
        ],
        avg_price_min=200,
        avg_price_max=1500,
        price_unit="حسب الخدمة",
        emergency_tips=[
            "لو ريحة غريبة، افصل التكييف فورًا",
            "نظف الفلاتر كل شهر",
        ],
        tools_needed=["مانومتر للغاز", "برشام تنظيف", "فلتر احتياطي"],
    ),
    ServiceInfo(
        id="ceramic",
        category=ServiceCategory.CERAMIC,
        name_ar="سيراميك وبلاط",
        name_en="Ceramic & Tiles",
        description_ar="تركيب وإصلاح السيراميك والرخام والباركيه",
        description_en="Installation and repair of ceramic, marble, and parquet",
        common_problems=[
            "بلاطة مكسورة",
            "سيراميك طالع",
            "تركيب سيراميك جديد",
            "تنظيف وجيهات",
            "تغيير جزء من الأرضية",
        ],
        avg_price_min=80,
        avg_price_max=200,
        price_unit="لكل متر مربع",
        tools_needed=["لاصق سيراميك", "شلموز", "مستوى ميزان", "فاصل بلاط"],
    ),
    ServiceInfo(
        id="carpentry",
        category=ServiceCategory.CARPENTRY,
        name_ar="نجارة",
        name_en="Carpentry",
        description_ar="أعمال الأخشاب، أبواب، نوافذ، مطابخ، دواليب",
        description_en="Woodwork, doors, windows, kitchens, wardrobes",
        common_problems=[
            "الباب مش بينفتح",
            "شبك الباب مكسور",
            "تصليح خزانة",
            "تركيب مطبخ",
            "باب بيصفر",
        ],
        avg_price_min=300,
        avg_price_max=2000,
        price_unit="حسب الشغلة",
        tools_needed=["مسمار خشب", "غراء خشب", "مفك", "مطرقة"],
    ),
    ServiceInfo(
        id="gypsum",
        category=ServiceCategory.GYPSUM,
        name_ar="جبس بورد",
        name_en="Gypsum Board",
        description_ar="أسقف جبس بورد، تقسيمات، ديكورات جبس",
        description_en="Gypsum board ceilings, partitions, plaster decorations",
        common_problems=[
            "تركيب سقف جبس بورد",
            "إصلاح جبس بورد مكسور",
            "إضافة إضاءة مخفية",
            "تقسيم غرفة",
            "تشطيب السقف",
        ],
        avg_price_min=150,
        avg_price_max=400,
        price_unit="لكل متر مربع",
        tools_needed=["ألواح جبس", "هيكل معدني", "براغي جبس", "فلين عازل"],
    ),
    ServiceInfo(
        id="cleaning",
        category=ServiceCategory.CLEANING,
        name_ar="خدمات النظافة",
        name_en="Cleaning Services",
        description_ar="نظافة شاملة، تنظيف سجاد، خزانات، تعقيم",
        description_en="Full cleaning, carpet cleaning, tanks, sanitization",
        common_problems=[
            "نظافة شاملة للشقة",
            "تنظيف ما بعد التشطيب",
            "تنظيف الخزان",
            "تنظيف موكيت وسجاد",
            "تعقيم المكان",
        ],
        avg_price_min=500,
        avg_price_max=3000,
        price_unit="للشقة كاملة",
        tools_needed=["مواد تنظيف", "مكنسة كهربائية", "ماكينة بخار"],
    ),
    ServiceInfo(
        id="appliances",
        category=ServiceCategory.APPLIANCES,
        name_ar="صيانة الأجهزة",
        name_en="Appliance Maintenance",
        description_ar="صيانة غسالة، ثلاجة، بوتاجاز، سخان، ميكرويف",
        description_en="Washing machine, fridge, stove, heater maintenance",
        common_problems=[
            "الغسالة مش بتعصر",
            "الثلاجة مش بتبرد",
            "البوتاجاز مش بيشتغل",
            "السخان مش بسخن",
            "الميكرويف بيطلع شرر",
        ],
        avg_price_min=100,
        avg_price_max=600,
        price_unit="للزيارة + قطع الغيار",
        emergency_tips=[
            "⚠️ لو السخان بيدي ماس، افصل الكهرباء فورًا",
            "لا تستخدم الجهاز لحد ما الفني يشوفه",
        ],
        tools_needed=["قطع غيار أصلية", "أدوات صيانة"],
    ),
    ServiceInfo(
        id="network",
        category=ServiceCategory.NETWORK,
        name_ar="انترنت وكاميرات",
        name_en="Network & Cameras",
        description_ar="تركيب راوتر، شبكة داخلية، كاميرات مراقبة",
        description_en="Router installation, internal network, CCTV cameras",
        common_problems=[
            "تركيب كاميرات مراقبة",
            "مد كابل انترنت",
            "تركيب راوتر",
            "تركيب شبكة داخلية",
            "الانترنت بطيء",
        ],
        avg_price_min=200,
        avg_price_max=2000,
        price_unit="حسب عدد النقاط",
        tools_needed=["كابل UTP", "رجاجة كابل", "سويتش شبكة", "كاميرات IP"],
    ),
    ServiceInfo(
        id="finishing",
        category=ServiceCategory.FINISHING,
        name_ar="تشطيبات وديكور",
        name_en="Finishing & Decoration",
        description_ar="تشطيب شقق، ديكورات داخلية، ترميم",
        description_en="Apartment finishing, interior decoration, renovation",
        common_problems=[
            "تشطيب شقة جديدة",
            "تجديد شقة قديمة",
            "ترميم جزئي",
            "تحسين الديكور",
        ],
        avg_price_min=1000,
        avg_price_max=10000,
        price_unit="حسب المساحة والتشطيب",
        tools_needed=["متعددة حسب نوع التشطيب"],
    ),
]


def get_all_services() -> list[ServiceInfo]:
    return SERVICES_CATALOG


def get_service_by_category(category: ServiceCategory) -> ServiceInfo | None:
    for svc in SERVICES_CATALOG:
        if svc.category == category:
            return svc
    return None


def get_service_by_id(service_id: str) -> ServiceInfo | None:
    for svc in SERVICES_CATALOG:
        if svc.id == service_id:
            return svc
    return None
