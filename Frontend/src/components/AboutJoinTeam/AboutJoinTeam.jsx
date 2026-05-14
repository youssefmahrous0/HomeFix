import React from 'react'
import style from './AboutJoinTeam.module.css'
export default function AboutJoinTeam() {
  return (
    <section className='bg-green-600 text-white py-15'>
        <div className="container">
          <div className='text-center  mb-7 '>
            <h2 className='font-medium text-2xl mb-5'>هل أنت فني محترف؟</h2>
            <p className='text-gray-200 font-medium'>انضم إلى شبكتنا وابدأ في الحصول على طلبات خدمة</p>
          </div>
          <div className=' flex justify-center  gap-4 '>
            <button className='bg-white text-green-600  py-2 px-5 rounded-lg flex items-center font-medium '>
              سجل كفني
            </button>
            <button className='border border-gray-200 py-2 px-5 rounded-lg text-white font-medium'>تعرف على المزايا</button>
          </div>
        </div>
      </section>
  )
}
