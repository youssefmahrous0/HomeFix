import { useState } from "react";
import {
  Search,
  ChevronDown,
  Phone,
  Mail,
  ClipboardList ,
  MessageCircle,
} from "lucide-react";

export default function FAQPage() {
  const faqSections = [
    {
      title: "عام",
      icon: <ClipboardList size={20} className="text-amber-600" />,
      questions: [
        {
          q: "ما هو تطبيق HomeFix؟",
          a: "هوم فيكس منصة تربط العملاء بمقدمي الخدمات المنزلية بسهولة وأمان. يمكنك العثور على فنيين متخصصين وحجز الخدمات المنزلية بكل سهولة.",
        },
        {
          q: "كيف أقوم بالتسجيل في التطبيق؟",
          a: "يمكنك التسجيل باستخدام البريد الإلكتروني أو رقم الهاتف.",
        },
        {
          q: "هل استخدام التطبيق مجاني؟",
          a: "نعم، استخدام التطبيق مجاني للعملاء.",
        },
        {
          q: "في أي مناطق يعمل التطبيق؟",
          a: "نعمل في العديد من المدن والمناطق ويتم التوسع باستمرار.",
        },
      ],
    },
    {
      title: "الحجوزات والطلبات",
      icon: "📅",
      questions: [
        {
          q: "كيف أحجز خدمة؟",
          a: "اختر الخدمة ثم الفني المناسب واضغط حجز.",
        },
        {
          q: "كم يستغرق وصول الفني؟",
          a: "يعتمد على المنطقة ومقدم الخدمة.",
        },
        {
          q: "هل يمكنني تحديد فني معين؟",
          a: "نعم يمكنك تحديد التاريخ والوقت المناسبين.",
        },
        {
          q: "كيف أتتبع حالة طلبي؟",
          a: "من خلال صفحة الطلبات داخل التطبيق.",
        },
      ],
    },
    {
      title: "الدفع والأسعار",
      icon: "💳",
      questions: [
        {
          q: "ما هي طرق الدفع المتاحة؟",
          a: "بطاقات بنكية، تحويل بنكي، والدفع النقدي.",
        },
        {
          q: "كيف يتم تحديد الأسعار؟",
          a: "حسب نوع الخدمة والوقت المطلوب.",
        },
        {
          q: "هل يمكنني الحصول على فاتورة؟",
          a: "نعم يتم إصدار فاتورة بعد إتمام الخدمة.",
        },
        {
          q: "ما هي سياسة الاسترجاع؟",
          a: "يمكنك طلب استرداد المبلغ في الحالات التي تنطبق عليها شروط الاسترجاع وفق سياسة HomeFix، وسيتم مراجعة الطلب خلال فترة زمنية محددة.",
        },
      ],
    },
    {
      title: "الجودة والأمان",
      icon: "⭐",
      questions: [
        {
          q: "كيف تضمنون جودة الخدمة؟",
          a: "جميع الفنيين يتم مراجعتهم وتقييمهم باستمرار.",
        },
        {
          q: "هل الفنيون مدربون و مؤهلون؟",
          a: "نعم يتم التحقق من بياناتهم وخبراتهم.",
        },
        {
          q: "كيف يمكنني تقييم الخدمة؟",
          a: "بعد اكتمال الخدمة ستظهر لك إمكانية تقييم مقدم الخدمة وإضافة تعليق لمشاركة تجربتك.",
        },
        {
          q: "ماذا أفعل إذا كانت هناك مشكلة في الخدمة؟",
          a: "يمكنك التواصل مع الدعم الفني مباشرة.",
        },
      ],
    },
    {
      title: "الحساب والإعدادات",
      icon: "⚙️",
      questions: [
        {
          q: "كيف أغير كلمة المرور؟",
          a: "من الإعدادات ثم الحساب.",
        },
        {
          q: "هل يمكنني حذف حسابي؟",
          a: "نعم من إعدادات الحساب.",
        },
        {
          q: "كيف أضيف عنواناً جديداً؟",
          a: "من الملف الشخصي أو صفحة العناوين، اضغط على 'إضافة عنوان جديد' ثم أدخل بيانات العنوان واحفظ التغييرات.",
        },
        {
          q: "كيف أتحكم في الإشعارات؟",
          a: "من صفحة الإعدادات والإشعارات.",
        },
      ],
    },
  ];

  const [search, setSearch] = useState("");

  return (
    <div dir="rtl" className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="pt-16 pb-10 text-center">
        <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mx-auto shadow-lg">
  <svg
    width="40"
    height="40"
    viewBox="0 0 117 117"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="58.5"
      cy="58.5"
      r="48.5"
      stroke="white"
      strokeWidth="8"
    />

    <path
      d="M58.5 76C61.2614 76 63.5 78.2386 63.5 81C63.5 83.7614 61.2614 86 58.5 86C55.7386 86 53.5 83.7614 53.5 81C53.5 78.2386 55.7386 76 58.5 76Z"
      fill="white"
    />

    <path
      d="M58.5 30C47.7304 30 40 37.2602 40 47.0588C40 49.8202 42.2386 52.0588 45 52.0588C47.7614 52.0588 50 49.8202 50 47.0588C50 42.9489 53.5837 40 58.5 40C63.4163 40 67 42.9489 67 47.0588C67 50.1176 65.2571 52.1849 61.4839 55.1176C56.3548 59.0441 53.5 62.9412 53.5 69V70C53.5 72.7614 55.7386 75 58.5 75C61.2614 75 63.5 72.7614 63.5 70V69.4412C63.5 65.9559 64.8065 64.1618 68.129 61.6176C73.4032 57.5735 77 53.4044 77 47.0588C77 37.2602 69.2696 30 58.5 30Z"
      fill="white"
    />
  </svg>
</div>

        <h1 className="mt-6 text-3xl md:text-4xl font-bold text-gray-800">
          الأسئلة الشائعة
        </h1>

        <p className="mt-3 text-gray-500 text-sm">
          نجيب على جميع استفساراتك حول خدماتنا
        </p>
      </section>

      <div className="max-w-md lg:max-w-4xl mx-auto px-4 pb-16">
        {/* Search */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن سؤال..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 pr-12 outline-none focus:border-green-500"
            />

            <Search
              size={18}
              className="absolute right-4 top-3.5 text-gray-400"
            />
          </div>
        </div>

        {/* FAQ Sections */}
        {faqSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{section.icon}</span>

              <h2 className="text-xl font-bold text-gray-700">
                {section.title}
              </h2>
            </div>

            {section.questions
              .filter((item) =>
                item.q.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, i) => (
                <FAQItem
                  key={i}
                  item={item}
                  defaultOpen={sectionIndex === 0 && i === 0}
                />
              ))}
          </div>
        ))}

        {/* Contact Card */}
        <div className="mt-10 rounded-2xl border border-green-100 bg-green-50 p-6">
          <h3 className="text-xl font-bold text-gray-800">
            لم تجد إجابة لسؤالك؟
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            فريق الدعم لدينا مستعد لمساعدتك في أي وقت.
          </p>

          <div className="mt-5 space-y-3">
            <button className="w-full h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              <Phone size={18} />
              اتصل بنا
            </button>

            <button className="w-full h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              <MessageCircle size={18} />
              واتساب
            </button>

            <button className="w-full h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              <Mail size={18} />
              البريد الإلكتروني
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ item, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-3 overflow-hidden">

      <button
  onClick={() => setOpen(!open)}
  className="w-full px-4 py-4 flex  items-center gap-3"
>
  <span className="flex-1 text-right text-sm md:text-base font-medium text-gray-700">
    {item.q}
  </span>

  <ChevronDown
    size={18}
    className={`text-gray-400 transition-transform ${
      open ? "rotate-180" : ""
    }`}
  />
</button>
      {open && (
        <div className="border-t bg-gray-50 px-4 py-4 text-sm text-gray-600 leading-7">
          {item.a}
        </div>
      )}
    </div>
  );
}