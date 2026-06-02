import style from './ContactForm.module.css'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { toast } from "react-toastify";


export default function ContactForm() {
   const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  // تحديث البيانات
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  // إرسال الفورم
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("homefix-production-0bc9.up.railway.app/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      toast.success("تم إرسال الرسالة ✅", {
       position: "top-center",
       style: {
       top: "50%",
       transform: "translateY(-50%)",
       textAlign: "center",
  },
});

      // reset
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });

    } catch (err) {
      console.log(err);
      alert("حصل خطأ ❌");
    }
  };

  return (

    <div className="rounded-lg  border border-gray-200   my-12 p-8 shadow-lg ">
      <h2 className="font-medium text-xl  pb-5  text-left">أرسل لنا رسالة</h2>

      <form onSubmit={handleSubmit} className=" mt-12 ">
        {/* fullname */}
        <div className='mb-12 relative'>
          <label htmlFor="name" className='absolute left-0 -top-8 text-gray-700 font-medium '>الاسم الكامل</label>

          <input
            dir='ltr'
            type="text"
            id="name"
            value={form.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-200  text-sm rounded-md focus:border-green-600 focus:outline-none block w-full px-3 py-3 focus:ring-4 focus:ring-green-200"
            placeholder="أدخل اسمك الكامل"
            required
          />
        </div>

        <div className='mb-12 flex flex-col lg:flex-row gap-12 lg:gap-6 lg:justify-between  '>
          {/* email */}

          <div className=' relative w-full lg:w-[48%]'>
            <label htmlFor="email" className='absolute left-0 -top-8 text-gray-700 font-medium '>البريد الالكتروني</label>
            <input
              dir='ltr'
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-200  text-sm rounded-md focus:border-green-600 focus:outline-none block w-full px-3 py-3 focus:ring-4 focus:ring-green-200"
              placeholder="example@email.com"
              required
            />
          </div>

          {/* phone number */}
          <div className='m relative w-full lg:w-[48%]'>
            <label htmlFor="phone" className='absolute left-0 -top-8 text-gray-700 font-medium '>رقم الهاتف</label>

            <input
              dir='ltr'
              type="tel"
              id="phone"
              value={form.phone}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-200  text-sm rounded-md focus:border-green-600 focus:outline-none block w-full px-3 py-3 focus:ring-4 focus:ring-green-200"
              placeholder="01XXXXXXXXX"
              required
            />

          </div>
        </div>

        {/* subject */}

        <div className='mb-12 relative'>
          <label htmlFor="subject" className='absolute left-0 -top-8 text-gray-700 font-medium '>الموضوع</label>

          <input
            dir='ltr'
            type="text"
            id="subject"
            value={form.subject}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-200  text-sm rounded-md focus:border-green-600 focus:outline-none block w-full px-3 py-3 focus:ring-4 focus:ring-green-200"
            required
          />

        </div>
        {/* message */}
        <div className='mb-12 relative'>
          <label htmlFor="message" className='absolute left-0 -top-8 text-gray-700 font-medium '>الرسالة</label>

          <textarea
            dir='ltr'
            type="text"
            id="message"
            value={form.message}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-200  text-sm rounded-md focus:border-green-600 focus:outline-none block w-full px-3 py-3 focus:ring-4 focus:ring-green-200"
            placeholder="....اكتب رسالتك هنا"
            required
          />

        </div>

        <button type="submit" className="text-white font-medium  rounded-lg text-xl px-4 py-2.5  bg-green-600 hover:bg-green-700 transition duration-300    cursor-pointer flex items-center justify-between  ">
          <svg className='ml-3 ' width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.69119 14.4573C9.71652 14.5205 9.76055 14.5743 9.81737 14.6117C9.87419 14.6491 9.94109 14.6682 10.0091 14.6664C10.0771 14.6647 10.1429 14.6422 10.1977 14.6019C10.2526 14.5617 10.2938 14.5057 10.3159 14.4413L14.6492 1.77466C14.6705 1.71559 14.6746 1.65167 14.6609 1.59037C14.6473 1.52907 14.6164 1.47293 14.572 1.42852C14.5276 1.3841 14.4715 1.35326 14.4102 1.33959C14.3489 1.32592 14.2849 1.32999 14.2259 1.35133L1.55919 5.68466C1.49485 5.70673 1.4388 5.74794 1.39857 5.80278C1.35833 5.85761 1.33584 5.92344 1.33409 5.99144C1.33235 6.05943 1.35145 6.12632 1.38883 6.18315C1.4262 6.23997 1.48007 6.284 1.54319 6.30933L6.82986 8.42933C6.99698 8.49624 7.14882 8.5963 7.27623 8.72348C7.40364 8.85066 7.50398 9.00233 7.57119 9.16933L9.69119 14.4573Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.5687 1.43127L7.27539 8.72394" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          إرسال الرسالة
        </button>
      </form>
    </div>
  )
}
