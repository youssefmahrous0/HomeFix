import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  ShoppingCart,
  Star,
  MessageSquare,
  Megaphone,
  LogOut,
  Package,
  Settings
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import icon from "./img/Icon.svg";


export default function AdminSidebar() {

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    window.location.href = "/login";
    
  };

  const menu = [
    {
      title: "لوحة التحكم",
      icon: <LayoutDashboard />,
      path: "/admin/dashboard",
    },
    {
      title: "المستخدمين",
      icon: <Users />,
      path: "/admin/users",
    },
    {
      title: "مقدمو الخدمات",
      icon: <BriefcaseBusiness />,
      path: "/admin/providers",
    },
    {
      title: "الخدمات",
      icon: <Package />,
      path: "/admin/services",
    },
    {
      title: "الطلبات",
      icon: <ShoppingCart />,
      path: "/admin/orders",
    },
    {
      title: "التقييمات",
      icon: <Star />,
      path: "/admin/reviews",
    },
    {
      title: "الشكاوى",
      icon: <MessageSquare />,
      path: "/admin/complaints",
    },
    {
      title: "الإعلانات",
      icon: <Megaphone />,
      path: "/admin/ads",
    },
    {
      title: "الإعدادات",
      icon: <Settings />,
      path: "/admin/settings",
    }
  ];

  

  return (
    <div className="w-[280px] self-start bg-green-600 text-white p-6 rounded-bl-[30px] min-h-screen">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">

        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
          <img src={icon} alt="icon" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            HomeFix
          </h1>

          <p className="text-sm text-green-100">
            لوحة التحكم
          </p>
        </div>

      </div>

      <div className="w-full h-px bg-white/20 my-4"></div>
      

      {/* Menu */}
      <div className="space-y-3">

        {menu.map((item) => {

          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                w-full py-4 px-5 flex items-center gap-3 rounded-xl transition font-bold
                ${
                  active
                    ? "bg-white text-green-600"
                    : "hover:bg-white/10 text-white"
                }
              `}
            >
              {item.icon}

              <span>{item.title}</span>
            </Link>
          );
        })}

      </div>

      <div className="w-full h-px bg-white/20 my-4"></div>

      {/* Admin */}
      <div className="mt-10 bg-white/10 rounded-xl p-5">

        <p className="text-green-100 mb-2">
          مرحباً،
        </p>

        <h2 className="font-bold text-xl">
          المدير العام
        </h2>

      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full mt-5 bg-green-500 hover:bg-green-400 transition rounded-xl py-4 flex items-center justify-center gap-3 font-bold"
      >
        <LogOut />

        تسجيل الخروج
      </button>

    </div>
  );
}