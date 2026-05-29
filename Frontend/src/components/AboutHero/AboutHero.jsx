import React from 'react'
import style from './AboutHero.module.css'

export default function AboutHero() {
  return (
    <>
      <section className="bg-green-600 text-white text-center py-16 md:py-24 mt-20 md:mt-30 px-4">
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-4 leading-relaxed">
          منصة HomeFix - حلك السريع لكل خدمات البيت في مصر
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-3xl mx-auto leading-8">
          نربط بينك وبين أفضل الفنيين المعتمدين في جميع أنحاء مصر،
          لنوفر لك خدمات منزلية احترافية وموثوقة
        </p>

      </section>
    </>
  )
}