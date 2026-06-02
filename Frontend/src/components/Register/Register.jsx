import React, { useState, useRef } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {

const navigate = useNavigate();
const imageRef = useRef(null);
const [accountType, setAccountType] = useState("USER");

const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  password: "",
  image: null,
  birthDate: ""
});

const handleChange = (e) => {
  const { name, value, files } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: files && files.length > 0 ? files[0] : value
  }));
};

const handleAccountType = (type) => {
  setAccountType(type);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("name", formData.name);
  data.append("phone", formData.phone);
  data.append("email", formData.email);
  data.append("password", formData.password);
  data.append("birthDate", formData.birthDate ? formData.birthDate.toISOString().split("T")[0] : "" );
  data.append("accountType", accountType);

  if (formData.image) {
    data.append("image", formData.image);
  }


  try {
    const res = await fetch("https://homefix-production-0bc9.up.railway.app/api/auth/register", {
  method: "POST",
  body: data
});

    const result = await res.json();

    if (!res.ok) {

  toast.error(result.message || "حدث خطأ", {
    duration: 3000,
    style: {
      direction: "rtl",
      fontFamily: "Cairo",
      fontSize: "16px",
      borderRadius: "14px",
      padding: "14px",
    },
  });

} else {

  toast.success("تم إنشاء الحساب بنجاح 🎉", {
    duration: 3000,
    style: {
      direction: "rtl",
      fontFamily: "Cairo",
      fontSize: "16px",
      borderRadius: "14px",
      padding: "14px",
      background: "#ECFDF5",
      color: "#065F46",
      border: "1px solid #10B981",
    },
  });

  setFormData({
    name: "",
    phone: "",
    email: "",
    password: "",
    image: null,
    birthDate: ""
  });
  setTimeout(() => {
  navigate("/login");
}, 2000);
}
  } catch (error) {
    console.log(error);
  }
};
  return (<>

    <section className='pt-25'>
      <div className="container mx-auto ">

        <div className="flex flex-wrap  ">
          <div className='w-full lg:w-1/2 '>
            <div className=' shadow-2xl rounded-2xl p-8'>
              <div className=' text-center mb-12 pb-4 '>
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

                <h2 className='text-center text-4xl font-semibold mb-4'>ابدأ رحلتك معنا</h2>
                <p className='text-gray-500 mb-4 font-semibold text-center'>أنشئ حسابك واحصل على أفضل الخدمات المنزلية</p>

              </div>
              {/* نوع الحساب */}
              <div>
                <p className='pb-4 font-medium text-xl'>نوع الحساب</p>
                <div className='flex gap-5 justify-center mb-5 '>

                  <button type="button" onClick={() => handleAccountType("USER")} className={` w-1/2 py-5 rounded-xl border-2 border-gray-200 cursor-pointer ${accountType === "USER" ? "border-green-600 bg-green-50" : ""}`}>
                    <span className='text-2xl'>
                      <svg className='block mx-auto' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25.3327 28V25.3333C25.3327 23.9188 24.7708 22.5623 23.7706 21.5621C22.7704 20.5619 21.4138 20 19.9993 20H11.9993C10.5849 20 9.22831 20.5619 8.22811 21.5621C7.22792 22.5623 6.66602 23.9188 6.66602 25.3333V28" stroke="#364153" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15.9993 14.6667C18.9449 14.6667 21.3327 12.2789 21.3327 9.33333C21.3327 6.38781 18.9449 4 15.9993 4C13.0538 4 10.666 6.38781 10.666 9.33333C10.666 12.2789 13.0538 14.6667 15.9993 14.6667Z" stroke="#364153" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </span>
                    <p className='  font-bold py-1'>مستخدم</p>
                    <p className='text-gray-500 font-medium'>أحتاج خدمات المنزلية</p>
                  </button>
                </div>
              </div>

              {/* /* form * / */}
              <form onSubmit={handleSubmit} encType="multipart/form-data" className=" bg-white rounded-lg py-8" >

                {/* الاسم */}
                <div className='mb-12 relative'>
                  <svg className='text-gray-500 absolute right-3 top-1/2 -translate-y-1/2  ' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8327 17.5V15.8333C15.8327 14.9493 15.4815 14.1014 14.8564 13.4763C14.2312 12.8512 13.3834 12.5 12.4993 12.5H7.49935C6.61529 12.5 5.76745 12.8512 5.14233 13.4763C4.5172 14.1014 4.16602 14.9493 4.16602 15.8333V17.5" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9.99935 9.16667C11.8403 9.16667 13.3327 7.67428 13.3327 5.83333C13.3327 3.99238 11.8403 2.5 9.99935 2.5C8.1584 2.5 6.66602 3.99238 6.66602 5.83333C6.66602 7.67428 8.1584 9.16667 9.99935 9.16667Z" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                  <label htmlFor="name" className='absolute -top-8 left-0 text-gray-700 font-medium  '>الاسم كامل</label>
                  <input
                   name="name"
                   value={formData.name}
                   onChange={handleChange}
                   type="text"
                   required
                   dir="ltr"
                   placeholder="أدخل اسمك الكامل"
                   className="bg-gray-50 border border-gray-200 text-sm rounded-md focus:border-green-600 focus:outline-none block w-full px-3 py-3 focus:ring-4 focus:ring-green-200"
                   />
                </div>
                {/* فون */}
                <div className='mb-12 relative'>
                  <svg className='text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 ' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3332 14.1V16.6C18.3341 16.8321 18.2866 17.0618 18.1936 17.2745C18.1006 17.4871 17.9643 17.678 17.7933 17.8349C17.6222 17.9918 17.4203 18.1113 17.2005 18.1856C16.9806 18.26 16.7477 18.2876 16.5165 18.2667C13.9522 17.9881 11.489 17.1118 9.32486 15.7084C7.31139 14.4289 5.60431 12.7219 4.32486 10.7084C2.91651 8.53438 2.04007 6.0592 1.76653 3.48337C1.7457 3.25293 1.77309 3.02067 1.84695 2.80139C1.9208 2.58211 2.03951 2.38061 2.1955 2.20972C2.3515 2.03883 2.54137 1.9023 2.75302 1.80881C2.96468 1.71532 3.19348 1.66692 3.42486 1.66671H5.92486C6.32928 1.66273 6.72136 1.80594 7.028 2.06965C7.33464 2.33336 7.53493 2.69958 7.59153 3.10004C7.69705 3.9001 7.89274 4.68565 8.17486 5.44171C8.28698 5.73998 8.31125 6.06414 8.24478 6.37577C8.17832 6.68741 8.02392 6.97347 7.79986 7.20004L6.74153 8.25837C7.92783 10.3447 9.65524 12.0721 11.7415 13.2584L12.7999 12.2C13.0264 11.976 13.3125 11.8216 13.6241 11.7551C13.9358 11.6887 14.2599 11.7129 14.5582 11.825C15.3143 12.1072 16.0998 12.3029 16.8999 12.4084C17.3047 12.4655 17.6744 12.6694 17.9386 12.9813C18.2029 13.2932 18.3433 13.6914 18.3332 14.1Z" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <label htmlFor="phone" className='absolute -top-8 left-0 text-gray-700 font-medium '>رقم الهاتف</label>
                  <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  dir="ltr"
                  required
                  className="bg-gray-50 border border-gray-200 text-sm rounded-md focus:border-green-600 focus:outline-none block w-full px-3 py-3 focus:ring-4 focus:ring-green-200"
                  />
                </div>
                {/* بريد */}
                <div className='mb-12 relative  '>
                  <svg className='text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 ' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.666 3.33337H3.33268C2.41221 3.33337 1.66602 4.07957 1.66602 5.00004V15C1.66602 15.9205 2.41221 16.6667 3.33268 16.6667H16.666C17.5865 16.6667 18.3327 15.9205 18.3327 15V5.00004C18.3327 4.07957 17.5865 3.33337 16.666 3.33337Z" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M18.3327 5.83337L10.8577 10.5834C10.6004 10.7446 10.3029 10.83 9.99935 10.83C9.69575 10.83 9.39829 10.7446 9.14102 10.5834L1.66602 5.83337" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                  <label htmlFor="email" className='absolute -top-8 left-0 text-gray-700 font-medium '>أدخل بريدك الإلكتروني</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    dir="ltr"
                    required
                    placeholder="أدخل بريدك الإلكتروني"
                    className="bg-gray-50 border border-gray-200 text-sm rounded-md focus:border-green-600 focus:outline-none block w-full px-3 py-3 focus:ring-4 focus:ring-green-200"
                  />                                                                                                                 
                </div>
                {/* كلمه المرور */}
                <div className='mb-12 relative'>
                  <svg className='text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 ' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8333 9.16663H4.16667C3.24619 9.16663 2.5 9.91282 2.5 10.8333V16.6666C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6666V10.8333C17.5 9.91282 16.7538 9.16663 15.8333 9.16663Z" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5.83398 9.16663V5.83329C5.83398 4.72822 6.27297 3.66842 7.05437 2.88701C7.83577 2.10561 8.89558 1.66663 10.0007 1.66663C11.1057 1.66663 12.1655 2.10561 12.9469 2.88701C13.7283 3.66842 14.1673 4.72822 14.1673 5.83329V9.16663" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                  <label htmlFor="password" className='absolute -top-8 left-0 text-gray-700 font-medium '> كلمة المرور</label>

                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    dir="ltr"
                   type="password"
                   className="bg-gray-50 border border-gray-200 text-sm rounded-md focus:border-green-600 focus:outline-none block w-full px-3 py-3 focus:ring-4 focus:ring-green-200 placeholder-gray-400 placeholder:text-sm placeholder:font-medium"
                   placeholder="أدخل كلمة المرور"
                   required
                  />

                </div>
               {/* تاريخ الميلاد */}
               <div className='mb-12 relative'>
               <label className='absolute -top-8 left-0 text-gray-700 font-medium'> تاريخ الميلاد</label>

                <DatePicker
                 selected={formData.birthDate}
                 onChange={(date) =>
                 setFormData(prev => ({
                 ...prev,
                 birthDate: date
                    }))
                  }
                 dateFormat="yyyy/MM/dd"
                 showYearDropdown
                 showMonthDropdown
                 dropdownMode="select"
                //  maxDate={new Date("2010-12-31")}
                 placeholderText="اختر تاريخ الميلاد"
                 className="bg-gray-50 border border-gray-200 text-sm rounded-md 
                 focus:border-green-600 focus:outline-none block w-full px-3 py-3 
                 focus:ring-4 focus:ring-green-200"
                 wrapperClassName="w-full"
                />
                </div>
                {/* تاريخ الميلاد */}

                {/* رفع صورة */}
                <div className="mb-12 relative ">
                  <p className="absolute -top-8 left-0 text-gray-700 font-medium ">الصورة الشخصية</p>
                  <label
                    htmlFor="idCardUpload"
                    className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-md  focus:outline-none w-full py-3 cursor-pointer  "
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_703_37480)">
                        <path d="M12.0827 3.33337H7.91602L5.83268 5.83337H3.33268C2.89065 5.83337 2.46673 6.00897 2.15417 6.32153C1.84161 6.63409 1.66602 7.05801 1.66602 7.50004V15C1.66602 15.4421 1.84161 15.866 2.15417 16.1786C2.46673 16.4911 2.89065 16.6667 3.33268 16.6667H16.666C17.108 16.6667 17.532 16.4911 17.8445 16.1786C18.1571 15.866 18.3327 15.4421 18.3327 15V7.50004C18.3327 7.05801 18.1571 6.63409 17.8445 6.32153C17.532 6.00897 17.108 5.83337 16.666 5.83337H14.166L12.0827 3.33337Z" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 13.3334C11.3807 13.3334 12.5 12.2141 12.5 10.8334C12.5 9.45266 11.3807 8.33337 10 8.33337C8.61929 8.33337 7.5 9.45266 7.5 10.8334C7.5 12.2141 8.61929 13.3334 10 13.3334Z" stroke="#99A1AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_703_37480">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className='text-gray-400 font-medium'> {formData.image ? formData.image.name : "رفع صورة"} </span>
                  </label>

                  <input
                    ref={imageRef}
                    id="idCardUpload"
                    name="image"
                    onChange={handleChange}
                    type="file"
                    className="hidden"
                    accept="image/*"
                  />
                </div>

                <div className="flex items-center gap-2 mb-6 bg-gray-50 py-3 px-3 rounded-lg">
                  <input className='accent-green-600' type="checkbox" id="terms" required />

                  <label htmlFor="terms" className="text-sm text-gray-600">
                    أوافق على{" "}
                    <Link to="#" className="text-green-600 underline">
                      الشروط والأحكام
                    </Link>{" "}
                    و{" "}
                    <Link to="#" className="text-green-600 underline">
                      سياسة الخصوصية
                    </Link>
                  </label>
                </div>

                <button type="submit" className="text-white    font-medium  rounded-lg text-2xl px-4 py-2.5  bg-green-600  w-full md: lg:w-full cursor-pointer ">إنشاء الحساب</button>
                <div className='flex gap-2 justify-center mt-7 border-t-2 pt-5 border-gray-200 text-lg'>
                  <span className='font-medium  text-gray-500 '>لديك حساب بالفعل؟ </span>
                  <Link to={"/login"} className='font-medium  text-green-600 cursor-pointer hover:text-green-700 transition duration-300'>تسجيل الدخول</Link>
                </div>
              </form>
            </div>
          </div>

          <div className='w-full lg:w-1/2 md:pr-10 mt-7 lg:mt-0 '>
              
             <div className=''>
                <h2 className=' text-4xl font-semibold'> احصل على خدمات

                  <span className='block text-green-600'>
                    منزلية احترافية
                  </span>
                </h2>
                <p className='text-gray-500 mt-5 font-semibold '>خدمات موثوقة من فنيين معتمدين</p>
                {/* icons */}
                <div className='mt-5'>
                  <div className='flex items-center mb-5'>
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 16C0 7.16344 7.16344 0 16 0H40C48.8366 0 56 7.16344 56 16V40C56 48.8366 48.8366 56 40 56H16C7.16344 56 0 48.8366 0 40V16Z" fill="#00A63E" />
                      <path d="M41.0681 25.3333C41.6771 28.3217 41.2431 31.4286 39.8386 34.1357C38.4341 36.8429 36.144 38.9867 33.3502 40.2097C30.5563 41.4328 27.4276 41.661 24.4859 40.8565C21.5441 40.0519 18.9671 38.2632 17.1845 35.7885C15.4019 33.3139 14.5216 30.303 14.6904 27.2578C14.8591 24.2127 16.0666 21.3174 18.1117 19.0549C20.1567 16.7923 22.9156 15.2992 25.9282 14.8246C28.9409 14.35 32.0252 14.9225 34.6668 16.4467" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M24 26.6667L28 30.6667L41.3333 17.3334" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>


                    <span className='pr-5 '>
                      <h3 className=' text-xl font-medium'>فنيون موثوقون</h3>

                      <p className='text-gray-500 font-medium'>جميع الفنيين معتمدون ومدربون على أعلى مستوى من الاحترافية</p>

                    </span>
                  </div>
                  <div className='flex items-center  mb-5'>
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 16C0 7.16344 7.16344 0 16 0H40C48.8366 0 56 7.16344 56 16V40C56 48.8366 48.8366 56 40 56H16C7.16344 56 0 48.8366 0 40V16Z" fill="#00A63E" />
                      <path d="M17.334 30.6667C17.0817 30.6675 16.8343 30.5968 16.6206 30.4627C16.4069 30.3285 16.2356 30.1365 16.1267 29.9089C16.0178 29.6813 15.9757 29.4275 16.0053 29.1769C16.0349 28.9263 16.135 28.6893 16.294 28.4933L29.494 14.8933C29.593 14.7791 29.7279 14.7018 29.8766 14.6743C30.0253 14.6468 30.1789 14.6707 30.3123 14.742C30.4456 14.8133 30.5508 14.9279 30.6104 15.0668C30.6701 15.2058 30.6807 15.3609 30.6406 15.5067L28.0806 23.5333C28.0052 23.7354 27.9798 23.9527 28.0068 24.1667C28.0337 24.3807 28.1122 24.5849 28.2354 24.7619C28.3587 24.9389 28.523 25.0834 28.7143 25.1829C28.9057 25.2824 29.1183 25.334 29.334 25.3333H38.6673C38.9196 25.3325 39.167 25.4032 39.3807 25.5374C39.5944 25.6715 39.7657 25.8635 39.8746 26.0911C39.9835 26.3187 40.0256 26.5726 39.996 26.8231C39.9664 27.0737 39.8663 27.3107 39.7073 27.5067L26.5073 41.1067C26.4083 41.221 26.2734 41.2982 26.1247 41.3257C25.976 41.3532 25.8223 41.3293 25.689 41.258C25.5557 41.1867 25.4505 41.0722 25.3909 40.9332C25.3312 40.7943 25.3205 40.6392 25.3606 40.4933L27.9206 32.4667C27.9961 32.2646 28.0215 32.0473 27.9945 31.8333C27.9676 31.6194 27.8891 31.4151 27.7659 31.2381C27.6426 31.0611 27.4783 30.9167 27.2869 30.8171C27.0956 30.7176 26.883 30.666 26.6673 30.6667H17.334Z" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <span className='pr-5'>
                      <h3 className=' text-xl font-medium'>حجز سريع</h3>
                      <p className='text-gray-500 font-medium'>احجز خدمتك في دقائق واحصل على فني في نفس اليوم</p>
                    </span>
                  </div>
                  <div className='flex items-center  mb-5'>
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 16C0 7.16344 7.16344 0 16 0H40C48.8366 0 56 7.16344 56 16V40C56 48.8366 48.8366 56 40 56H16C7.16344 56 0 48.8366 0 40V16Z" fill="#4CAF50" />
                      <path d="M27.9993 41.3333C35.3631 41.3333 41.3327 35.3638 41.3327 28C41.3327 20.6362 35.3631 14.6666 27.9993 14.6666C20.6356 14.6666 14.666 20.6362 14.666 28C14.666 35.3638 20.6356 41.3333 27.9993 41.3333Z" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M28 20V28L33.3333 30.6667" stroke="white" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <span className='pr-5'>
                      <h3 className=' text-xl font-medium'>متابعة مستمرة</h3>
                      <p className='text-gray-500 font-medium'>تابع حالة طلبك وتواصل مع الفني بكل سهولة</p>
                    </span>
                  </div>
                </div>
                <div className=' flex flex-wrap gap-3 justify-start lg:justify-start  pt-5'>
                  <div className='w-full lg:w-1/4 py-5 rounded-2xl text-green-600 text-center shadow-2xl '>
                    <span className='text-3xl font-medium  block'>50K</span>
                    <span className='text-gray-500 font-medium'>عميل سعيد</span>
                  </div>
                  <div className='w-full lg:w-1/4  py-5 rounded-2xl text-green-800 text-center shadow-2xl '>
                    <span className='text-3xl font-medium  block'>1.2</span>
                    <span className='text-gray-500 font-medium'>فني محترف</span>
                  </div>
                  <div className='w-full lg:w-1/4  py-5 rounded-2xl text-green-800 text-center shadow-2xl '>
                    <span className='text-3xl font-medium  block'>4.9</span>
                    <span className='text-gray-500 font-medium'>تقييم المنصه</span>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div> 
    </section>
<Toaster position="top-center" reverseOrder={false} />
  </>
  )
}
