import { useState } from "react";
import { Link, useNavigate , useLocation } from "react-router-dom";
import check from "../../assets/check.png"; 
import mail from "../../assets/email.png";  
import clock from "../../assets/clock.png";
import { forgotPassword } from "../../api/auth";

export default function ResetLinkSent() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleResend = async () => {
  setLoading(true);
  setSent(false);

  try {
    await forgotPassword({ email });
    setSent(true);
  } catch (err) {
    alert("فشل إعادة الإرسال");
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col" dir="rtl">
      
      {/* CONTENT */}
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center">

          {/* icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <img src={check} className="w-10 h-10" />
          </div>

          {/* title */}
          <h2 className="text-2xl font-semibold mb-3">
            تم إرسال رابط الاستعادة!
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني
          </p>

          {/* email */}
          <div className="bg-gray-100 rounded-lg py-3 px-4 flex items-center justify-center gap-2 mb-8">
             <img src={mail} className="w-4 h-4" />
            <div>{email}</div>
          </div>

          {/* steps */}
          <div className="space-y-4 text-right">

  <div className="flex items-start justify-between">
    <span className="w-7 h-7 bg-green-600 text-white text-sm rounded-full flex items-center justify-center">
      1
    </span>
    <p className="text-gray-600">
      افتح بريدك الإلكتروني وابحث عن رسالة من HomeFix
    </p>
  </div>

  <div className="flex items-start gap-3 ">
    <span className="w-7 h-7 bg-green-600 text-white text-sm rounded-full flex items-center justify-center">
      2
    </span>
    <p className="text-gray-600">
      انقر على رابط إعادة تعيين كلمة المرور
    </p>
  </div>

  <div className="flex items-start gap-2 mb-6">
  <span className="w-7 h-7 bg-green-600 text-white text-sm rounded-full flex items-center justify-center">
    3
  </span>
  <p className="text-gray-600">
    أدخل كلمة المرور الجديدة وأكدها
  </p>
</div>

</div>

          {/* info box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-gray-600 mb-6 flex items-center gap-2">
            <img src={clock} className="w-4 h-4" />
            الرابط صالح لمدة 24 ساعة فقط. إذا لم تستلم الرسالة، تحقق من مجلد الرسائل غير المرغوب فيها.
          </div>

          {/* buttons */}
          <button
            onClick={handleResend}
            disabled={loading}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg mb-3 hover:bg-gray-50 transition disabled:opacity-50"
>
  {loading ? "جاري الإرسال..." : "إعادة إرسال الرابط"}
</button>

{sent && (
  <p className="text-green-600 text-sm text-center mb-3">
    تم إعادة إرسال الرابط بنجاح
  </p>
)}

          <Link
            to="/login"
            className="block w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            العودة إلى تسجيل الدخول
          </Link>

        </div>
      </div>

      {/* footer */}
    </div>
  );
}