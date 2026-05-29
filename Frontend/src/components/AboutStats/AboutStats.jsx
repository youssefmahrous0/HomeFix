import React from 'react'
import style from './AboutStats.module.css'

export default function AboutStats() {
  return (
    <>
      <section className='bg-green-600 py-12'>
        <div className="container mx-auto px-4">

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center text-white'>

            {/* item */}
            <div>
              <svg
                className='mx-auto w-16 h-16 md:w-20 md:h-20'
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* svg */}
              </svg>

              <h3 className='font-medium text-3xl md:text-4xl my-3'>
                30,000+
              </h3>

              <p className='text-gray-200 font-medium text-sm md:text-base'>
                عميل راضٍ
              </p>
            </div>

            {/* item */}
            <div>
              <svg
                className='mx-auto w-16 h-16 md:w-20 md:h-20'
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* svg */}
              </svg>

              <h3 className='font-medium text-3xl md:text-4xl my-3'>
                8,000+
              </h3>

              <p className='text-gray-200 font-medium text-sm md:text-base'>
                فني معتمد
              </p>
            </div>

            {/* item */}
            <div>
              <svg
                className='mx-auto w-16 h-16 md:w-20 md:h-20'
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* svg */}
              </svg>

              <h3 className='font-medium text-3xl md:text-4xl my-3'>
                50,000+
              </h3>

              <p className='text-gray-200 font-medium text-sm md:text-base'>
                خدمة منفذة
              </p>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}