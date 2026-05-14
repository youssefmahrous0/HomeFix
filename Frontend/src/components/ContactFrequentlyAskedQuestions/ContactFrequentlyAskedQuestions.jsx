import React from 'react'
import style from './ContactFrequentlyAskedQuestions.module.css'
export default function ContactFrequentlyAskedQuestions() {
  return (
    <section className='w-3/4 mx-auto  my-12'>
      <div className="container ">
        <div className='  mb-12 '>
          <h2 className='font-medium text-2xl mb-5 text-center'>الأسئلة الشائعة</h2>
          <div className='rounded-lg  border border-gray-200 my-12 px-8 py-4 shadow-lg '>
            <h3 className='font-medium  mb-5  '>كيف يمكنني حجز خدمة؟</h3>
            <p className='text-gray-600 font-medium leading-relaxed  '>
              يمكنك حجز الخدمة بسهولة من خلال البحث عن الخدمة المطلوبة، اختيار الفني المناسب، وتحديد الموعد المناسب لك.
            </p>
          </div>
          <div className='rounded-lg  border border-gray-200 my-12 px-8 py-4 shadow-lg '>
            <h3 className='font-medium  mb-5 '>هل الفنيون معتمدون؟</h3>
            <p className='text-gray-600 font-medium leading-relaxed  '>
              نعم، جميع الفنيين على منصتنا معتمدون ومدربون، ونتحقق من خبراتهم وتقييماتهم بشكل دوري.
            </p>
          </div>
          <div className='rounded-lg  border border-gray-200 my-12 px-8 py-4 shadow-lg '>
            <h3 className='font-medium  mb-5 '>ما هي طرق الدفع المتاحة؟</h3>
            <p className='text-gray-600 font-medium leading-relaxed  '>
              نوفر الدفع نقداً عند الاستلام، بالإضافة إلى الدفع الإلكتروني من خلال بطاقات الائتمان والمحافظ الإلكترونية.
            </p>
          </div>
          <div className='rounded-lg  border border-gray-200 my-12 px-8 py-4 shadow-lg '>
            <h3 className='font-medium  mb-5 '>هل يمكنني إلغاء الحجز؟</h3>
            <p className='text-gray-600 font-medium leading-relaxed  '>
              نعم، يمكنك إلغاء الحجز مجاناً قبل 24 ساعة من الموعد المحدد.
            </p>
          </div>



        </div>

      </div>
    </section>
  )
}
