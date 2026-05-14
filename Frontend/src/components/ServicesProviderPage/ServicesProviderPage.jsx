import React, { useState } from 'react'
import ServiceProviderHeroSearch from "../ServiceProviderHeroSearch/ServiceProviderHeroSearch";
import ServiceProviderList from "../ServiceProviderList/ServiceProviderList";
import ServiceProviderFilters from "../ServiceProviderFilters/ServiceProviderFilters";
import ServiceProviderCTA from "../ServiceProviderCTA/ServiceProviderCTA";
import { useLocation } from "react-router-dom"


export default function ServicesProviderPage() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const selectedService = params.get("service")
  const [sort,setSort] = useState("rating")
  const [search, setSearch] = useState("")
  const [governorate, setGovernorate] = useState("")
  const [filters, setFilters] = useState({
      rating: 0,
      available: false,
      price: 200,
      governorate: ""
     })

  return (
    <>
       <ServiceProviderHeroSearch
        search={search}
        setSearch={setSearch}
        governorate={governorate}
        setGovernorate={setGovernorate} />

      <section className="container mx-auto py-10" dir="rtl">
  <div className="flex gap-6">

    {/* filters RIGHT */}
    <div className="w-[320px] hidden lg:block">
      <ServiceProviderFilters
        filters={filters}
        setFilters={setFilters}
      />
    </div>

    {/* list LEFT */}
    <ServiceProviderList
     search={search}
     governorate={governorate}
     filters={filters}
     sort={sort}
     setSort={setSort}
     selectedService={selectedService}   // 🔥 الجديد
/>
  </div>
</section>
<ServiceProviderCTA />
    </>
  )
}