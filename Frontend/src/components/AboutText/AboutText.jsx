import React from 'react'
import style from './AboutText.module.css'
export default function AboutText() {
  return (
    <>
      <section className='bg-gray-50 w-3/4 mx-auto  my-12'>
        <div className="container ">
          {/* header */}
          <div className='text-center  mb-12 '>
            <h2 className='font-medium text-2xl mb-5'>قصتنا</h2>
            <p className='text-gray-600 font-medium leading-relaxed  mb-5'>
              بدأت HomeFix كفكرة بسيطة: تسهيل الحصول على خدمات منزلية موثوقة في مصر. لاحظنا أن العديد من المصريين يواجهون صعوبة في العثور على فنيين محترفين وموثوقين، وأن عملية الحجز والتواصل غالباً ما تكون معقدة وغير منظمة.
            </p>
            <p className='text-gray-600 font-medium leading-relaxed  mb-5'>
              في عام 2023، قررنا إطلاق المنصة لحل هذه المشكلة. بدأنا بخدمات بسيطة مثل السباكة والكهرباء، ثم توسعنا تدريجياً لنشمل جميع الخدمات المنزلية. اليوم، نفخر بخدمة آلاف العملاء في جميع أنحاء مصر، مع شبكة من أكثر من 8,000 فني معتمد.            </p>
            <p className='text-gray-600 font-medium leading-relaxed  '>
              نؤمن بأن التكنولوجيا يمكن أن تجعل حياة الناس أسهل، ونواصل العمل كل يوم لتحسين خدماتنا وتوسيع نطاق وصولنا. رؤيتنا هي أن نصبح المنصة الأولى للخدمات المنزلية في الشرق الأوسط.            </p>


          </div>

        </div>
      </section>
    </>
  )
}
