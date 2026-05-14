import React, { useState } from 'react'
import ServicesCard from '../ServicesCard/ServicesCard'
import ServicesFiltersSidebar from '../ServicesFiltersSidebar/ServicesFiltersSidebar'

export default function ServicesLayout() {

  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [sortType, setSortType] = useState("popular")

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto">

        <div className="flex flex-row-reverse gap-6">
          {/* الكروت */}
          <div className="w-3/4">

            {/* header فوق الكروت فقط */}
            <div className="flex justify-between items-center mb-6">

              <div className="text-right">
                <h2 className="text-2xl font-bold">الخدمات المتاحة</h2>
                <p className="text-gray-500">جميع الخدمات (18)</p>
              </div>

              <select
                className="bg-gray-200 px-4 py-2 rounded-lg"
                onChange={(e)=>setSortType(e.target.value)}
              >
                <option value="popular">الأكثر طلباً</option>
                <option value="rating">الأعلى تقييماً</option>
                <option value="price">الأقل سعراً</option>
              </select>

            </div>

            <ServicesCard
              selectedCategory={selectedCategory}
              sortType={sortType}
            />

          </div>

          {/* الفلتر */}
          <div className="w-1/4">
            <ServicesFiltersSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

        </div>

      </div>
    </section>
  )
}