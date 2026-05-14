import React from "react";

export default function ServicesHeader() {
  return (
    <div className="flex justify-between items-center mb-6">

      <div>
        <h2 className="text-2xl font-bold">الخدمات المتاحة</h2>
        <span className="text-gray-500">جميع الخدمات (18)</span>
      </div>

      <select className="border px-4 py-2 rounded-lg bg-gray-100">
        <option>الأكثر طلباً</option>
        <option>الأعلى تقييماً</option>
        <option>الأقل سعراً</option>
      </select>

    </div>
  );
}