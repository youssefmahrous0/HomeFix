import React, { useState, useEffect } from "react";
import logo from "../../assets/footer.png";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";

export default function Navbar() {

  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      
      <div className="container mx-auto px-6 py-4 flex items-center justify-between md:flex-row flex-row-reverse">
         
{/* mobile controls */}
<div className="flex items-center gap-2 md:hidden">

  {/* user menu */}
  {isLoggedIn && (
    <UserMenu setIsLoggedIn={setIsLoggedIn} />
  )}

  {/* menu button */}
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="text-3xl text-gray-700"
  >
    {menuOpen ? "×" : "☰"}
  </button>

</div>
        
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

       {/* left - auth buttons */}
<div className="hidden md:flex items-center gap-4">

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
{/* mobile menu */}
{menuOpen && (
  <div
    className="
      w-full
      bg-white
      md:hidden
      border-t border-gray-200
    "
  >

    {/* links */}
    <div className="flex flex-col text-right p-5 gap-6 text-lg">

      <Link to="/">الرئيسية</Link>
      <Link to="/about">من نحن</Link>
      <Link to="/ServicesPage">الخدمات</Link>
      <Link to="/ServicesProviderPage">مقدمو الخدمات</Link>
      <Link to="/contact">تواصل معنا</Link>

    </div>

    {/* auth */}
    {/* auth */}
<div className="p-4 border-t border-gray-200">

  {!isLoggedIn ? (

    <div className="flex flex-col gap-3">

      <Link
        to="/login"
        className="border border-gray-300 py-3 rounded-lg text-center"
      >
        تسجيل الدخول
      </Link>

      <Link
        to="/register"
        className="bg-green-600 text-white py-3 rounded-lg text-center"
      >
        إنشاء حساب +
      </Link>

    </div>

  ) : (

    <UserMenu setIsLoggedIn={setIsLoggedIn} />

  )}

</div>
  </div>
)}

    </header>
  );
}