export default function PrivacyPage() {

  const sections = [
    {
      title: "المعلومات التي نجمعها",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 3L5 6V11C5 16 8.5 19 12 21C15.5 19 19 16 19 11V6L12 3Z" />
        </svg>
      ),
      groups: [
        {
          heading: "معلومات الحساب",
          items: [
            "الاسم الكامل",
            "عنوان البريد الإلكتروني",
            "رقم الهاتف",
            "العنوان الفعلي",
            "تاريخ الميلاد",
          ],
        },
        {
          heading: "معلومات الخدمة",
          items: [
            "تفاصيل الطلبات والحجوزات",
            "سجل المعاملات و المدفوعات",
            "التقييمات والمراجعات",
            "التواصل  مع مقدمي الخدمات",
          ],
        },
        {
          heading: "معلومات تقنية",
          items: [
            "عنوان IP",
            " نوع المتصفح و الجهاز",
             "نظام التشغيل ",
            "بيانات الموقع الجغرافي ",
          ],
        },
      ],
    },

    {
      title: "كيف نستخدم معلوماتك",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="9" strokeWidth="2" />
          <path d="M8 12l3 3 5-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      groups: [
        {
          heading: "تحسين الخدمات",
          items: [
            "تقديم و تحسين خدمتنا",
            "تخصيص تجربتك في التطبيق ",
            "معاجة الحجوزات والمدفوعات",
          ],
        },
        {
          heading: "الأمان والحماية ",
          items: [
            "  حماية حسابك من الاستخدام غير المصرح به",
            "منع الاحتيال و الأنشطة المشبوهة",
            "الامتثال للمتطلبات القانونية ",
          ],
        },
        {
          heading: "التسويق والتواصل ",
          items: [
            "ارسال اشعارات حول الخدمات الجديدة",
            "عروض و تخفضيات خاصة",
            "استطلاعات الرأي لتحسين الخدمة",
          ],
        },
      ],
    },

    {
      title: "مشاركة المعلومات",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 9h8M8 13h6M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
      ),
      groups: [
        {
          heading: "مع مقدمي الخدمات",
          items: [
            "نشارك معلومات التواصل والعنوان مع مقدم الخدمة لإتمام الطلب",
            "يتم مشاركة المعلومات الضرورية فقط لإنجاز الخدمة",
          ],
        },
        {
          heading: "مع شركاء الدفع",
          items: [
            "معلومات الدفع مع معالجي الدفع المعتمدين",
            "لا نحتفظ بمعلومات البطاقات الائتمانية على خوادمنا",
          ],
        },
        {
          heading: "مع الجهات القانونية",
          items: [
            " قد نشارك المعلومات مع الجهات الحكومية عند الطلب القانوني",
            "في حالات التحقيق في أنشطة احتيالية أو غير قانونية",
          ],
        },
      ],
    },

    {
      title: "حماية البيانات",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 3L5 6V11C5 16 8.5 19 12 21C15.5 19 19 16 19 11V6L12 3Z" />
        </svg>
      ),
      groups: [
        {
          heading: "التدابير الأمنية",
          items: [
            "تشفير البيانات باستخدام SSL/TLS",
            "تخزين آمن على خوادم محمية",
            "مراقبة مستمرة للأنشطة المشبوهة",
            " تحديثات أمنية دورية",
          ],
        },
        {
          heading: "الوصول إلى البيانات",
          items: [
            " الوصول محدود للموظفين المصرح لهم فقط",
            "استخدام كلمات مرور قوية ومصادقة ثنائية",
            "سجلات وصول مفصلة",
          ],
        },
      ],
    },

    {
  title: "حقوقك",
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
        strokeWidth={2}
        d="M12 3L5 6V11C5 16 8.5 19 12 21C15.5 19 19 16 19 11V6L12 3Z"
      />
    </svg>
  ),
  groups: [
    {
      heading: "حقوق المستخدم",
      items: [
        "الوصول إلى بياناتك الشخصية",
        "تصحيح البيانات غير الدقيقة",
        " حذف حسابك و بياناتك",
        "الاعتراض على معالجة بياناتك",
        " تحميل نسخة من بياناتك",
      ],
    },
    {
      heading: "إلغاء الاشتراك",
      items: [
        "يمكنك إلغاء الاشتراك في الرسائل التسويقية",
        "ستستمر في تلقي الرسائل المتعلقة بالخدمة",
      ],
    },
  ],
},

{
  title: "ملفات تعريف الارتباط (Cookies)",
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
        strokeWidth={2}
        d="M9 12h6m-6 4h6M9 8h3m3-5H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7l-4-4z"
      />
    </svg>
  ),
  groups: [
    {
      heading: "أنواع Cookies المستخدمة",
      items: [
        "ملفات ضرورية: لتشغيل التطبيق بشكل صحيح",
        "ملفات الأداء: لتحليل استخدام التطبيق",
        "ملفات التسويق: لعرض إعلانات مخصصة",
      ],
    },
    {
      heading: "إدارة Cookies",
      items: [
        "يمكنك تعطيل Cookies من إعدادات المتصفح",
        "قد يؤثر ذلك على بعض وظائف التطبيق",
      ],
    },
  ],
},

