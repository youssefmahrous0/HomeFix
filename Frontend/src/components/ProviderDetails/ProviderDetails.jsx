import React, { useEffect, useState } from "react";
import { useParams , useNavigate  } from "react-router-dom";
import icon27 from "../../assets/Icon27.svg";
import icon26 from "../../assets/Icon26.svg";
import icon25 from "../../assets/Icon25.svg";


export default function ProviderDetails() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [tab, setTab] = useState("services");
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);
  
const handleFavorite = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("لازم تسجل دخول الأول ❤️");
    return;
  }

  const res = await fetch("http://https://homefix-production-0bc9.up.railway.app/favorite/toggle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.id,
      provider_id: Number(id),
    }),
  });

  const data = await res.json();
  setIsFav(data.is_favorite);
};

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🧾 1. جلب بيانات الفني
  fetch(`http://https://homefix-production-0bc9.up.railway.app/providers/${id}`)
    .then(res => res.json())
    .then(data => setProvider(data));

  // ❤️ 2. check لو في المفضلة
  if (user) {
    fetch("http://https://homefix-production-0bc9.up.railway.app/favorite/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        provider_id: Number(id),
      }),
    })
      .then(res => res.json())
      .then(data => setIsFav(data.is_favorite));
  }

}, [id]);

  if (!provider)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen text-right">

      {/* ================= HEADER ================= */}
