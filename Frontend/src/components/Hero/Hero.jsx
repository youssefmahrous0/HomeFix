import React, { useState } from 'react'
import { Link } from "react-router-dom";
import style from './Hero.module.css'
import Select from 'react-select';
import heroImg from '../../assets/hero.jpg';
import { useNavigate } from "react-router-dom";
import { requireAuth } from "../../api/utils/auth";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <>

      <section className="bg-green-600 text-white min-h-screen flex items-center py-16 md:py-20">

  <div className="container mx-auto px-6">

    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">

      {/* text */}
      <div className="w-full lg:w-1/2 text-center lg:text-right">

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          حلول منزلية احترافية
          <br />
          بضغطة زر واحدة
        </h1>

        <p className="text-base sm:text-lg text-white/90 mb-8 leading-8">
          احصل على أفضل مقدمي الخدمات المنزلية في منطقتك،
          كهرباء، سباكة، نجارة، دهانات، تكييف وأكثر من ذلك بكثير.
        </p>

        {/* buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pb-8 justify-center lg:justify-start">

          <button
            onClick={() => {

              if (!requireAuth()) {
                navigate("/login");
                return;
              }

              navigate("/servicesPage");
            }}
            className="bg-white text-green-600 py-3 px-6 rounded-lg flex items-center justify-center font-medium gap-2"
          >
            احجز خدمة الآن

            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M9.99935 15.8333L4.16602 9.99996L9.99935 4.16663"
                stroke="#00A63E"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M15.8327 10H4.16602"
                stroke="#00A63E"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

          </button>

          <Link
            to="/about"
            className="border border-gray-200 py-3 px-6 rounded-lg text-white font-medium text-center"
          >
            تعرف علينا
          </Link>

        </div>

        {/* stats */}
        <div className="grid grid-cols-3 gap-6 sm:gap-10 text-white pt-6 border-t border-white/30 text-center">

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold">+500</h3>
            <p className="text-white/80 text-sm mt-1">مقدم خدمة</p>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold">+10K</h3>
            <p className="text-white/80 text-sm mt-1">طلب مكتمل</p>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold">4.9</h3>
            <p className="text-white/80 text-sm mt-1">تقييم العملاء</p>
          </div>

        </div>

      </div>

      {/* image */}
      <div className="w-full lg:w-1/2">

        <img
          src={heroImg}
          alt="service"
          className="w-full h-[260px] sm:h-[350px] lg:h-[420px] object-cover rounded-2xl"
        />

      </div>

    </div>

  </div>

</section>
    </>
  )
}

