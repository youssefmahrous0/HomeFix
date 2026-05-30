import React from "react";
import { Link,useNavigate } from "react-router-dom";
import emailIcon from "../../assets/email.png";
import phoneIcon from "../../assets/telephone.png";
import locationIcon from "../../assets/location.png";
import footerLogo from "../../assets/footer.png";
import { requireAuth } from "../../api/utils/auth";


export default function Footer() {
  const navigate = useNavigate();

  return (
      <footer className="bg-[#E5E7EB] pt-16 pb-6">  

      <div className="container mx-auto">
        <div dir="ltr" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-right">

           {/* logo */}
          <div className="lg:order-4">
            <div className="flex items-center gap-2 md:justify-end justify-center mb-3">
              <span className="text-2xl font-bold">HomeFix</span>
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                <img src={footerLogo} alt="HomeFix Logo" className="w-6 h-6" />
              </div>
            </div>

            <p className="text-gray-600 leading-7"> منصة شاملة تربطك بأفضل مقدمي الخدمات المنزلية في منطقتك بكل سهولة وأمان . </p>
          </div>

{/*مساعدة ودعم */}
 
<div className="lg:order-2">
  <h3 className="font-bold text-lg mb-4">المساعدة والدعم</h3>

  <ul className="space-y-2 text-gray-500">
    <li>
      <Link to="/faq" className="hover:text-green-600">
        الأسئلة الشائعة
      </Link>
    </li>

    <li>
      <Link to="/terms" className="hover:text-green-600">
        الشروط والأحكام
      </Link>
    </li>

    <li>
      <Link to="/privacy" className="hover:text-green-600">
        سياسة الخصوصية
      </Link>
    </li>

    <li>
      <Link
  to="#"
  onClick={(e) => {
    e.preventDefault();

    if (requireAuth(navigate)) {
      navigate("/search");
    }
  }}
  className="hover:text-green-600"
>
  بحث متقدم
</Link>
    </li>
  </ul>
</div>

{/* روابط سريعة */}
          <div className="lg:order-3">
            <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>

            <ul className="space-y-2 text-gray-500">
  <li>
    <Link to="/" className="hover:text-green-600">
      الرئيسية
    </Link>
  </li>

  <li>
    <Link to="/about" className="hover:text-green-600">
      من نحن
    </Link>
  </li>

  <li>
    <Link to="/servicesPage" className="hover:text-green-600">
      الخدمات
    </Link>
  </li>

  <li>
    <Link to="/servicesProviderPage" className="hover:text-green-600">
      مقدمو الخدمات
    </Link>
  </li>

  <li>
    <Link to="/contact" className="hover:text-green-600">
      تواصل معنا
    </Link>
  </li>
</ul>
          </div>
          {/* تواصل معنا */}
         <div className="lg:order-1">
            <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>

            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center md:justify-end justify-center gap-2">
                +966 50 123 4567
                <img src={phoneIcon} alt="Phone" className="w-5 h-5" />
              </li>

              <li className="flex items-center md:justify-end justify-center gap-2">
                info@homefix.com
                <img src={emailIcon} alt="Email" className="w-5 h-5" />
              </li>

              <li className="flex items-center md:justify-end justify-center gap-2">
                القاهرة، مصر
                <img src={locationIcon} alt="Location" className="w-5 h-5" />
              </li>
            </ul>
          </div>
        </div>

        {/* bottom */}
        <div
  dir="rtl"
  className="border-t border-gray-300 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
>
  <div>
    جميع الحقوق محفوظة © 2026 HomeFix.
  </div>

  <div className="flex gap-6">
    <Link to="/privacy">سياسة الخصوصية</Link>
    <Link to="/terms">الشروط والأحكام</Link>
    <Link to="/faq">الأسئلة الشائعة</Link>
  </div>
</div>

      </div>
    </footer>
  );
}