<div className="bg-green-600 text-white px-20 py-16 mt-15">

  <div className="max-w-5xl ml-auto">

    {/* الصف الأول */}
    <div className="flex items-start gap-6">

      {/* 🔵 الصورة */}
      <div className="relative mt-2">
        <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center text-green-600 text-3xl">
          {provider?.name?.charAt(0) || "م"}
        </div>

        <span className="absolute bottom-1 right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white"></span>
      </div>

      {/* 🔴 المحتوى */}
      <div className="text-right">

        {/* الاسم */}
        <h1 className="text-3xl font-bold leading-tight">
          {provider.name}
        </h1>

        {/* الوظيفة */}
        <p className="text-sm opacity-90 mb-3">
          {provider.job}
        </p>

        {/* badges */}
        <div className="flex gap-3 mb-4 flex-wrap text-sm">

          <span className="bg-green-500 px-4 py-1 rounded-full">
            ⭐ {provider.rating} ({provider.reviews || 120})
          </span>

          <span className="bg-green-500 px-4 py-1 rounded-full">
            {provider.experience} سنوات خبرة
          </span>

          <span className="bg-green-500 px-4 py-1 rounded-full">
            {provider.orders} طلب مكتمل
          </span>

        </div>

        {/* الوصف */}
        <p className="text-sm leading-6 opacity-90 mb-4 max-w-2xl">
          {provider.bio || "فني محترف متخصص في جميع أعمال الصيانة المنزلية والتجارية، يقدم خدمات بجودة عالية وسرعة."}
        </p>

        {/* المهارات */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {provider?.skills?.map((s, i) => (
            <span key={i} className="bg-green-400 px-4 py-1.5 rounded-full text-sm">
              {s}
            </span>
          ))}
        </div>

        {/* الأزرار */}
        <div className="flex gap-3 flex-wrap">

          <button onClick={() => navigate(`/booking/${provider.id}`)}
           className="bg-white text-green-600 px-6 py-2 rounded-lg flex items-center gap-2"> احجز الآن
          </button>

          <button className="bg-white text-green-600 px-6 py-2 rounded-lg flex items-center gap-2">
            <img src={icon27}/>   اتصال بالفني 
          </button>

          <button className="bg-white text-green-600 px-6 py-2 rounded-lg flex items-center gap-2">
            <img src={icon26} /> واتساب
          </button>

          <button
  onClick={handleFavorite}
  className={`px-6 py-2 rounded-lg flex items-center gap-2 transition
    ${isFav ? "bg-red-100 text-red-600" : "bg-white text-green-600"}
  `}
>
  <img src={icon25} className="w-5 h-5" />
  {isFav ? "في المفضلة" : "المفضلة"}
</button>

        </div>

      </div>
    </div>

  </div>
</div>



    <div className="bg-gray-100 py-10 px-6">
        <div className="max-w-7xl mx-auto space-y-6">

    {/* معلومات الفني */}
   <div className="bg-white p-6 rounded-2xl shadow-sm">
     <h2 className="font-bold text-lg mb-6 text-left"> معلومات الفني </h2>

      <div className="grid grid-cols-2 gap-6 text-sm">

     {/* 🔹 مناطق العمل */}
      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">

       {/* 🔸 الأيقونة (شمال) */}
       <div className="bg-green-600 text-white w-11 h-11 flex items-center justify-center rounded-lg">
         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeWidth="2" d="M12 21s-6-5.6-6-10a6 6 0 1112 0c0 4.4-6 10-6 10z"/>
           <circle cx="12" cy="11" r="2.5"/>
         </svg>
       </div>

       {/* 🔸 النص */}
       <div>
         <p className="text-gray-500 mb-2">مناطق العمل</p>

         <div className="flex gap-2 flex-wrap">
           {provider.location?.split(",").map((loc, i) => (
             <span key={i} className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
               {loc}
             </span>
           ))}
         </div>
       </div>

     </div>

     {/* 🔹 زمن الاستجابة */}
     <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">

       <div className="bg-green-600 text-white w-11 h-11 flex items-center justify-center rounded-lg">
         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <circle cx="12" cy="12" r="9" strokeWidth="2"/>
           <path strokeWidth="2" d="M12 7v5l3 2"/>
         </svg>
       </div>

       <div>
         <p className="text-gray-500 mb-1">وقت الاستجابة</p>
         <p className="font-bold text-gray-800">
           {provider.time || "30 دقيقة"}
         </p>
       </div>

     </div>

    {/* 🔹 معدل الطلب */}
    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">

      <div className="bg-green-600 text-white w-11 h-11 flex items-center justify-center rounded-lg">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" d="M3 17l6-6 4 4 7-7"/>
        </svg>
      </div>

      <div>
        <p className="text-gray-500 mb-1">معدل الطلب</p>
        <p className="font-bold text-gray-800">98%</p>
      </div>

    </div>

    {/* 🔹 سعر الزيارة */}
    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">

      <div className="bg-yellow-400 text-white w-11 h-11 flex items-center justify-center rounded-lg">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <text x="50%" y="50%" textAnchor="middle" dy=".35em" fontSize="16">$</text>
        </svg>
      </div>

      <div>
        <p className="text-gray-500 mb-1">سعر الزيارة</p>
        <p className="font-bold text-green-600">
          {provider.price} جنيه
        </p>
      </div>

    </div>
  </div>
</div>


    {/* Tabs */}
<div className="bg-gray-200 p-1 rounded-full flex justify-between max-w-xl mx-auto">

  <button
    onClick={() => setTab("portfolio")}
    className={`flex-1 py-2 text-sm rounded-full transition ${
      tab === "portfolio"
        ? "bg-white shadow text-black font-semibold"
        : "text-gray-500"
    }`}
  >
    معرض الأعمال
  </button>

  <button
    onClick={() => setTab("services")}
    className={`flex-1 py-2 text-sm rounded-full transition ${
      tab === "services"
        ? "bg-white shadow text-black font-semibold"
        : "text-gray-500"
    }`}
  >
    الخدمات والأسعار
  </button>

  <button
    onClick={() => setTab("reviews")}
    className={`flex-1 py-2 text-sm rounded-full transition ${
      tab === "reviews"
        ? "bg-white shadow text-black font-semibold"
        : "text-gray-500"
    }`}
  >
    التقييمات
  </button>

</div>

    {/* الخدمات */}
    {tab === "services" && (
      <div className="grid grid-cols-2 gap-4">
        {provider?.services?.map((s) => (
          <div key={s.id} className="bg-white p-4 rounded-2xl border hover:shadow transition">

            <div className="flex gap-3 items-center">
              <div className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-lg">
                🔧
              </div>

              <div>
                <h3 className="font-bold">{s.name}</h3>
                <p className="text-sm text-gray-500">
                  خدمة احترافية مقدمة بجودة عالية
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>
    )}


   {/* ================= SIDEBAR ================= */}
<div className="bg-white p-6 rounded-2xl shadow-sm text-sm">

  {/* 🔹 العنوان */}
  <h3 className="font-bold mb-5 text-right">اتصل بالفني</h3>

  {/* 🔹 زر احجز */}
  <button className="bg-green-600 text-white w-full py-3 rounded-lg mb-3 hover:bg-green-700 transition">
    احجز الآن
  </button>

  {/* 🔹 اتصال */}
  <button className="border w-full py-2 rounded-lg mb-2 flex items-center justify-center gap-2 hover:bg-gray-50">
    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" d="M3 5a2 2 0 012-2h2l2 5-2 2a16 16 0 007 7l2-2 5 2v2a2 2 0 01-2 2h-1C10 21 3 14 3 6V5z"/>
    </svg>
    اتصال
  </button>

  {/* 🔹 واتساب */}
  <button className="border w-full py-2 rounded-lg flex items-center justify-center gap-2 mb-5 hover:bg-gray-50">
    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" d="M21 12a9 9 0 10-3 6l3 1-1-3a9 9 0 001-4z"/>
    </svg>
    واتساب
  </button>

  {/* ================= ساعات العمل ================= */}

   {/* 🔹 الصف الأساسي */}
  <div className="border-t border-dashed border-gray-300 py-6">

  {/* 🔹 العنوان */}
  <div className="flex items-center gap-2 text-gray-600 mb-4">

    <div className="bg-gray-100 p-2 rounded-lg">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2"/>
        <path strokeWidth="2" d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
    </div>

    <span>ساعات العمل</span>
  </div>

  {/* 🔹 الصفوف */}
  <div className="space-y-2 text-sm">

    {/* الصف 1 */}
    <div className="flex justify-between">
      <span className="text-gray-400">السبت - الخميس</span>
      <span>8 ص - 10 م</span>
    </div>

    {/* الصف 2 */}
    <div className="flex justify-between">
      <span className="text-gray-400">الجمعة</span>
      <span>2 م - 10 م</span>
    </div>

    {/* الصف 3 */}
    <div className="flex justify-between">
      <span className="text-gray-400">طوارئ</span>
      <span>متاح 24/7</span>
    </div>

  </div>

</div>
  {/* 🔻 خط متقطع */}
  <div className="border-t border-dashed border-gray-300 my-5"></div>

  {/* ================= الإحصائيات ================= */}
  <div className="mb-5">

    <h4 className="font-bold mb-4 text-right">الإحصائيات</h4>

    <div className="space-y-3">

      <div className="flex justify-between">
        <span className="text-gray-500">الطلبات المكتملة</span>
        <span>{provider.orders}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">معدل الاستجابة</span>
        <span className="text-green-600 font-bold">98%</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">متوسط وقت الوصول</span>
        <span>45 دقيقة</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-500">تقييم العملاء</span>

        <div className="flex items-center gap-1">
          <span>{provider.rating}</span>

          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17l-5 3 1-6-4-4 6-.5L12 4l2 5.5 6 .5-4 4 1 6z"/>
          </svg>
        </div>
      </div>

    </div>

  </div>

  {/* 🔻 خط متقطع */}
  <div className="border-t border-dashed border-gray-300 my-5"></div>

  {/* ================= الشارات ================= */}
  <div>
  <h4 className="font-bold mb-4 text-right">الشارات</h4>

  <div className="space-y-3">

    {/* 🔵 موثق */}
    <div className="bg-blue-50 px-4 py-2 rounded-lg flex items-center gap-2">
      
      <svg
  className="w-5 h-5 text-blue-600"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <path
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z"
  />
</svg>

      <span className="text-blue-600">موثق ومعتمد</span>
    </div>

    {/* 🟢 محترف */}
    <div className="bg-green-50 px-4 py-2 rounded-lg flex items-center gap-2">
      
      <svg
  className="w-5 h-5 text-green-600"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <circle
    cx="12"
    cy="8"
    r="4"
    strokeWidth="2"
  />
  <path
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M8 14l-2 6 6-3 6 3-2-6"
  />
</svg>

      <span className="text-green-600">محترف</span>
    </div>

    {/* 🟣 ممتاز */}
    <div className="bg-purple-50 px-4 py-2 rounded-lg flex items-center gap-2">
      
      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M12 17l-5 3 1-6-4-4 6-.5L12 4l2 5.5 6 .5-4 4 1 6z"/>
      </svg>

      <span className="text-purple-600">تقييم ممتاز</span>
    </div>

  </div>
</div>

    </div>
   </div>
  </div>
 </div>
  );
}