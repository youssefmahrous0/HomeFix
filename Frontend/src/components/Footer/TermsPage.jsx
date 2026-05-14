import { icon } from "leaflet";

export default function TermsPage() {

  const sections = [
    {
      title: "تعريفات عامة",
      icon:(
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"
  />

  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M14 3v5h5"
  />

  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M9 13h6"
  />

  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M9 17h4"
  />
</svg>
      ),
      items: [
        "تطبيق HomeFix هو منصة إلكترونية لربط مقدمي الخدمات المنزلية بالعملاء في جمهورية مصر العربية",
        "المستخدم: أي شخص يستخدم التطبيق سواء كان عميل أو مقدم خدمة",
        "مقدم الخدمة: الفني أو الحرفي المسجل في المنصة لتقديم الخدمات المنزلية",
        "العميل: الشخص الذي يطلب الخدمة من خلال التطبيق",
      ],
    },
    {
      title: "الموافقة على الشروط",
      icon: (
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <circle
    cx="12"
    cy="12"
    r="9"
    strokeWidth="2"
  />

  <path
    d="M8 12L11 15L16 9"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
      ),
      items: [
        "باستخدامك لتطبيق HomeFix فإنك توافق على جميع الشروط والأحكام الواردة في هذه الصفحة",
        "يحق لنا تعديل هذه الشروط في أي وقت وسيتم إشعار المستخدمين عند حدوث أي تحديثات",
        "استمرارك في استخدام التطبيق بعد التعديلات يعني موافقتك على الشروط المعدلة",
        "يجب أن يكون عمرك أكبر من 18 عامًا لاستخدام خدماتنا",
      ],
    },
    {
      title: "التزامات المستخدم",
      icon:(
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M12 3L5 6V11C5 16 8.5 19 12 21C15.5 19 19 16 19 11V6L12 3Z"
  />
</svg>
      ),
      items: [
        "تقديم معلومات صحيحة ودقيقة عند التسجيل في التطبيق",
        "الحفاظ على سرية بيانات الحساب وعدم مشاركتها مع الغير",
        "استخدام التطبيق لأغراض قانونية فقط",
        "عدم نشر محتوى مسيء أو غير قانوني أو ينتهك حقوق الآخرين",
      ],
    },
    {
      title: "التزامات مقدمي الخدمة",
      icon: (
      <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <circle
    cx="12"
    cy="12"
    r="9"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M12 8V12"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <circle cx="12" cy="16" r="1" fill="currentColor" />
</svg>
      ),
      items: [
        "تقديم الخدمات بجودة عالية وفي الوقت المحدد",
        "الالتزام بقواعد السلامة والتعليمات الفنية المتعارف عليها",
        "الالتزام بالمواعيد المحددة مع العملاء",
        "التعامل باحترام واحترافية مع العملاء",
        "عدم طلب رسوم إضافية خارج التطبيق",
      ],
    },
    {
      title: "الرسوم والدفع",
      icon: (
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"
  />

  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M14 3v5h5"
  />

  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M9 13h6"
  />

  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M9 17h4"
  />
</svg>
      ),
      items: [
        "يتم تحديد رسوم الخدمة من قبل مقدم الخدمة ويتم توضيحها قبل تأكيد الحجز",
        "قد يتم فرض رسوم إضافية حسب نوع الخدمة المطلوبة",
        "طرق الدفع المتاحة تشمل الدفع النقدي أو الإلكتروني",
        "في حالة إلغاء الحجز المتأخر قد يتم فرض رسوم إلغاء",
        "في حالة التأخير الشديد يحق للعميل طلب تعويض مناسب للخدمة",
      ],
    },
     {
      title: "الإلغاء والاسترجاع",
      icon: (
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <circle
    cx="12"
    cy="12"
    r="9"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M12 8V12"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <circle cx="12" cy="16" r="1" fill="currentColor" />
</svg>
      ),
      items: [
        "يحق للعميل إلغاء الطلب قبل 24 ساعة من الموعد المحدد دون أي رسوم",
        "قد يتم خصم رسوم جزئية في حالة الإلغاء المتأخر",
        "إذا كانت الخدمة غير مطابقة للمواصفات يحق للعميل طلب استرداد جزئي أو كامل",
        "تتم مراجعة طلبات الاسترجاع خلال 7-14 يوم عمل",
      ],
    },
    {
      title: "المسؤولية وإخلاء المسؤولية",
      icon: (
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M12 3L5 6V11C5 16 8.5 19 12 21C15.5 19 19 16 19 11V6L12 3Z"
  />
</svg>
      ),
      items: [
        "يعمل التطبيق كوسيط بين العملاء ومقدمي الخدمات",
        "لا نتحمل المسؤولية عن سوء استخدام الخدمة",
        "ننصح بالتحقق من جودة الخدمة قبل إنهائها",
        "لا تتحمل المنصة أي أضرار ناتجة عن سوء الاستخدام",
      ],
    },
    {
      title: "حماية البيانات والخصوصية",
      icon: (
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M12 3L5 6V11C5 16 8.5 19 12 21C15.5 19 19 16 19 11V6L12 3Z"
  />
</svg>
      ),
      items: [
        "نحن ملتزمون بحماية بياناتك الشخصية",
        "لن نشارك بياناتك مع أي طرف ثالث دون موافقتك",
        "يتم استخدام البيانات لتحسين جودة الخدمات فقط",
        "يمكنك طلب حذف بياناتك في أي وقت",
      ],
    },
    {
      title: "إنهاء الحساب",
      icon: (
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <circle
    cx="12"
    cy="12"
    r="9"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M12 8V12"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <circle cx="12" cy="16" r="1" fill="currentColor" />
</svg>
      ),
      items: [
        "يحق لك إلغاء حسابك في أي وقت",
        "يحق لنا إيقاف أي حساب يخالف الشروط والأحكام",
        "قد يتم حذف الحساب نهائيًا في حالة الانتهاكات المتكررة",
      ],
    },
    {
      title: "القانون الحاكم",
      icon: (
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"
  />

  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M14 3v5h5"
  />

  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M9 13h6"
  />

  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M9 17h4"
  />
</svg>
      ),
      items: [
        "تخضع هذه الشروط لقوانين جمهورية مصر العربية",
        "أي نزاع يتم حله وفقًا للقوانين المحلية",
        "المحاكم المصرية هي المختصة بالنظر في أي نزاعات",
      ],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* PAGE TITLE */}
        <div className="text-center mb-12">

          <div className="w-20 h-20 rounded-full bg-green-600 mx-auto flex items-center justify-center mb-5">

            {/* DOCUMENT SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3h6l4 4v14H5V3h4z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 9h6"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6"
              />
            </svg>

          </div>

          <h2 className="text-4xl font-bold mb-3">
            الشروط والأحكام
          </h2>

          <p className="text-gray-500">
            يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام تطبيق HomeFix
          </p>

          <p className="text-gray-400 text-sm mt-2">
            آخر تحديث: أبريل 2026
          </p>

        </div>

        {/* INTRO */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mb-8">

          <h3 className="font-bold text-lg mb-4">
            مقدمة
          </h3>

          <p className="text-gray-600 leading-8">
            مرحباً بك في HomeFix، منصتك الموثوقة للخدمات المنزلية في مصر. هذه الشروط والأحكام تحدد القواعد والأنظمة الخاصة باستخدام تطبيق HomeFix.
 <br />
نحن نهتم بتوفير تجربة آمنة وموثوقة لجميع مستخدمينا، سواء كانوا عملاء أو مقدمي خدمات. لذا نرجو منك قراءة هذه الشروط بعناية والموافقة عليها قبل البدء في استخدام خدماتنا.
          </p>

        </div>

        {/* SECTIONS */}
        <div className="space-y-6">

          {sections.map((section, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-white/80 p-8"
            >

              {/* TITLE */}
              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white">
  {section.icon}
</div>

                <h3 className="text-2xl font-bold">
                  {index + 1}. {section.title}
                </h3>

              </div>

              {/* ITEMS */}
              <ul className="space-y-4">

                {section.items.map((item, i) => (

                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-600 leading-8"
                  >

                    {/* CHECK SVG */}
                    <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
>
  {/* circle */}
  <path
    d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4"
    stroke="#16A34A"
    strokeWidth="2.5"
    strokeLinecap="round"
  />

  {/* check */}
  <path
    d="M8.5 12L11 14.5L16.5 9"
    stroke="#16A34A"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

                    {item}

                  </li>

                ))}

              </ul>

            </div>

          ))}

        </div>

        {/* CONTACT */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mt-8 text-right">

          <h3 className="font-bold text-2xl mb-4">
            تواصل معنا
          </h3>

          <p className="text-gray-600 mb-4">
            إذا كان لديك أي استفسار حول الشروط والأحكام يرجى التواصل معنا
          </p>

          <div className="space-y-2 text-gray-700">
            <p>البريد الإلكتروني: support@homefix.com</p>
            <p>الهاتف: 16666</p>
            <p>العنوان: القاهرة، مصر</p>
          </div>

        </div>
        {/* NOTICE */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mt-8">

          <div className="flex items-start gap-3">

            <svg xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-yellow-500 mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
            </svg>

            <div>
              <h4 className="font-bold text-yellow-700 mb-2">
إقرار واتفاق
              </h4>

              <p className="text-gray-600 leading-7">
                باستخدامك لتطبيق HomeFix، فإنك تقر بأنك قرأت وفهمت ووافقت على جميع الشروط والأحكام الواردة أعلاه. إذا كنت لا توافق
على هذه الشروط يرجى عدم استخدام التطبيق.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}