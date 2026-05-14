import React, { useEffect, useState} from "react";
import { useLocation , useNavigate } from "react-router-dom";


export default function ServiceProviderList({ search, governorate , filters , sort ,setSort , selectedService }) {

const [providers, setProviders] = useState([]);
const navigate = useNavigate();

const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const service = queryParams.get("service");

const serviceMap = {
  plumbing: "سباكة",
  electric: "كهرباء",
  carpentry: "نجارة",
  painting: "دهانات",
  ac: "تكييف",
  general: "خدمات عامة"
};

useEffect(() => {
  fetch("http://127.0.0.1:5000/providers/")
    .then(res => res.json())
    .then(data => {
      setProviders(data.data || []);
    })
    .catch(err => console.log(err));
}, []);

  // filtering
const filteredProviders = (providers || []).filter(provider => {

const matchSearch =
  !search ||   // 🔥 دي أهم حاجة
  provider.name?.includes(search) ||
  provider.skills?.some(skill => skill.includes(search)) ||
  provider.services?.some(service => service.name.includes(search))

const activeService =
  serviceMap[service] || selectedService;

const matchService =
  !activeService ||
  provider.services?.some(s =>
    s.name.includes(activeService)
  );
  const matchGovernorate =
!governorate || provider.location?.trim() === governorate?.trim()

const matchRating =
provider.rating >= filters.rating

const matchAvailable =
  !filters.available || provider.available === true

const matchPrice =
provider.price <= filters.price

const matchFilterGovernorate =
!filters.governorate || provider.location?.trim() === filters.governorate?.trim()

return (
  matchSearch &&
  matchGovernorate &&
  matchRating &&
  matchAvailable &&
  matchPrice &&
  matchFilterGovernorate &&
  matchService   // 🔥 أهم سطر
)
})

// sorting
let sortedProviders = [...filteredProviders]

if (sort === "rating") {
  sortedProviders.sort((a,b)=> b.rating - a.rating)
}

if (sort === "priceLow") {
  sortedProviders.sort((a,b)=> a.price - b.price)
}

if (sort === "priceHigh") {
  sortedProviders.sort((a,b)=> b.price - a.price)
}

  return (
   <section className="w-full">
      {/* header */}
<div className="flex justify-between items-center mb-6">

<div>
<h2 className="text-xl font-semibold">
الفنيون المتاحون
</h2>

<p className="text-gray-500 text-sm">
وجدنا {sortedProviders.length} فني
</p>
</div>

        <select
          className="border rounded-lg px-3 py-2"
          value={sort}
          onChange={(e)=>setSort(e.target.value)}
           >
       <option value="rating">أعلى تقييم</option>
        <option value="priceLow">السعر الأقل</option>
        <option value="priceHigh">السعر الأعلى</option>
      </select>

       </div>

      <div className="flex flex-col gap-5">

        {sortedProviders.map(provider => (

<div
key={provider.id}
className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-right">

{/* row 1 */}
<div className="flex justify-between items-start">


{/* right side */}
<div className="flex items-center gap-3">

{/* avatar */}
<div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
{provider.name[0]}
</div>

{/* name */}
<div className="text-right">
<div className="flex items-center gap-2">

<h3 className="font-semibold text-lg">
{provider.name}
</h3>

{provider.verified && (
<span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
موثق
</span>
)}

</div>

<p className="text-gray-500 text-sm">
{provider.job}
</p>
</div>
</div>


{/* left */}
<div className="text-left">
<div className="font-semibold">
⭐ {provider.rating}
</div>

<p className="text-gray-500 text-sm">
({provider.reviews} تقييم)
</p>
</div>

</div>

{/* row 2 */}
<div className="grid grid-cols-4 text-gray-500 text-sm mt-4 text-center">

  {/* experience */}
  <span className="flex items-center justify-center gap-1">
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 2v12M2 8h12"/>
    </svg>
    {provider.experience} سنوات
  </span>

  {/* orders */}
  <span className="flex items-center justify-center gap-1">
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 12l-3-3 1.5-1.5L6 9l5.5-5.5L13 5z"/>
    </svg>
    {provider.orders} طلب
  </span>
  
   {/* time */}
  <span className="flex items-center justify-center gap-1">
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="8" cy="8" r="6"/>
      <path d="M8 4v4l2 2"/>
    </svg>
    {provider.time} 
  </span>

  {/* location */}
  <span className="flex items-center justify-center gap-1">
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 14s4-3.5 4-7a4 4 0 10-8 0c0 3.5 4 7 4 7z"/>
      <circle cx="8" cy="7" r="1.5"/>
    </svg>
    {provider.location}
  </span>
</div>

 {/* skills */}
<div className="flex flex-wrap gap-2 mt-4">
{provider.skills?.map(skill => (
<span
key={skill}
className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm"
>
{skill}
</span>
))}
</div>

{/* divider */}
<div className="w-full border-t border-gray-300 my-5"></div>

<div className="flex justify-between items-center">
{/* price left */}
<div>
<p className="text-gray-500 text-sm">
سعر الزيارة
</p>

<div className="text-green-600 font-semibold text-lg">
{provider.price} جنيه
</div>
</div>

{/* buttons right */}
<div className="flex gap-3">

<button
  onClick={() => navigate(`/provider/${provider.id}`)}
  className="border px-4 py-2 rounded-lg"
>
  عرض الملف
</button>

<button
  onClick={() => navigate(`/booking/${provider.id}`)}
  className="bg-green-600 text-white px-6 py-2 rounded-lg"
>
  احجز الآن
</button>

</div>
</div>
</div>

))}

      </div>
    </section>
  );
}