{
  title: "الاحتفاظ بالبيانات",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  ),
  groups: [
    {
      heading: "مدة الاحتفاظ",
      items: [
        "نحتفظ بالبيانات طالما كان حسابك نشطاً",
        "بعد حذف الحساب، نحتفظ ببعض البيانات لفترة قانونية",
        "يتم حذف البيانات نهائياً بعد 3 سنوات من إغلاق الحساب",
      ],
    },
  ],
},

{
  title: "خصوصية الأطفال",
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
        strokeWidth={2}
        d="M12 3L5 6V11C5 16 8.5 19 12 21C15.5 19 19 16 19 11V6L12 3Z"
      />
    </svg>
  ),
  groups: [
    {
      heading: "حماية الأطفال",
      items: [
        "خدماتنا مخصصة للأشخاص البالغين (18 عاماً فأكثر)",
        "لا نجمع معلومات من الأطفال دون 18 عاماً عمداً",
        "إذا علمنا بجمع بيانات طفل، سنحذفها فوراً",
      ],
    },
  ],
},
    
  ];

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="text-center mb-12">

          <div className="w-20 h-20 rounded-full bg-green-600 mx-auto flex items-center justify-center mb-5">

            {/* Shield SVG */}
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
                d="M12 3L5 6V11C5 16 8.5 19 12 21C15.5 19 19 16 19 11V6L12 3Z"
              />
            </svg>

          </div>

          <h1 className="text-4xl font-bold mb-3">
            سياسة الخصوصية
          </h1>

          <p className="text-gray-500">
نحن ملتزمون بحماية خصوصيتك وأمان معلوماتك الشخصية
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
           في HomeFix، نحن نقدر ثقتك وتلتزم بحماية خصوصيتك، توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا ومشاركتنا المعلوماتك الشخصية  استخدامك لتطبيقنا.
<br />
تستخدم أحدث التقنيات الأمنية لضمان حماية بياناتك وتلتزم بجميع القوانين واللوائح المتعلقة بحماية البيانات في جمهورية مصر العربية.
          </p>

        </div>

        {/* SECTIONS */}
        <div className="space-y-6">

          {sections.map((section, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl border border-white/80 shadow-sm p-8"
            >

              {/* TITLE */}
              <div className="flex items-center gap-3 mb-8">

                <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white">
                  {section.icon}
                </div>

                <h3 className="text-2xl font-bold">
                  {index + 1}. {section.title}
                </h3>

              </div>

              {/* GROUPS */}
              <div className="space-y-8">

                {section.groups.map((group, i) => (

                  <div key={i}>

                    <h4 className="font-bold text-gray-800 mb-4">
                      {group.heading}
                    </h4>

                    <ul className="space-y-3">

                      {group.items.map((item, idx) => (

                        <li
                          key={idx}
                          className="flex items-start gap-3 text-gray-600"
                        >

                          {/* Check SVG */}
                          <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-6 h-6 text-green-500"
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
    d="M8 12l3 3 5-6"
    strokeWidth="2"
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

            </div>

          ))}

        </div>

        {/* NOTICE */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 mt-8">

  <div className="text-right">

    <h4 className="font-bold text-3xl text-gray-800 mb-8">
      التحديثات على السياسة
    </h4>

    <p className="text-gray-600 leading-9 text-lg mb-10">
      قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإشعارك بأي تغييرات
      جوهرية عبر:
    </p>

    <div className="space-y-6">

     {/* ITEM */}
<div className="flex items-center gap-4 text-gray-700 justify-start">

  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-7 h-7 text-yellow-600 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>

  <span className="text-2xl">
    إشعار داخل التطبيق
  </span>

</div>
      {/* ITEM */}
      <div className="flex items-center justify-start gap-4 text-gray-700">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-yellow-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        <span className="text-2xl">
          رسالة بريد إلكتروني
        </span>

      </div>

      {/* ITEM */}
      <div className="flex items-center justify-start gap-4 text-gray-700">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-yellow-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        <span className="text-2xl">
          تحديث تاريخ "آخر تحديث" في أعلى هذه الصفحة
        </span>

      </div>

    </div>

  </div>

</div>

        {/* CONTACT */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mt-8 text-right">

          <h3 className="font-bold text-2xl mb-4">
            تواصل معنا
          </h3>

          <p className="text-gray-600 mb-4">
إذا كان لديك أي أسئلة أو مخاوف بشأن سياسة الخصوصية أو ممارسات البيانات لدينا، يرجى التواصل معنا:
          </p>

          <div className="space-y-2 text-gray-700">
            <p>مسؤول حماية البيانات : privacy@homefix.com</p>
            <p>البريد الكتروني : support@homefix.com</p>
            <p>الهاتف : 16666</p>
            <p> العنوان : القاهرة، مصر</p>
          </div>

        </div>

      </div>

    </div>
  );
}