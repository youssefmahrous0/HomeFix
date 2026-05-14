import React, { useState } from 'react'
import style from './ServicesHeroSearch.module.css'
import Select from 'react-select';


export default function ServicesHeroSearch() {

  // const [selectedGovernorates, setSelectedGovernorates] = useState('');
  const [selectedGovernorates, setSelectedGovernorates] = useState({ value: 'القاهرة', label: 'القاهرة' });

  // هنا بتعرف المتغير
  const Governorates = [
    { value: 'القاهرة' , label: 'القاهرة' },
    { value: 'الجيزة', label: 'الجيزة' },
    { value: 'الإسكندرية', label: 'الإسكندرية' },
    { value: 'الشرقية', label: 'الشرقية' },
    { value: 'الغربية', label: 'الغربية' },
  ];
  return (
    <>
      <section className='bg-green-800 pt-30 pb-12'>
        <header className="container mx-auto  px-5 text-center  ">
          <div className='text-center text-white '>
            <h1 className='text-3xl  leading-15 font-semibold'>كل خدمات البيت في مكان واحد</h1>
            <p className=' font-medium text-gray-200 pb-5 '>اختر الخدمة المناسبة واحجز فني محترف في دقائق</p>
          </div>
          <form className="  flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 shadow-lg   mt-5 border border-gray-100 rounded-2xl py-4 px-5 bg-white ">
            <div className="relative lg:w-2/3 ">
              <div className="absolute ps-3 bottom-1/2 z-10 flex items-center pointer-events-none  translate-y-[50%]">  
                <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
              </div>
              <input
              
                type="text"
                placeholder="ابحث عن خدمة..."
                className="w-full py-3  pr-10 rounded-lg border bg-gray-100 border-gray-300 focus:outline-none focus:ring-3 focus:ring-green-200 focus:border-green-500 hover:border-green-500 text-gray-900 pe-10 placeholder:font-medium"
                dir="rtl"
              />
            </div>
            
            <div className="relative lg:w-1/3">
              <div className="absolute   left-1.5 top-1/2   z-10 flex items-center  pointer-events  -translate-y-[50%]">

                <i class="fa-solid fa-location-dot  text-gray-500"></i>
              </div>
              <Select
               
                options={Governorates}
                value={selectedGovernorates}
                onChange={setSelectedGovernorates}
                
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor: state.isFocused ? '#22c55e' : '#e5e7eb',
                    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(34,197,94,0.25)' : 'none',
                    borderRadius: '0.375rem',
                    backgroundColor: '#f3f4f6',
                    minHeight: '3rem',
                    paddingLeft: '.5rem',
                    paddingRight: '1.7rem',
                    outline: 'none',
                    '&:hover': {
                      borderColor: '#22c55e', // هنا عند hover يصير أخضر
                    },
                  }),



                  placeholder: (base) => ({
                    ...base,
                    color: '#6b7280',
                    marginLeft: '0.5rem', // حرك النص عشان يظهر بعد الأيقونة
                  }),
                  singleValue: (base) => ({
                    ...base,
                    marginLeft: '0.5rem', // نفس الحكاية للقيمة المختارة
                    color: '#111827',
                  }),
                  menu: (base) => ({ ...base, borderRadius: '0.375rem' }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#22c55e' : '#fff',
                    color: state.isFocused ? '#fff' : '#111827',
                    cursor: 'pointer',
                  }),
                }}
              />
            </div>

                

            <button type="submit" class="text-white    font-medium  rounded-lg text-2xl px-10 py-2.5  bg-green-800 hover:bg-green-700 transition duration-700    cursor-pointer ">بحث</button>

          </form>
        </header>


      </section>

    </>
  )
}
/*
كل خدمات البيت في مكان واحد
اختر الخدمة المناسبة واحجز فني محترف في دقائق
بحث
القاهرة
ابحث عن خدمة...
الأكثر طلباً
الخدمات المتاحة
جميع الخدمات (*)
كهرباء منازل
سباكة منزلية
تركيب نجف، صيانة دوائر، مفاتيح وبرايز
تسليك مجاري، إصلاح تسريبات، تركيب خلاطات
38 فني متاح
4.9
45 فني متاح
4.8
120 جنيه
يبدأ من
150 جنيه
يبدأ من
عرض الفنيين
عرض الفنيين
تنظيف شامل
صيانة تكييف
تنظيف منازل، شقق، فلل بالكامل
تنظيف، صيانة دورية، إصلاح أعطال
56 فني متاح
4.6
32 فني متاح
4.7
300 جنيه
يبدأ من
200 جنيه
يبدأ من
عرض الفنيين
عرض الفنيين
نجارة
دهانات
تركيب أثاث، إصلاح خشب، تفصيل
دهان حوائط، ديكورات، ورق حائط
24 فني متاح
4.7
28 فني متاح
4.8
180 جنيه
يبدأ من
250 جنيه
يبدأ من
عرض الفنيين
عرض الفنيين
ألوميتال
صيانة أجهزة كهربائية
نوافذ، أبواب، شبابيك ألوميتال
غسالات، ثلاجات، بوتاجاز، ميكروويف
19 فني متاح
4.5
41 فني متاح
4.9
350 جنيه
يبدأ من
160 جنيه
يبدأ من
عرض الفنيين
عرض الفنيين
تسليك مجاري
تركيب سخانات
تسليك بالوعات، أحواض، مراحيض
تركيب وصيانة سخانات المياه
35 فني متاح
4.6
22 فني متاح
4.8
100 جنيه
يبدأ من
140 جنيه
يبدأ من
عرض الفنيين
عرض الفنيين
تنظيف تكييفات
تركيب نجف ولمبات
تنظيف عميق للوحدات الداخلية والخارجية
تركيب إضاءة، نجف، كشافات LED
28 فني متاح
4.8
40 فني متاح
4.7
150 جنيه
يبدأ من
110 جنيه
يبدأ من
عرض الفنيين
عرض الفنيين
تركيب ورق حائط
تنظيف بعد البناء
تركيب ورق جدران بجميع الأنواع
تنظيف شامل بعد الدهان والتشطيب
15 فني متاح
4.6
20 فني متاح
4.5
200 جنيه
يبدأ من
400 جنيه
يبدأ من
عرض الفنيين
عرض الفنيين
صيانة غسالات
تركيب أثاث ايكيا
إصلاح أعطال الغسالات الأوتوماتيك
تركيب وفك أثاث ايكيا والأثاث المستورد
25 فني متاح
4.7
30 فني متاح
4.9
130 جنيه
يبدأ من
120 جنيه
يبدأ من
عرض الفنيين
عرض الفنيين
إصلاح حنفيات
تركيب شبابيك
تغيير وإصلاح حنفيات المياه
تركيب شبابيك ألوميتال وسحاب
42 فني متاح
4.7
18 فني متاح
4.6
80 جنيه
يبدأ من
300 جنيه
يبدأ من
عرض الفنيين
عرض الفنيين
هل لديك خدمة خاصة تحتاجها؟
تواصل معنا وسنساعدك في إيجاد الفني المناسب
تواصل معنا */
