import React from "react";
import { Link } from "react-router-dom";
import emailIcon from "../../assets/email.png";
import phoneIcon from "../../assets/telephone.png";
import locationIcon from "../../assets/location.png";
import footerLogo from "../../assets/footer.png";
export default function Footer() {
  return (
      <footer className="bg-[#E5E7EB] pt-16 pb-6">  

      <div className="container mx-auto">
        <div dir="ltr" className="grid grid-cols-4 gap-12 text-right">

          {/* تواصل معنا */}
          <div>
            <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>

            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center justify-end gap-2">
                +966 50 123 4567
                <img src={phoneIcon} alt="Phone" className="w-5 h-5" />
              </li>

              <li className="flex items-center justify-end gap-2">
                info@homefix.com
                <img src={emailIcon} alt="Email" className="w-5 h-5" />
              </li>

              <li className="flex items-center justify-end gap-2">
                القاهرة، مصر
                <img src={locationIcon} alt="Location" className="w-5 h-5" />
              </li>
            </ul>
          </div>

          {/* خدماتنا */}
          <div>
            <h3 className="font-bold text-lg mb-4">خدماتنا</h3>

            <ul className="space-y-2 text-gray-600">
              <li>كهرباء</li>
              <li>سباكة</li>
              <li>نجارة</li>
              <li>دهانات</li>
              <li>تكييف</li>
            </ul>
          </div>

          {/* روابط سريعة */}
          <div>
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

          {/* logo */}
          <div>
            <div className="flex items-center gap-2 justify-end mb-3">
              <span className="text-2xl font-bold">HomeFix</span>
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                <img src={footerLogo} alt="HomeFix Logo" className="w-6 h-6" />
              </div>
            </div>

            <p className="text-gray-600 leading-7"> منصة شاملة تربطك بأفضل مقدمي الخدمات المنزلية في منطقتك بكل سهولة وأمان . </p>
          </div>

        </div>


        {/* bottom */}
        <div dir="ltr" className="border-t border-gray-300 mt-12 pt-6 flex justify-between text-gray-600">

          <div className="flex gap-6">

  <Link
    to="/terms"
    className="hover:text-green-600 transition"
  >
    الشروط والأحكام
  </Link>

  <Link
    to="/privacy"
    className="hover:text-green-600 transition"
  >
    سياسة الخصوصية
  </Link>

</div>

          <div>
            © 2026 HomeFix. .جميع الحقوق محفوظة
          </div>

        </div>

      </div>
    </footer>
  );
}