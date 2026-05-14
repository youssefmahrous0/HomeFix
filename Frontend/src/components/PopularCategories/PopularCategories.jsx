import React from "react";
import { Link } from "react-router-dom";
import carpentry from "../../assets/carpentry.png";
import plumbing from "../../assets/plumbing.png";
import electric from "../../assets/electric.png";
import general from "../../assets/general.png";
import ac from "../../assets/ac.png";
import painting from "../../assets/painting.png";
import Icon2 from "../../assets/Vector2.png";
import Icon3 from "../../assets/Vector3.png";
import Icon4 from "../../assets/Vector4.png";
import Icon5 from "../../assets/Vector5.png";
import Icon6 from "../../assets/Vector6.png";
import Icon7 from "../../assets/Vector7.png";

export default function PopularCategories() {

  const services = [
    {
      title: "كهرباء",
      desc: "تركيب وصيانة الأنظمة الكهربائية",
      slug: "electric",
      image: electric,
      color: "bg-yellow-600",
      icon: Icon2
    },
    {
      title: "سباكة",
      desc: "إصلاح وتركيب أنظمة المياه",
      slug: "plumbing",
      image: plumbing,
      color: "bg-green-700",
      icon: Icon3
    },
    {
      title: "نجارة",
      desc: "صناعة وإصلاح الأثاث الخشبي",
      slug: "carpentry",
      image: carpentry,
      color: "bg-yellow-500",
      icon: Icon4
    },
    {
      title: "دهانات",
      desc: "دهان وتجديد الجدران",
      slug: "painting",
      image: painting,
      color: "bg-green-500",
      icon: Icon5
    },
    {
      title: "تكييف",
      desc: "تركيب وصيانة المكيفات",
      slug: "ac",
      image: ac,
      color: "bg-green-800",
      icon: Icon6
    },
    {
      title: "خدمات عامة",
      desc: "خدمات الصيانة المتنوعة",
      slug: "general",
      image: general,
      color: "bg-green-600",
      icon: Icon7
    }
    
    
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto">

        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl mb-4">خدماتنا المتنوعة</h2>
          <p className="text-gray-600">
            نوفر لك مجموعة شاملة من الخدمات المنزلية على يد محترفين مدربين
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            
            <Link
              key={index}
              to={`/servicesProviderPage?service=${service.slug}`}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition block group" >
                
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
                />

                {/* overlay */}
                    
                    <div className={`absolute inset-0 ${service.color}/70`} />

                {/* icon */}
                 <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
                 <img  src={service.icon} alt={service.title} className="w-6 h-6 object-contain" /> </div>
              </div>

              <div className="p-5 text-right">
                <h3 className="font-bold text-lg mb-1">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.desc}
                </p>
              </div>
            </Link>

          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/servicesPage"
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition inline-block"
          >
            استعرض جميع الخدمات
          </Link>
        </div>

      </div>
    </section>
  );
}