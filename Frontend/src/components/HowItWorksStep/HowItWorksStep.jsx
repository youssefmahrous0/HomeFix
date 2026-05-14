import React from 'react'
import style from './HowItWorksStep.module.css'
export default function HowItWorksStep() {
  return <>
  {/* كيف يعمل HomeFix؟ */}

    <section className='py-12 m  '>
      {/* header */}
      <div className='text-center  mb-12 '>
        <h2 className='font-bold text-2xl mb-5'>كيف يعمل HomeFix؟</h2>
        <p className='text-gray-600 font-medium'>احصل على الخدمة التي تحتاجها في 4 خطوات بسيطة</p>
      </div>

      <div className="container ">

        <div className="  raw justify-center mt-12">

          <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 '>
            <div className=' text-center  px-5 py-7 shadow-2xl rounded-2xl'>
              <span class="fa-stack fa-2x mb-3 ">
                <i class="fa-solid fa-circle fa-stack-2x text-green-600"></i>
                <span class=" fa-stack-1x fa-inverse  ">1</span>
              </span>
              <h3 className='font-bold text-lg my-2 mr-4 text-end'>اختر الخدمة</h3>
              <p className='text-gray-600 font-medium  mr-4'>تصفح الخدمات المتاحة واختر ما يناسبك</p>
            </div>
          </div>
          <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4'>
            <div className=' text-center  px-5 py-7 shadow-2xl rounded-2xl'>
              <span class="fa-stack fa-2x mb-3 ">
                <i class="fa-solid fa-circle fa-stack-2x text-green-600"></i>
                <span class=" fa-stack-1x fa-inverse  ">2</span>
              </span>
              <h3 className=' font-bold text-lg my-2  '>احجز موعد</h3>
              <p className='text-gray-600 font-medium '>حدد الوقت والتاريخ المناسب لك</p>
            </div>
          </div>
          <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4'>
            <div className=' text-center  px-5 py-7 shadow-2xl rounded-2xl'>
              <span class="fa-stack fa-2x mb-3 ">
                <i class="fa-solid fa-circle fa-stack-2x text-green-600"></i>
                <span class=" fa-stack-1x fa-inverse  ">3</span>
              </span>
              <h3 className=' font-bold text-lg  my-2'>قيّم الخدمة</h3>
              <p className='text-gray-600 font-medium '>شارك تجربتك وقيّم مقدم الخدمة</p>
            </div>
          </div>
          <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4'>
            <div className=' text-center  px-5 py-7 shadow-2xl rounded-2xl'>
              <span class="fa-stack fa-2x mb-3 ">
                <i class="fa-solid fa-circle fa-stack-2x text-green-600"></i>
                <span class=" fa-stack-1x fa-inverse  ">4</span>
              </span>
               <h3 className=' font-bold text-lg text-end my-2'>استقبل الخدمة</h3>
              <p className='text-gray-600 font-medium '>سيصل إليك مقدم الخدمة في الموعد المحدد</p>
            </div>
          </div>


        </div>

      </div>

    </section>
  </>
}
