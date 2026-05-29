import React, { useEffect, useState } from 'react'
import { useNavigate , useSearchParams  } from "react-router-dom"
import { requireAuth } from "../../api/utils/auth";
import plumbingIcon from "../../assets/Icon1.png"
import electricityIcon from "../../assets/Icon2.png"
import acIcon from "../../assets/Icon3.png"
import cleaningIcon from "../../assets/Icon4.png"
import paintingIcon from "../../assets/Icon5.png"
import carpentryIcon from "../../assets/Icon6.png"
import Electrical_appliance_maintenanceIcon from "../../assets/Icon7.png"
import AluminumIcon from "../../assets/Icon8.png"


export default function ServicesCard({ selectedCategory, sortType }) {
  const navigate = useNavigate()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category");

  // 🎯 Map icons from DB
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

  // 🔥 Fetch from backend
  useEffect(() => {
  fetch("http://localhost:5000/services/")
    .then(res => res.json())
    .then(data => {
      setServices(Array.isArray(data) ? data : [])
      setLoading(false)
    })
    .catch(err => {
      console.error(err)
      setServices([]) 
      setLoading(false)
    })
}, [])

  // 🎯 Filtering
  let filtered = Array.isArray(services) ? services : []

 const activeCategory = categoryFromURL || selectedCategory
if (activeCategory !== "الكل") {
  filtered = services.filter(
    service => service.category === activeCategory
  )
}

  if (sortType === "rating") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating)
  }

  if (sortType === "price") {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  }

  if (sortType === "popular") {
    filtered = [...filtered].sort((a, b) => b.workers - a.workers)
  }

  if (loading) {
    return <p className="text-center mt-10">جاري تحميل الخدمات...</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {Array.isArray(filtered) && filtered.map(service => (

        <div
          key={service.id}
          className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 text-right"
        >

          <div className="bg-green-600 w-14 h-14 rounded-xl flex items-center justify-center text-white mb-3">
            <img
              src={iconMap[service.icon] || plumbingIcon}
              className="w-6 h-6"
              alt=""
            />
          </div>

          <h3 className="font-bold text-lg mb-2">
            {service.name}
          </h3>

          <p className="text-gray-500 text-sm mb-3">
            {service.description}
          </p>

          <div className="flex justify-between text-sm mb-2">
            <span className="flex items-center gap-1">
              ⭐ {service.rating || 4.5}
            </span>

            <span className="text-gray-500">
              {service.workers || 20} فني متاح
            </span>
          </div>

          <div className="flex justify-between mb-4">
            <span className="text-gray-500">يبدأ من</span>

            <span className="text-green-600 font-bold">
              {service.price} جنيه
            </span>
          </div>

          <button
  onClick={() => {

    if (!requireAuth(navigate)) return;

    navigate(`/ServicesProviderPage?service=${service.name}`);
  }}
  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
>
  عرض الفنيين
</button>

        </div>

      ))}

    </div>
  )
}