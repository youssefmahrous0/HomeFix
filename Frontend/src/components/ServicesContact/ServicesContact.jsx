import React from 'react'
import style from './ServicesContact.module.css'
import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-green-600 py-16 text-center text-white">
      <h2 className="text-2xl font-bold mb-2">
        هل لديك خدمة خاصة تحتاجها؟
      </h2>

      <p className="mb-6">فريقنا جاهز لمساعدتك</p>

      <button
        onClick={() => navigate("/contact")}
        className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold"
      >
        تواصل معنا
      </button>
    </section>
  );
}
