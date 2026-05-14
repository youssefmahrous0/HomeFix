import { useEffect, useState } from "react";
import axios from "axios";
import plumbingIcon from "../../assets/Icon1.png"
import electricityIcon from "../../assets/Icon2.png"
import acIcon from "../../assets/Icon3.png"
import cleaningIcon from "../../assets/Icon4.png"
import paintingIcon from "../../assets/Icon5.png"
import carpentryIcon from "../../assets/Icon6.png"
import Electrical_appliance_maintenanceIcon from "../../assets/Icon7.png"
import AluminumIcon from "../../assets/Icon8.png"
import { useNavigate } from "react-router-dom";


export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState({ services: [], providers: [] });
  const [tab, setTab] = useState("all");
  const navigate = useNavigate();
  
  const iconMap = {
      plumbing: plumbingIcon,
      electricity: electricityIcon,
      ac: acIcon,
      cleaning: cleaningIcon,
      painting: paintingIcon,
      carpentry: carpentryIcon,
      devices: Electrical_appliance_maintenanceIcon,
      aluminum: AluminumIcon
    }

  // 🔍 search button
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/search?q=${query}`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🟢 أول ما الصفحة تفتح → كل البيانات
  useEffect(() => {
    axios.get("http://localhost:5000/search")
      .then(res => setData(res.data));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* 🔍 Search */}
     {/* 🔵 Header */}
<div className="flex justify-between items-center mb-4">

  <h2 className="text-xl font-bold text-right">
    نتائج البحث
  </h2>

</div>

{/* 🔍 Search + Filter */}
<div className="flex items-center gap-3 mb-6">

  {/* 🔍 Input */}
  <div className="relative flex-1">

   <input
  type="text"
  placeholder="ابحث عن خدمة أو فني..."
  className="w-full bg-gray-100 rounded-lg py-2 pr-10 pl-3 text-right outline-none border-2 border-green-500 focus:border-green-600"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") handleSearch();
  }}
/>
    {/* 🔍 Icon */}
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
       >
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
       d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
      />
     </svg>
    </span>

  </div>

  {/* 🔘 Search Button */}
  <button
    onClick={handleSearch}
    className="bg-green-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
  >
    <span>
    <svg
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     viewBox="0 0 24 24"
     strokeWidth={2}
     stroke="currentColor"
     className="w-5 h-5"
   >
   <path
     strokeLinecap="round"
     strokeLinejoin="round"
     d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
   />
</svg>
</span>
    <span>بحث</span>
    
  </button>
  {/* 🔘 Filter */}
  <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition">
  
  {/* ☰ Icon SVG بدل النص */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="14" y2="12" />
    <line x1="4" y1="18" x2="10" y2="18" />
  </svg>

  <span>فلاتر</span>
</button>
</div>
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab("all")}
          className={tab==="all" ? "bg-green-600 text-white px-3 py-1 rounded" : "bg-gray-200 px-3 py-1 rounded"}>
          الكل
        </button>

        <button onClick={() => setTab("services")}
          className={tab==="services" ? "bg-green-600 text-white px-3 py-1 rounded" : "bg-gray-200 px-3 py-1 rounded"}>
          خدمات
        </button>

        <button onClick={() => setTab("providers")}
          className={tab==="providers" ? "bg-green-600 text-white px-3 py-1 rounded" : "bg-gray-200 px-3 py-1 rounded"}>
          فنيين
        </button>
      </div>

      {/* Results Count */}
     <p className="text-gray-500 mb-4">
       وجدنا {
        tab === "all"
        ? data.services.length + data.providers.length
        : tab === "services"
        ? data.services.length
        : data.providers.length
      } نتيجة
     </p>

      {/* 🧰 Services */}
      {(tab === "all" || tab === "services") &&
  data.services.map((s) => (
    <div
      key={s.id}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4 flex flex-row-reverse justify-between items-center hover:shadow-md transition"
    >

      {/* 🔘 Button (شمال) */}
      <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
        احجز الآن
      </button>

      {/* 🧾 Content */}
     <div className="flex items-start gap-4">
        {/* 📝 Text */}
       <div className="flex  justify-between items-start">

  {/* 🟢 ICON (يمين فوق) */}
  <div className="w-12 h-12 flex items-center justify-center bg-green-300 rounded-full shrink-0">
    <img
      src={iconMap[s.icon] || acIcon}
      alt={s.name}
      className="w-6 h-6 object-contain"
    />
  </div>

  {/* 🧾 TEXT */}
  <div className="text-right flex-1 mr-4">

    <h3 className="font-bold text-lg ">
      {s.name}
    </h3>

    <p className="text-gray-500 text-sm mt-2">
      {s.description}
    </p>

    {/* Tag */}
    <div className="flex justify-start mt-3">
      {s.category?.split(",").map((cat, i) => (
        <span key={i} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs ml-2">
          {cat}
        </span>
      ))}
    </div>

    {/* Bottom Info */}
    <div className="flex justify-end items-center gap-6 mt-3 text-sm text-gray-500">

  {/* ⭐ Rating */}
  <span className="flex items-center gap-1">
    ⭐ {s.rating || 4.8} ({s.reviews || 1250})
  </span>

  {/* ✔ Providers */}
  <span className="flex items-center gap-1">
    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-4 h-4 text-green-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 13l4 4L19 7"
    />
  </svg>
</div>
    {s.providers_count || 0} فني متاح
  </span>

  {/* 💰 Price */}
  <span className="text-green-600 font-medium">
    {s.price} جنيه
  </span>

</div>
  </div>

</div>
      </div>

    </div>
))}

     {(tab === "all" || tab === "providers") &&
  data.providers.map((p) => (
    <div
      key={p.id}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4 flex flex-row-reverse justify-between items-center hover:shadow-md transition"
    >

      {/* 🟢 LEFT SIDE (السعر + الأزرار) */}
      <div className="text-left">

        <p className="text-green-600 font-bold text-xl">
          {p.price} جنيه
        </p>

        <p className="text-sm text-gray-500 mt-1">
          ⭐ {p.rating} ({p.reviews || 120})
        </p>
      </div>

      {/* 🧾 RIGHT SIDE */}
     <div className="flex items-center gap-4  items-start">

  {/* 🔵 Avatar */}
  <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-white text-lg font-bold">
    {p.name.charAt(0)}
  </div>

  {/* 📝 Text */}
  <div className="flex flex-col items-start w-full">

    {/* 👤 Name + ✔ */}
    <div className="flex items-center gap-2">
      <h3 className="font-bold text-lg">{p.name}</h3>
      <span className="text-blue-500"><svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  className="w-6 h-6 text-blue-500"
>
  <circle cx="12" cy="12" r="9" />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M8 12l2.5 2.5L16 9"
  />
</svg></span>
    </div>

    {/* 💼 Job */}
    <p className="text-gray-500 text-sm mt-1">
      {p.job}
    </p>

    {/* Skills */}
    <div className="flex gap-2 flex-wrap mt-2">
      {p.skills?.split(",").map((skill, i) => (
        <span
          key={i}
          className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
        >
          {skill}
        </span>
      ))}
    </div>

    {/* Info */}
    <p className="text-xs text-gray-500 mt-2 flex items-center gap-3 flex-wrap">
      {p.location && <span>📍 {p.location}</span>}
      {p.location && p.experience && <span className="text-gray-400">•</span>}
      {p.experience && <span>{p.experience} سنوات خبرة</span>}
      {(p.location || p.experience) && p.orders && (
        <span className="text-gray-400">•</span>
      )}
      {p.orders && <span>{p.orders} طلب مكتمل</span>}
    </p>

    {/* 🔥 Buttons (الجديد) */}
    <div className="flex gap-2 mt-5 mb-2">
      <button
  onClick={() => navigate(`/provider/${p.id}`)}
  className="border px-4 py-1 rounded-lg text-sm hover:bg-gray-100"
>
  عرض الملف
</button>
      <button
  onClick={() => navigate(`/booking/${p.id}`)}
  className="bg-green-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-green-700"
>
  احجز الآن
</button>
    </div>

  </div>
</div>


 </div>
))}
</div>
  );
}