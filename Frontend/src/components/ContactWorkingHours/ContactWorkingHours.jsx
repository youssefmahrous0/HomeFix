import React from 'react'
import style from './ContactWorkingHours.module.css'
export default function ContactWorkingHours() {
  return (
    <div className='rounded-lg  border border-gray-200 my-12 p-8 shadow-lg '>
      <div className=' flex items-center  gap-x-5 mb-10   '>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 14C0 6.26801 6.26801 0 14 0H34C41.732 0 48 6.26801 48 14V34C48 41.732 41.732 48 34 48H14C6.26801 48 0 41.732 0 34V14Z" fill="#00A63E" />
          <path d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M24 18V24L28 26" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <h2 className='font-medium text-xl  '>ساعات العمل</h2>
      </div>
      <div className='flex justify-between border-b border-gray-200 pb-5 mb-5'>
        <span className='text-gray-500 text-lg'>
          السبت - الخميس
        </span>
        <span className='text-lg'>
          9 ص - 6 م
        </span>
      </div>
      <div className='flex justify-between border-b border-gray-200 pb-5 mb-5'>
        <span className='text-gray-500 text-lg'>
          الجمعة
        </span>
        <span className='text-lg'>
          مغلق
        </span>
      </div>
      <p className=' text-left text-green-600 bg-green-50 p-2 rounded-lg font-medium'>
        خدمة العملاء متاحة 24/7 عبر واتساب
      </p>
    </div>
  )
}
