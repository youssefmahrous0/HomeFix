import React from 'react'
import { Link } from "react-router-dom";
import style from './CallToAction.module.css'
export default function CallToAction() {
  return (
    <section className="bg-green-600 py-16 text-center text-white">
      <h2 className="text-3xl font-bold mb-4">جاهز للبدء؟</h2>

      <p className="mb-8">
        انضم إلى آلاف العملاء الذين يثقون بنا للحصول على أفضل الخدمات المنزلية
      </p>

      <div className="flex justify-center gap-4">

        <Link
          to="/register"
          className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          إنشاء حساب
        </Link>

        <Link
          to="/ServicesProviderPage"
          className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-600 transition"
        >
          تصفح مقدمي الخدمات
        </Link>

      </div>
    </section>
  );
}
