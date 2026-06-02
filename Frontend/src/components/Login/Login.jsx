import React, { useState } from 'react'
import { login } from "../../api/auth"
import { useNavigate } from "react-router-dom"
import style from './Login.module.css'
import { Link } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";


export default function Login() {

const navigate = useNavigate();

const [form, setForm] = useState({
  email: "",
  password: ""
});
const [loading, setLoading] = useState(false);
const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.id]: e.target.value
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  try {
    setLoading(true);

    const res = await login(form);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setForm({ email: "", password: "" });

    if (res.data.user.user_type === "admin") {
  window.location.href = "/admin/dashboard";
} else {
  window.location.href = "/";
}
   
  } catch (err) {

  const errorMessage =
    err.response?.data?.error ||
    "بيانات الدخول غير صحيحة";

  toast.error(errorMessage, {
  duration: 3000,

  style: {
    direction: "rtl",
    fontFamily: "Cairo",
    fontSize: "16px",
    borderRadius: "14px",
    padding: "14px",
  },
});

  }
  finally {
    setLoading(false);
  }
};

const handleLogin = async () => {
  const res = await fetch("http://127.0.0.1:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();
  console.log(data);
};

const handleGoogleLogin = () => {
  window.location.href = "homefix-production-0bc9.up.railway.app/login/google";
};


const handleFacebookLogin = () => {
  window.location.href = "homefix-production-0bc9.up.railway.app/auth/facebook";
};

  return (
    
    <section className='pt-25  '>
      <div className="container mx-auto ">

        <div className="flex flex-wrap items-center ">
          <div className='w-full lg:w-1/2'>
            <div className=' shadow-2xl rounded-2xl p-8'>
              <div className=' text-center mb-12 pb-4'>
                {/* house */}
                <svg width="64" className='mx-auto' height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M31.9998 62.9334C49.0838 62.9334 62.9331 49.084 62.9331 32C62.9331 14.916 49.0838 1.06664 31.9998 1.06664C14.9157 1.06664 1.06641 14.916 1.06641 32C1.06641 49.084 14.9157 62.9334 31.9998 62.9334Z" fill="url(#paint0_linear_67_196)" />
                  <path d="M31.9999 16L18.6665 26.6666V42.6666C18.6665 44.1394 19.8605 45.3334 21.3332 45.3334H29.3332V37.3334C29.3332 35.8606 30.5271 34.6666 31.9999 34.6666C33.4726 34.6666 34.6665 35.8606 34.6665 37.3334V45.3334H42.6665C44.1393 45.3334 45.3332 44.1394 45.3332 42.6666V26.6666L31.9999 16Z" fill="white" />
                  <path d="M23.9998 30.6667C24.7362 30.6667 25.3332 30.0697 25.3332 29.3334C25.3332 28.597 24.7362 28 23.9998 28C23.2635 28 22.6665 28.597 22.6665 29.3334C22.6665 30.0697 23.2635 30.6667 23.9998 30.6667Z" fill="#43A047" />
                  <path d="M39.9998 30.6667C40.7362 30.6667 41.3332 30.0697 41.3332 29.3334C41.3332 28.597 40.7362 28 39.9998 28C39.2635 28 38.6665 28.597 38.6665 29.3334C38.6665 30.0697 39.2635 30.6667 39.9998 30.6667Z" fill="#EF5350" />
                  <path d="M31.9998 26.9333C32.7362 26.9333 33.3332 26.3364 33.3332 25.6C33.3332 24.8636 32.7362 24.2667 31.9998 24.2667C31.2635 24.2667 30.6665 24.8636 30.6665 25.6C30.6665 26.3364 31.2635 26.9333 31.9998 26.9333Z" fill="#66BB6A" />
                  <defs>
                    <linearGradient id="paint0_linear_67_196" x1="1.06643" y1="1.06666" x2="62.9331" y2="62.9334" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#2E7D32" />
                      <stop offset="1" stop-color="#1B5E20" />
                    </linearGradient>
                  </defs>
                </svg>

                <h2 className='text-center text-4xl font-medium mb-4'>مرحباً بعودتك</h2>
                <p className='text-gray-500 mb-4 font-medium text-center'>سجل دخولك للوصل إلي حسابك</p>
              </div>
              {/* login form */}
              <form onSubmit={handleSubmit}>

                <div className='mb-12 relative '>
                  <i className=" text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 fa-regular fa-envelope "></i>
                  <label htmlFor="email" className='absolute -top-8 text-gray-700 font-medium '>البريد الالكتروني</label>
                  <input
                   dir='ltr'
                   type="email"
                   id="email"
                   value={form.email}
                   onChange={handleChange}
                   className="bg-gray-50 border border-gray-200 text-sm rounded-md focus:border-green-600 focus:outline-none block w-full px-3 py-3 focus:ring-4 focus:ring-green-200"
                   placeholder='example@email.com'
                   required
                />
                  </div>

                <div className='mb-6 relative'>
                  <i className=" text-gray-500 absolute right-3 top-1/2 -translate-y-1/2  fa-solid fa-lock"></i>
                  <label htmlFor="password" className='absolute -top-8 text-gray-700 font-medium '>كلمه المرور</label>

                  <input
                   dir='ltr'
                   type="password"
                   id="password"
                   value={form.password}
                   onChange={handleChange}
                   className="bg-gray-50 border border-gray-200 text-sm rounded-md focus:border-green-600 focus:outline-none block w-full px-3 py-3 focus:ring-4 focus:ring-green-200"
                    placeholder='********'
                   required
                />

                </div>
                <div className='flex justify-end '>
                  <Link to="/forgot-password" className=' font-medium mb-6 text-green-600 cursor-pointer hover:text-green-700 transition duration-300  '>نسيت كلمه المرور؟</Link>
                </div>




             <button
              type="submit"
              disabled={loading}
              className="text-white font-medium rounded-lg text-2xl px-4 py-2.5 
              bg-green-600 hover:bg-green-700 transition duration-300 
              w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
             >
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>


              </form>
              <div className='border-b-[0.5px] pb-7 border-gray-200 '>
                <p className='login-fake-element mt-7 text-gray-500 font-medium'>أو سجل الدخول باستخدام</p>
                <div className='mt-10 flex flex-col justify-center sm:flex-row sm:justify-between gap-7  '>
                  <button type="button" onClick={handleGoogleLogin} className="group bg-white sm:w-[45%] px-9 py-3 rounded-2xl border border-gray-200 text-xl cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_67_240)">
                        <path d="M15.04 8.16669C15.04 7.64669 14.9933 7.14669 14.9067 6.66669H8V9.50669H11.9467C11.7733 10.42 11.2533 11.1934 10.4733 11.7134V13.56H12.8533C14.24 12.28 15.04 10.4 15.04 8.16669Z" fill="#4285F4" />
                        <path d="M7.99979 15.3334C9.97979 15.3334 11.6398 14.68 12.8531 13.56L10.4731 11.7134C9.81979 12.1534 8.98646 12.42 7.99979 12.42C6.09312 12.42 4.47313 11.1334 3.89313 9.40002H1.45312V11.2934C2.65979 13.6867 5.13312 15.3334 7.99979 15.3334Z" fill="#34A853" />
                        <path d="M3.89317 9.39332C3.7465 8.95332 3.65984 8.48665 3.65984 7.99998C3.65984 7.51332 3.7465 7.04665 3.89317 6.60665V4.71332H1.45317C0.953171 5.69998 0.666504 6.81332 0.666504 7.99998C0.666504 9.18665 0.953171 10.3 1.45317 11.2867L3.35317 9.80665L3.89317 9.39332Z" fill="#FBBC05" />
                        <path d="M7.99979 3.58669C9.07979 3.58669 10.0398 3.96002 10.8065 4.68002L12.9065 2.58002C11.6331 1.39335 9.97979 0.666687 7.99979 0.666687C5.13312 0.666687 2.65979 2.31335 1.45312 4.71335L3.89313 6.60669C4.47313 4.87335 6.09312 3.58669 7.99979 3.58669Z" fill="#EA4335" />
                      </g>
                      <defs>
                        <clipPath id="clip0_67_240">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <span className="group-hover:text-black">Google</span>
                  </button>

                  <button type="button" onClick={handleFacebookLogin} className="group bg-white sm:w-[45%] px-9 py-3 rounded-2xl border border-gray-200 text-xl cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_67_247)">
                        <path d="M16 8.04865C16 3.63065 12.418 0.048645 8 0.048645C3.582 0.048645 0 3.63065 0 8.04865C0 12.042 2.92533 15.3513 6.75 15.9513V10.3613H4.71867V8.04798H6.75V6.28665C6.75 4.28198 7.94467 3.17398 9.772 3.17398C10.6467 3.17398 11.5627 3.33065 11.5627 3.33065V5.29931H10.5533C9.55933 5.29931 9.24933 5.91598 9.24933 6.54865V8.04865H11.468L11.1133 10.362H9.24933V15.952C13.0747 15.3513 16 12.0413 16 8.04865Z" fill="#1877F2" />
                      </g>
                      <defs>
                        <clipPath id="clip0_67_247">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <span className="group-hover:text-black">Facebook</span>
                  </button>


                </div>

              </div>
              <div className='flex gap-5 justify-center mt-7'>
                <span className='font-medium  text-gray-500 '>ليس لديك حساب؟ </span>
                <Link to="/register" className='font-medium  text-green-600 cursor-pointer hover:text-green-700 transition duration-300'>إنشاء حساب جديد</Link>
              </div>
            </div>
          </div>
          <div className='w-full lg:w-1/2 md:pr-10 mt-7 lg:mt-0'>
            <div className=''>
              <h2 className=' text-4xl font-medium'>انضم الي <span className='block text-green-600'>آلاف العملاء السعداء</span></h2>
              <p className='text-gray-500 mt-5 font-medium text-right  '>احصل علي خدمات منزليه احترافيه في دقائق</p>
              <div className='mt-5'>
                <div className='flex items-center mb-5'>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 16C0 7.16344 7.16344 0 16 0H40C48.8366 0 56 7.16344 56 16V40C56 48.8366 48.8366 56 40 56H16C7.16344 56 0 48.8366 0 40V16Z" fill="#00A63E" />
                    <path d="M41.0681 25.3333C41.6771 28.3217 41.2431 31.4286 39.8386 34.1357C38.4341 36.8429 36.144 38.9867 33.3502 40.2097C30.5563 41.4328 27.4276 41.661 24.4859 40.8565C21.5441 40.0519 18.9671 38.2632 17.1845 35.7885C15.4019 33.3139 14.5216 30.303 14.6904 27.2578C14.8591 24.2127 16.0666 21.3174 18.1117 19.0549C20.1567 16.7923 22.9156 15.2992 25.9282 14.8246C28.9409 14.35 32.0252 14.9225 34.6668 16.4467" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M24 26.6667L28 30.6667L41.3333 17.3334" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>


                  <span className='pr-5 '>
                    <h3 className=' text-lg  font-medium'>فنيون معتمدون</h3>
                    <p className='text-gray-500 font-medium'>جميع الفنيين لدينا مدربون ومعتمدون من قبل خبراء</p>
                  </span>
                </div>
                <div className='flex items-center  mb-5'>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 16C0 7.16344 7.16344 0 16 0H40C48.8366 0 56 7.16344 56 16V40C56 48.8366 48.8366 56 40 56H16C7.16344 56 0 48.8366 0 40V16Z" fill="#00A63E" />
                    <path d="M38.6673 29.3333C38.6673 35.9999 34.0007 39.3333 28.454 41.2666C28.1635 41.365 27.848 41.3603 27.5607 41.2533C22.0007 39.3333 17.334 35.9999 17.334 29.3333V19.9999C17.334 19.6463 17.4745 19.3072 17.7245 19.0571C17.9746 18.8071 18.3137 18.6666 18.6673 18.6666C21.334 18.6666 24.6673 17.0666 26.9873 15.0399C27.2698 14.7986 27.6291 14.666 28.0007 14.666C28.3722 14.666 28.7315 14.7986 29.014 15.0399C31.3473 17.0799 34.6673 18.6666 37.334 18.6666C37.6876 18.6666 38.0267 18.8071 38.2768 19.0571C38.5268 19.3072 38.6673 19.6463 38.6673 19.9999V29.3333Z" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>


                  <span className='pr-5'>
                    <h3 className=' text-lg font-medium'>آمن وموثوق</h3>
                    <p className='text-gray-500 font-medium'>نضمن لك خدمة آمنة مع حماية كاملة لبياناتك</p>
                  </span>
                </div>
                <div className='flex items-center  mb-5'>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 16C0 7.16344 7.16344 0 16 0H40C48.8366 0 56 7.16344 56 16V40C56 48.8366 48.8366 56 40 56H16C7.16344 56 0 48.8366 0 40V16Z" fill="#FBC02D" />
                    <path d="M27.3665 15.0599C27.4249 14.9419 27.5152 14.8425 27.6271 14.773C27.739 14.7036 27.8681 14.6667 27.9998 14.6667C28.1315 14.6667 28.2606 14.7036 28.3725 14.773C28.4844 14.8425 28.5747 14.9419 28.6331 15.0599L31.7131 21.2986C31.916 21.7092 32.2155 22.0645 32.586 22.3339C32.9564 22.6033 33.3866 22.7788 33.8398 22.8453L40.7278 23.8533C40.8583 23.8722 40.9809 23.9272 41.0818 24.0122C41.1826 24.0972 41.2577 24.2087 41.2985 24.3341C41.3393 24.4595 41.3442 24.5938 41.3126 24.7219C41.281 24.8499 41.2142 24.9665 41.1198 25.0586L36.1385 29.9093C35.81 30.2294 35.5642 30.6246 35.4222 31.0608C35.2803 31.497 35.2465 31.9611 35.3238 32.4133L36.4998 39.2666C36.5228 39.3971 36.5087 39.5314 36.4591 39.6542C36.4095 39.777 36.3264 39.8834 36.2192 39.9613C36.112 40.0391 35.9851 40.0853 35.853 40.0945C35.7208 40.1037 35.5887 40.0755 35.4718 40.0133L29.3145 36.7759C28.9088 36.5629 28.4574 36.4516 27.9991 36.4516C27.5409 36.4516 27.0895 36.5629 26.6838 36.7759L20.5278 40.0133C20.4109 40.0752 20.279 40.103 20.1471 40.0936C20.0151 40.0842 19.8885 40.038 19.7815 39.9602C19.6746 39.8824 19.5916 39.7762 19.542 39.6536C19.4924 39.5309 19.4783 39.3969 19.5011 39.2666L20.6758 32.4146C20.7534 31.9622 20.7198 31.4978 20.5778 31.0613C20.4359 30.6249 20.1899 30.2295 19.8611 29.9093L14.8798 25.0599C14.7846 24.968 14.7171 24.8511 14.6851 24.7227C14.653 24.5943 14.6577 24.4594 14.6986 24.3335C14.7394 24.2076 14.8148 24.0957 14.9162 24.0106C15.0175 23.9254 15.1407 23.8705 15.2718 23.8519L22.1585 22.8453C22.6121 22.7793 23.043 22.604 23.4139 22.3346C23.7848 22.0652 24.0847 21.7096 24.2878 21.2986L27.3665 15.0599Z" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>


                  <span className='pr-5'>
                    <h3 className=' text-lg font-medium '>تقييمات موثوقة</h3>
                    <p className='text-gray-500 font-medium'>اختر فنيك بناءً على تقييمات العملاء الحقيقية</p>
                  </span>
                </div>
                <div className='flex items-center  mb-5'>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 16C0 7.16344 7.16344 0 16 0H40C48.8366 0 56 7.16344 56 16V40C56 48.8366 48.8366 56 40 56H16C7.16344 56 0 48.8366 0 40V16Z" fill="#4CAF50" />
                    <path d="M33.3327 40V37.3333C33.3327 35.9188 32.7708 34.5623 31.7706 33.5621C30.7704 32.5619 29.4138 32 27.9993 32H19.9993C18.5849 32 17.2283 32.5619 16.2281 33.5621C15.2279 34.5623 14.666 35.9188 14.666 37.3333V40" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M23.9993 26.6667C26.9449 26.6667 29.3327 24.2789 29.3327 21.3333C29.3327 18.3878 26.9449 16 23.9993 16C21.0538 16 18.666 18.3878 18.666 21.3333C18.666 24.2789 21.0538 26.6667 23.9993 26.6667Z" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M41.334 40V37.3333C41.3331 36.1516 40.9398 35.0037 40.2158 34.0698C39.4918 33.1358 38.4782 32.4688 37.334 32.1733" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M33.334 16.1733C34.4812 16.4671 35.498 17.1343 36.2242 18.0698C36.9503 19.0052 37.3444 20.1558 37.3444 21.34C37.3444 22.5242 36.9503 23.6748 36.2242 24.6103C35.498 25.5457 34.4812 26.2129 33.334 26.5067" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>


                  <span className='pr-5'>
                    <h3 className=' text-lg font-medium'>دعم متواصل</h3>
                    <p className='text-gray-500 font-medium'>فريق الدعم متاح على مدار الساعة لمساعدتك</p>
                  </span>
                </div>
              </div>
              <div className=' flex flex-wrap gap-3 justify-start lg:justify-start  pt-5'>
                <div className='w-full lg:w-1/4 py-5 rounded-2xl text-green-600 text-center shadow-2xl '>
                  <span className='text-3xl font-medium  block'>+50K</span>
                  <span className='text-gray-500 font-medium'>عميل سعيد</span>
                </div>
                <div className='w-full lg:w-1/4  py-5 rounded-2xl text-green-600 text-center shadow-2xl '>
                  <span className='text-3xl font-medium  block'>+1200</span>
                  <span className='text-gray-500 font-medium'>فني محترف</span>
                </div>
                <div className='w-full lg:w-1/4  py-5 rounded-2xl text-green-600 text-center shadow-2xl '>
                  <span className='text-3xl font-medium  block'>4.9</span>
                  <span className='text-gray-500 font-medium'>تقييم المنصه</span>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>

    </section>

  )
}


