import React from "react";

export default function ServiceProviderCTA() {
  return (
    <section className="bg-gray-50 py-16 mt-10">
      <div className="container mx-auto text-center">

        <h2 className="text-2xl font-semibold mb-3">
          هل أنت فني محترف؟
        </h2>

        <p className="text-gray-500 mb-6">
          انضم إلى شبكتنا واحصل على المزيد من العملاء
        </p>

        <button className="bg-green-600 text-white px-6 py-3 rounded-lg">
          سجل كفني الآن
        </button>

      </div>
    </section>
  );
}