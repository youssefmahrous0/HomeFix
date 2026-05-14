import React, { useEffect, useState } from 'react';
import style from './ContactInfoCard.module.css'
import { Link } from 'react-router-dom'
export default function ContactInfoCard() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/contact-info")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);
if (!data) return <p className="text-center">Loading...</p>;

  return (
    <div className='rounded-lg  border border-gray-200 my-12 p-8 shadow-lg'>
      <h2 className='font-medium text-xl mb-5'>معلومات الاتصال</h2>
      <ul className=''>
        <li className='flex items-center gap-x-5 mb-5'>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14C0 6.26801 6.26801 0 14 0H34C41.732 0 48 6.26801 48 14V34C48 41.732 41.732 48 34 48H14C6.26801 48 0 41.732 0 34V14Z" fill="#DCFCE7" />
            <path d="M32 16H16C14.8954 16 14 16.8954 14 18V30C14 31.1046 14.8954 32 16 32H32C33.1046 32 34 31.1046 34 30V18C34 16.8954 33.1046 16 32 16Z" stroke="#00A63E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M34 19L25.03 24.7C24.7213 24.8934 24.3643 24.996 24 24.996C23.6357 24.996 23.2787 24.8934 22.97 24.7L14 19" stroke="#00A63E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span className=''>
            <p className='text-gray-500 text-left text-lg pb-1'>واتساب</p>
            <p className='text-xl pb-1'>{data.whatsapp}</p>
            <Link className='text-green-600 text-lg text-center block'>تواصل عبر واتساب</Link>
          </span>
        </li>
        <li className='flex items-center gap-x-5 mb-5'>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14C0 6.26801 6.26801 0 14 0H34C41.732 0 48 6.26801 48 14V34C48 41.732 41.732 48 34 48H14C6.26801 48 0 41.732 0 34V14Z" fill="#DBEAFE" />
            <path d="M32 16H16C14.8954 16 14 16.8954 14 18V30C14 31.1046 14.8954 32 16 32H32C33.1046 32 34 31.1046 34 30V18C34 16.8954 33.1046 16 32 16Z" stroke="#155DFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M34 19L25.03 24.7C24.7213 24.8934 24.3643 24.996 24 24.996C23.6357 24.996 23.2787 24.8934 22.97 24.7L14 19" stroke="#155DFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <span className=' text-left'>
            <p className='text-gray-500  text-lg pb-1'>البريد الإلكتروني</p>
            <p className='text-xl pb-1'>{data.email}</p>
            <Link className='text-xl'>support@homefix.com</Link>
          </span>
        </li>
        <li className='flex items-center gap-x-5 mb-5'>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14C0 6.26801 6.26801 0 14 0H34C41.732 0 48 6.26801 48 14V34C48 41.732 41.732 48 34 48H14C6.26801 48 0 41.732 0 34V14Z" fill="#F3E8FF" />
            <path d="M33.9994 28.92V31.92C34.0006 32.1985 33.9435 32.4741 33.832 32.7293C33.7204 32.9845 33.5567 33.2136 33.3515 33.4018C33.1463 33.5901 32.904 33.7335 32.6402 33.8227C32.3764 33.9119 32.0968 33.945 31.8194 33.92C28.7423 33.5856 25.7864 32.5341 23.1894 30.85C20.7733 29.3146 18.7248 27.2661 17.1894 24.85C15.4994 22.2412 14.4477 19.271 14.1194 16.18C14.0945 15.9034 14.1273 15.6247 14.2159 15.3616C14.3046 15.0985 14.447 14.8567 14.6342 14.6516C14.8214 14.4465 15.0492 14.2827 15.3032 14.1705C15.5572 14.0583 15.8318 14.0002 16.1094 14H19.1094C19.5948 13.9952 20.0652 14.1671 20.4332 14.4835C20.8012 14.8 21.0415 15.2394 21.1094 15.72C21.2361 16.68 21.4709 17.6227 21.8094 18.53C21.944 18.8879 21.9731 19.2769 21.8934 19.6509C21.8136 20.0248 21.6283 20.3681 21.3594 20.64L20.0894 21.91C21.513 24.4135 23.5859 26.4864 26.0894 27.91L27.3594 26.64C27.6313 26.3711 27.9746 26.1858 28.3486 26.1061C28.7225 26.0263 29.1115 26.0554 29.4694 26.19C30.3767 26.5285 31.3194 26.7634 32.2794 26.89C32.7652 26.9585 33.2088 27.2032 33.526 27.5775C33.8431 27.9518 34.0116 28.4296 33.9994 28.92Z" stroke="#9810FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>


          <span className=' text-left'>
            <p className='text-gray-500  text-lg pb-1'>الهاتف</p>
            <p className='text-xl pb-1'>{data.phone}</p>
            <Link className='text-lg text-gray-500'>خدمة العملاء متاحة 24/7</Link>
          </span>
        </li>
        <li className='flex items-center gap-x-5 mb-5'>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14C0 6.26801 6.26801 0 14 0H34C41.732 0 48 6.26801 48 14V34C48 41.732 41.732 48 34 48H14C6.26801 48 0 41.732 0 34V14Z" fill="#FFEDD4" />
            <path d="M32 22C32 26.993 26.461 32.193 24.601 33.799C24.4277 33.9293 24.2168 33.9998 24 33.9998C23.7832 33.9998 23.5723 33.9293 23.399 33.799C21.539 32.193 16 26.993 16 22C16 19.8783 16.8429 17.8434 18.3431 16.3431C19.8434 14.8429 21.8783 14 24 14C26.1217 14 28.1566 14.8429 29.6569 16.3431C31.1571 17.8434 32 19.8783 32 22Z" stroke="#F54900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M24 25C25.6569 25 27 23.6569 27 22C27 20.3431 25.6569 19 24 19C22.3431 19 21 20.3431 21 22C21 23.6569 22.3431 25 24 25Z" stroke="#F54900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>


          <span className=' '>
            <p className='text-gray-500  text-lg pb-1 text-left'>العنوان</p>
            <p className='text-xl pb-1 text-right'>{data.address}</p>
            <Link className='text-xl text-right'>{data.street}</Link>
          </span>
        </li>
      </ul>
    </div>
  )
}
