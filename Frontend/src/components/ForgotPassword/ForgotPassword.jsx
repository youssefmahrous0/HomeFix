import { Link } from "react-router-dom";
import React, { useState } from "react";
import { forgotPassword } from "../../api/auth";
import logo from "../../assets/footer.png";
import vector from "../../assets/vector.png";
import vector1 from "../../assets/vector1.png";
import icon from "../../assets/Icon9.png";
import icon1 from "../../assets/Icon10.png";
import icon2 from "../../assets/Icon11.png";
import icon3 from "../../assets/Icon12.png";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("clicked"); // مهم

  try {
    await forgotPassword({ email });
    navigate("/reset-sent", { state: { email } });
  } catch (err) {
    console.log(err);
    alert("حدث خطأ");
  }
};

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-16" dir="rtl">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 bg-[#F9FAFB] items-center">

        {/* RIGHT */}
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mr-auto">

          <Link
            to="/login"
            className="flex items-center gap-2 text-gray-500 text-sm mb-6"
          >
            العودة إلى تسجيل الدخول
            <span>›</span>
          </Link>

          <div className="text-center mb-6">
            <div className="w-16 h-16  rounded-full mx-auto flex items-center justify-center text-white text-2xl mb-4">
              <img width="64" height="64" src={logo} alt="logo" />
            </div>

            <h2 className="text-2xl font-semibold mb-2">
              نسيت كلمة المرور؟
            </h2>

            <p className="text-gray-500 text-sm">
              لا تقلق، سنساعدك في استعادة حسابك
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 text-sm text-gray-600 p-4 rounded-xl mb-6">
            أدخل بريدك الإلكتروني المسجل وسنرسل لك رابط لإعادة تعيين كلمة المرور
          </div>

          <label className="block text-sm mb-2">
            البريد الإلكتروني
          </label>

          <div className="relative mb-2">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 pr-10" />

            <span className="absolute right-3 top-3 text-gray-400">
              ✉
            </span>
          </div>

          <p className="text-xs text-gray-400 mb-5">
            تأكد من إدخال البريد الإلكتروني المرتبط بحسابك
          </p>

          <button
           type="button"
           onClick={handleSubmit}
            className="block w-full text-center bg-green-600 text-white py-3 rounded-lg" >
           إرسال رابط الاستعادة
          </button>

          <div className="text-center mt-6 text-sm text-gray-500">
            هل تواجه مشكلة في الوصول إلى حسابك؟
            <span className="text-green-600 mr-2 cursor-pointer">
              تواصل مع الدعم الفني
            </span>
          </div>

        </div>

        {/* LEFT */}
        <div>
          <h1 className="text-4xl font-bold leading-relaxed mb-4">
            استعد السيطرة على
            <br />
            <span className="text-green-600">حسابك بسهولة</span>
          </h1>

          <p className="text-gray-500 mb-10">
            عملية بسيطة وآمنة لاستعادة الوصول إلى حسابك
          </p>

          <div className="space-y-6">

            {/* item */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00A63E] rounded-xl flex items-center justify-center">
                <img src={vector} alt="vector" className="w-5 h-5 brightness-0 invert" />
              </div>
              <div>
                <h4 className="font-semibold">آمن تماماً</h4>
                <p className="text-sm text-gray-500">
                  نستخدم أعلى معايير الأمان لحماية بياناتك
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#4CAF50] rounded-xl flex items-center justify-center">
                <img src={icon} alt="icon" className="w-6 h-6 brightness-0 invert" />
              </div>
              <div>
                <h4 className="font-semibold">سريع وسهل</h4>
                <p className="text-sm text-gray-500">
                  استعد حسابك في دقائق معدودة فقط
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FBC02D] text-yellow-500 rounded-xl flex items-center justify-center">
                <img src={icon1} alt="icon1" className="w-6 h-6 brightness-0 invert" />
              </div>
              <div>
                <h4 className="font-semibold">رابط فريد</h4>
                <p className="text-sm text-gray-500">
                  رابط آمن يستخدم مرة واحدة فقط لحمايتك
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#E53935] text-red-500 rounded-xl flex items-center justify-center">
                <img src={icon2} alt="icon2" className="w-6 h-6 brightness-0 invert" />
              </div>
              <div>
                <h4 className="font-semibold">دعم فوري</h4>
                <p className="text-sm text-gray-500">
                  فريقنا جاهز لمساعدتك في أي وقت
                </p>
              </div>
            </div>

          </div>

          {/* security card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg mt-10">
         <div className="flex items-center gap-2 mb-3">
         <div className="w-8 h-8 bg-[#F0FDF4] rounded-lg flex items-center justify-center">
              <img src={vector1} alt="icon3" className="w-4 h-4" />
         </div>
             <h4 className="font-semibold">الأمان أولويتنا</h4>
         </div>

            <ul className="text-sm text-gray-500 space-y-2 text-right">
              <li className="flex items-center justify-end gap-2 flex-row-reverse">
                 تشفير من الطراز العسكري
                 <img src={icon3} alt="icon3" className="w-4 h-4" />
              </li>

              <li className="flex items-center justify-end gap-2 flex-row-reverse">
                  مصادقة ثنائية متاحة
                  <img src={icon3} alt="icon3" className="w-4 h-4" />
              </li>

              <li className="flex items-center justify-end gap-2 flex-row-reverse">
                 مراقبة مستمرة للحساب
                 <img src={icon3} alt="icon3" className="w-4 h-4" />
             </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}