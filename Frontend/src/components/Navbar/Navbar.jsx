import React, { useState, useEffect } from "react";
import logo from "../../assets/footer.png";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";

export default function Navbar() {

  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        
        {/* right - logo */}
<Link to="/" className="flex items-center gap-2">
  <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white">
    <img src={logo} className="w-9 h-9" />
  </div>

  <div className="text-right">
    <h1 className="font-semibold">HomeFix</h1>
    <p className="text-xs text-gray-500">
      حلول منزلية متكاملة
    </p>
  </div>
</Link>

        {/* center - links */}
           {/* links */}
        <nav className="hidden md:flex items-center gap-8 text-gray-600">

  <Link 
    to="/" 
    className={location.pathname === "/" ? "text-green-600 font-medium" : ""}
  >
    الرئيسية
  </Link>

  <Link 
    to="/about"
    className={location.pathname === "/about" ? "text-green-600 font-medium" : ""}
  >
    من نحن
  </Link>

  <Link 
    to="/ServicesPage"
    className={location.pathname === "/ServicesPage" ? "text-green-600 font-medium" : ""}
  >
    الخدمات
  </Link>

  <Link 
    to="/ServicesProviderPage"
    className={location.pathname === "/ServicesProviderPage" ? "text-green-600 font-medium" : ""}
  >
    مقدمو الخدمات
  </Link>

  <Link 
    to="/contact"
    className={location.pathname === "/contact" ? "text-green-600 font-medium" : ""}
  >
    تواصل معنا
  </Link>

  {token && (
  <Link 
    to="/search"
    className={`flex items-center gap-1 ${
      location.pathname === "/search"
        ? "text-green-600 font-medium"
        : "text-gray-600"
    }`}
  >
    {/* 🔍 Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.65" y1="16.65" x2="21" y2="21" strokeLinecap="round" />
    </svg>

    بحث
  </Link>
)}

</nav>

        {/* auth */}
       {/* left - auth buttons */}
<div className="flex items-center gap-4">

  {!isLoggedIn ? (
    <>
      <Link 
        to="/login" 
        className="text-gray-700 hover:text-green-600"
      >
        تسجيل الدخول
      </Link>

      <Link 
        to="/register"
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        إنشاء حساب +
      </Link>
    </>
  ) : (
    <UserMenu setIsLoggedIn={setIsLoggedIn} />
  )}

</div>

      </div>
    </header>
  );
}