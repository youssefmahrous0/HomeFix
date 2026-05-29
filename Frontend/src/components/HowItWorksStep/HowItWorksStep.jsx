import React from 'react'
import style from './HowItWorksStep.module.css'
export default function HowItWorksStep() {
  return <>
  {/* كيف يعمل HomeFix؟ */}

    <section className="py-12">
  
  {/* header */}
  <div className="text-center mb-12">
    <h2 className="font-bold text-2xl md:text-4xl mb-5">
      كيف يعمل HomeFix؟
    </h2>

    <p className="text-gray-600 font-medium text-sm md:text-lg">
      احصل على الخدمة التي تحتاجها في 4 خطوات بسيطة
    </p>
  </div>

  <div className="container mx-auto px-4">

    {/* cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* card 1 */}
      <div className="text-center px-5 py-7 shadow-xl rounded-2xl">
        <span className="fa-stack fa-2x mb-3">
          <i className="fa-solid fa-circle fa-stack-2x text-green-600"></i>
          <span className="fa-stack-1x fa-inverse">1</span>
        </span>

        <h3 className="font-bold text-lg my-3">
          اختر الخدمة
        </h3>

        <p className="text-gray-600 font-medium">
          تصفح الخدمات المتاحة واختر ما يناسبك
        </p>
      </div>

      {/* card 2 */}
      <div className="text-center px-5 py-7 shadow-xl rounded-2xl">
        <span className="fa-stack fa-2x mb-3">
          <i className="fa-solid fa-circle fa-stack-2x text-green-600"></i>
          <span className="fa-stack-1x fa-inverse">2</span>
        </span>

        <h3 className="font-bold text-lg my-3">
          احجز موعد
        </h3>

        <p className="text-gray-600 font-medium">
          حدد الوقت والتاريخ المناسب لك
        </p>
      </div>

      {/* card 3 */}
      <div className="text-center px-5 py-7 shadow-xl rounded-2xl">
        <span className="fa-stack fa-2x mb-3">
          <i className="fa-solid fa-circle fa-stack-2x text-green-600"></i>
          <span className="fa-stack-1x fa-inverse">3</span>
        </span>

        <h3 className="font-bold text-lg my-3">
          قيّم الخدمة
        </h3>

        <p className="text-gray-600 font-medium">
          شارك تجربتك وقيّم مقدم الخدمة
        </p>
      </div>

      {/* card 4 */}
      <div className="text-center px-5 py-7 shadow-xl rounded-2xl">
        <span className="fa-stack fa-2x mb-3">
          <i className="fa-solid fa-circle fa-stack-2x text-green-600"></i>
          <span className="fa-stack-1x fa-inverse">4</span>
        </span>

        <h3 className="font-bold text-lg my-3">
          استقبل الخدمة
        </h3>

        <p className="text-gray-600 font-medium">
          سيصل إليك مقدم الخدمة في الموعد المحدد
        </p>
      </div>

    </div>
  </div>
</section>
  </>
}
