import React, { useState } from 'react'
import { Link } from "react-router-dom";
import style from './Hero.module.css'
import Select from 'react-select';
import heroImg from '../../assets/hero.jpg';
export default function Hero() {


  return (
    <>

      <section className='bg-green-600  text-white  h-screen flex  items-center pt-20 '>
        <div className='container   '>
          <div className='flex items-center justify-between gap-20'>
            <div className=''>
              <h1 className="text-6xl md:text-7xl font-bold leading-[1.2] mb-6">
                   حلول منزلية احترافية
               <br />
                    بضغطة زر واحدة
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
  احصل على أفضل مقدمي الخدمات المنزلية في منطقتك، كهرباء، سباكة،
  نجارة، دهانات، تكييف وأكثر من ذلك بكثير.
</p>
              <div className='flex gap-4 pb-8'>

  <Link
    to="/servicesPage"
    className='bg-white text-green-600 py-2 px-5 rounded-lg flex items-center font-medium gap-2' > احجز خدمه الآن
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M9.99935 15.8333L4.16602 9.99996L9.99935 4.16663"
            stroke="#00A63E"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
             />
          <path d="M15.8327 10H4.16602"
            stroke="#00A63E"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
              />
             </svg>
             </Link>

              <Link
                to="/about"
                className='border border-gray-200 py-2 px-5 rounded-lg text-white font-medium' >
               تعرف علينا
             </Link>

             </div>
              <div className="grid grid-cols-3 gap-10 text-white pt-6 border-t border-white/30">
                <div>
                  <h3 className="text-3xl font-bold">+500</h3>
                  <p className="text-white/80 text-sm mt-1">مقدم خدمة</p>
                </div>

                <div>
                    <h3 className="text-3xl font-bold">+10K</h3>
                    <p className="text-white/80 text-sm mt-1">طلب مكتمل</p>
                 </div>

                 <div>
                   <h3 className="text-3xl font-bold">4.9</h3>
                  <p className="text-white/80 text-sm mt-1">تقييم العملاء</p>
                </div>
              </div>
            </div>
            <div className=''>
               <div>
                  <img src={heroImg} alt="service" className="w-full h-[420px] object-cover rounded-2xl" /> </div>
            </div>
          </div>
        </div>
      </section>

      

    </>
  )
}

