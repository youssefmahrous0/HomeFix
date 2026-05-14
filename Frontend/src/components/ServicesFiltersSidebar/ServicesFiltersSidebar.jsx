import React, { useState, useEffect } from 'react'

export default function ServicesFiltersSidebar({ setSelectedCategory, selectedCategory }) {

  const categories = [
    "الكل",
    "سباكة",
    "كهرباء",
    "تكييف",
    "تنظيف",
    "دهانات",
    "نجارة",
    "صيانة",
    "الوميتال"
  ]

  // state مؤقت
  const [tempCategory, setTempCategory] = useState(selectedCategory)

  // 🔥 مهم: لو القيمة الخارجية اتغيرت يحدث التمب
  useEffect(() => {
    setTempCategory(selectedCategory)
  }, [selectedCategory])

  return (
    <div className="bg-white p-5 rounded-2xl shadow">

      <h3 className="font-bold mb-4">الفلاتر</h3>

      <p className="text-gray-500 mb-3">نوع الخدمة</p>

      <ul className="space-y-2">

        {categories.map(cat => (

          <li
            key={cat}
            onClick={() => setTempCategory(cat)}
            className={`
              cursor-pointer p-2 rounded-lg text-right
              ${tempCategory === cat
                ? "bg-green-600 text-white"
                : "hover:bg-gray-100"}
            `}
          >
            {cat}
          </li>

        ))}

      </ul>

      <button
        onClick={() => setSelectedCategory(tempCategory)}
        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
      >
        تطبيق الفلاتر
      </button>

    </div>
  )
}