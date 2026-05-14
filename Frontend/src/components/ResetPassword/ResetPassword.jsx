import { useState } from "react";
import logo from "../../assets/footer.png";
import key from "../../assets/Icon10.png";
import shield from "../../assets/Vector.png";
import warn from "../../assets/warn.png";
import check from "../../assets/Icon11.png";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";


export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const handleSubmit = async () => {
  if (password !== confirm) {
    alert("كلمتا المرور غير متطابقتين");
    return;
  }

  try {
    await axios.post(
      "http://localhost:5000/api/auth/reset-password",
      {
        token,
        password
      }
    );


    toast.success(" تم تغيير كلمة المرور بنجاح ✅", {
      position: "top-center",
      style: {
       top: "50%",
      transform: "translateY(-50%)",
      textAlign: "center",
  },
});
    navigate("/login");

  } catch (err) {
    alert("الرابط غير صالح أو انتهت صلاحيته");
  }
};

useEffect(() => {
  const emailFromUrl = params.get("email");
  if (emailFromUrl) {
    setEmail(emailFromUrl);
  }
}, [params]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16" dir="rtl">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* RIGHT CARD */}
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mr-auto">

          {/* logo */}
          <div className="text-center mb-6">
            <img src={logo} className="w-16 h-16 mx-auto mb-4" />

            <h2 className="text-2xl font-semibold mb-1">
              إنشاء كلمة مرور جديدة
            </h2>

            <p className="text-gray-500 text-sm">
              اختر كلمة مرور قوية وآمنة لحسابك
            </p>
          </div>

          {/* email */}
          <div className="bg-gray-100 rounded-lg p-3 mb-5 text-sm text-gray-600 flex justify-between items-center">
  <span>إعادة تعيين كلمة المرور:</span>
  <span className="font-medium">{email}</span>
</div>

          {/* password */}
          <label className="text-sm mb-2 block">كلمة المرور الجديدة</label>
          <div className="relative mb-4">
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full border rounded-lg py-3 px-4"
            />
          </div>

          {/* rules */}
          <div className="bg-gray-50 rounded-xl p-4 mb-5 text-sm">
            <h4 className="mb-2 font-medium">متطلبات كلمة المرور:</h4>

            <ul className="space-y-2 text-gray-500">
              <li>على الأقل 8 أحرف</li>
              <li>حروف كبير وصغير</li>
              <li>رقم واحد على الأقل</li>
              <li>حرف خاص (! @ # $)</li>
            </ul>
          </div>

          {/* confirm */}
          <label className="text-sm mb-2 block">تأكيد كلمة المرور</label>
          <input
            type="password"
            value={confirm}
            onChange={(e)=>setConfirm(e.target.value)}
            className="w-full border rounded-lg py-3 px-4 mb-6"
          />

          {/* button */}
          <button onClick={handleSubmit} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
            تغيير كلمة المرور
          </button>

          {/* info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-gray-600 mt-4">
            بعد تغيير كلمة المرور سيتم تسجيل خروجك من جميع الأجهزة الأخرى لحماية حسابك
          </div>

        </div>

        {/* LEFT */}
        <div>

          <h1 className="text-4xl font-bold leading-relaxed mb-4">
            احم حسابك
            <br/>
            <span className="text-green-600">بكلمة مرور قوية</span>
          </h1>

          <p className="text-gray-500 mb-10">
            اختر كلمة مرور قوية لحماية معلوماتك الشخصية
          </p>

          <div className="space-y-6">

            {/* item */}
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <img src={key} className="w-5 h-5 invert"/>
              </div>
              <div>
                <h4 className="font-semibold">كلمة مرور قوية</h4>
                <p className="text-sm text-gray-500">
                  استخدم مزيجاً من الأحرف والأرقام والرموز
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <img src={shield} className="w-5 h-5 invert"/>
              </div>
              <div>
                <h4 className="font-semibold">أمان محسن</h4>
                <p className="text-sm text-gray-500">
                  تشفير متقدم لحماية كلمة مرورك
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                <img src={warn} className="w-5 h-5 invert"/>
              </div>
              <div>
                <h4 className="font-semibold">لا تشارك كلمة المرور</h4>
                <p className="text-sm text-gray-500">
                  احتفظ بكلمة مرورك سرية
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <img src={check} className="w-5 h-5 invert"/>
              </div>
              <div>
                <h4 className="font-semibold">تحديث منتظم</h4>
                <p className="text-sm text-gray-500">
                  قم بتحديث كلمة المرور بشكل دوري
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}