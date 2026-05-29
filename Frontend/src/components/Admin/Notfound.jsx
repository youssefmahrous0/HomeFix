import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {

  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4"
    >
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8 sm:p-12 text-center">

        {/* Icon */}
        <div className="w-28 h-28 mx-auto rounded-full bg-green-600 flex items-center justify-center mb-8">
          <AlertCircle size={55} className="text-white" />
        </div>

        {/* 404 */}
        <h1 className="text-7xl sm:text-8xl font-black text-gray-900">
          404
        </h1>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-5">
          الصفحة غير موجودة
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-lg mt-5 leading-8">
          عذرًا، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع آخر.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

          <Link
            to="/admin/dashboard"
            className="bg-green-600 hover:bg-green-700 transition text-white px-8 py-4 rounded-xl flex items-center gap-2 font-semibold"
          >
            <Home size={20} />
            العودة للوحة التحكم
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="border border-gray-300 hover:bg-gray-100 transition px-8 py-4 rounded-xl font-semibold"
          >
            الرجوع للخلف
          </button>

        </div>
      </div>
    </div>
  );
}