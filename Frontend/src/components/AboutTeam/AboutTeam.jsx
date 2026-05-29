import React from 'react'
import style from './AboutTeam.module.css'

export default function AboutTeam() {
  return (
    <>
      <section className='py-12'>

        {/* header */}
        <div className='text-center mb-10 px-4'>
          <h2 className='font-medium text-2xl md:text-3xl mb-4'>
            فريق العمل
          </h2>

          <p className='text-gray-600 font-medium text-sm md:text-base'>
            تعرف على الأشخاص الذين يعملون لجعل HomeFix أفضل كل يوم
          </p>
        </div>

        <div className="container mx-auto px-4">

          {/* cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* card */}
            <div className='text-center px-5 py-7 border border-gray-200 rounded-2xl'>
              <span className="fa-stack fa-2x mb-3">
                <i className="fa-solid fa-circle fa-stack-2x text-green-600"></i>
                <span className="fa-stack-1x fa-inverse">أ</span>
              </span>

              <h3 className='font-medium text-lg my-4'>
                يوسف محروس
              </h3>

              <p className='font-medium text-green-600 mb-4'>
                المدير التنفيذي
              </p>

              <p className='text-gray-600 font-medium text-sm'>
                خبرة 15 عاماً في مجال التكنولوجيا
              </p>
            </div>

            {/* card */}
            <div className='text-center px-5 py-7 border border-gray-200 rounded-2xl'>
              <span className="fa-stack fa-2x mb-3">
                <i className="fa-solid fa-circle fa-stack-2x text-green-600"></i>
                <span className="fa-stack-1x fa-inverse">أ</span>
              </span>

              <h3 className='font-medium text-lg my-4'>
                يوسف محروس
              </h3>

              <p className='font-medium text-green-600 mb-4'>
                المدير التنفيذي
              </p>

              <p className='text-gray-600 font-medium text-sm'>
                خبرة 15 عاماً في مجال التكنولوجيا
              </p>
            </div>

            {/* card */}
            <div className='text-center px-5 py-7 border border-gray-200 rounded-2xl'>
              <span className="fa-stack fa-2x mb-3">
                <i className="fa-solid fa-circle fa-stack-2x text-green-600"></i>
                <span className="fa-stack-1x fa-inverse">أ</span>
              </span>

              <h3 className='font-medium text-lg my-4'>
                مصطفي طارق
              </h3>

              <p className='font-medium text-green-600 mb-4'>
                المدير التنفيذي
              </p>

              <p className='text-gray-600 font-medium text-sm'>
                خبرة 15 عاماً في مجال التكنولوجيا
              </p>
            </div>

            {/* card */}
            <div className='text-center px-5 py-7 border border-gray-200 rounded-2xl'>
              <span className="fa-stack fa-2x mb-3">
                <i className="fa-solid fa-circle fa-stack-2x text-green-600"></i>
                <span className="fa-stack-1x fa-inverse">أ</span>
              </span>

              <h3 className='font-medium text-lg my-4'>
                عبدالرحمن نصر
              </h3>

              <p className='font-medium text-green-600 mb-4'>
                المدير التنفيذي
              </p>

              <p className='text-gray-600 font-medium text-sm'>
                خبرة 15 عاماً في مجال التكنولوجيا
              </p>
            </div>

          </div>

        </div>

      </section>
    </>
  )
}