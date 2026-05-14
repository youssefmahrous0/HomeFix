import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import profile from "../../assets/Icon13.svg";
import profile1 from "../../assets/Icon14.svg";
import order from "../../assets/Icon15.svg";
import settings from "../../assets/Icon16.svg";
import payments from "../../assets/Icon17.svg";
import favorites from "../../assets/Icon18.svg";
import addresses from "../../assets/Icon19.svg";
import notifications from "../../assets/Icon20.svg";
import exit from "../../assets/Icon21.svg";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="relative" ref={ref}>
      
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-600 text-white px-5 py-2 rounded-xl flex items-center gap-2"
      >
        <img src={profile} alt="Profile" className="w-6 h-6" />
        حسابي
      </button>

      {open && (
        <div className="absolute left-0 mt-3 w-56 bg-white rounded-xl shadow-md border border-gray-100 py-2 z-50">

          <Item text="الملف الشخصي" icon={<img src={profile1} alt="Profile" className="w-6 h-6" />} to="/profile" />
          <Item text="الطلبات" icon={<img src={order} alt="Order" className="w-6 h-6" />} to="/my-orders" />
          <Item text="الإعدادات" icon={<img src={settings} alt="Settings" className="w-6 h-6" />} to="/settings" />
          <Item text=" الدفعات" icon={<img src={payments} alt="Payments" className="w-6 h-6" />} to="/payment-methods" />

          <Item text="المفضلة" icon={<img src={favorites} alt="Favorites" className="w-6 h-6" />} to="/favorites"  />
          <Item text="العناوين" icon={<img src={addresses} alt="Addresses" className="w-6 h-6" />} to="/addresses" />
          <Item text="الإشعارات" icon={<img src={notifications} alt="Notifications" className="w-6 h-6" />} to="/notifications" />

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-right"
          >
            <img src={exit} alt="Exit" className="w-6 h-6" />
            تسجيل الخروج
          </button>

        </div>
      )}
    </div>
  );
}

function Item({ text, icon, to }) {
  return (
    <Link
      to={to}
      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-right"
    >
      <span>{icon}</span>
      {text}
    </Link>
  );
}