import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";


function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [instantNotif, setInstantNotif] = useState(true);
  const [offersNotif, setOffersNotif] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loaded, setLoaded] = useState(false);

useEffect(() => {
  axios.get("http://localhost:5000/settings", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
  .then(res => {
    setEmailNotif(res.data.email_notifications);
    setSmsNotif(res.data.sms_notifications);
    setInstantNotif(res.data.instant_notifications);
    setOffersNotif(res.data.offers_notifications);
    setLoaded(true); // ✅ مهم
  });
}, []);

useEffect(() => {
  if (!loaded) return;

  axios.put("http://localhost:5000/settings/notifications", {
    email_notifications: emailNotif,
    sms_notifications: smsNotif,
    instant_notifications: instantNotif,
    offers_notifications: offersNotif,
  }, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

}, [emailNotif, smsNotif, instantNotif, offersNotif]);

const [current, setCurrent] = useState("");
const [newPass, setNewPass] = useState("");
const [confirm, setConfirm] = useState("");
const [showDeleteModal, setShowDeleteModal] = useState(false);

const changePassword = () => {
  if (newPass !== confirm) return alert("كلمة المرور غير متطابقة");

  axios.put("http://localhost:5000/settings/password", {
    current_password: current,
    new_password: newPass
  }, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
  .then(() => toast.success("تم التغيير ✅"));
};

  const deleteAccount = () => {

  axios.delete("http://localhost:5000/settings/delete", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
  .then(() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  });
};

  return (
<div className="min-h-screen bg-[#E5E7EB] px-10 py-8" dir="rtl">
      {/* العنوان */}
      <h2 className="text-3xl font-bold mb-8 text-right">
        الإعدادات
      </h2>

      {/* تغيير كلمة المرور */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold mb-6 text-right">
          تغيير كلمة المرور
        </h3>

<div className="space-y-4">

<div className="text-right relative">
   <label className="block mb-2 text-sm text-gray-600"> كلمة المرور الحالية </label>
   <input
     type={showCurrent ? "text" : "password"}
     value={current}
     onChange={(e) => setCurrent(e.target.value)}
     className="w-full p-3 pr-10 pl-10 rounded-lg bg-gray-100 outline-none" />

  <button
    type="button"
    onClick={() => setShowCurrent(!showCurrent)}
    className="absolute left-2 top-[38px] p-1 text-gray-500 hover:text-black"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 10s3-5.5 9-5.5S19 10 19 10s-3 5.5-9 5.5S1 10 1 10z" />
        <circle cx="10" cy="10" r="3" />
      </svg>
  </button>

  <span className="absolute right-3 top-[42px] text-gray-400">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="9" width="14" height="10" rx="2" />
    <path d="M7 9V6a3 3 0 0 1 6 0v3" />
  </svg>
</span>
</div>

<div className="text-right relative">
   <label className="block mb-2 text-sm text-gray-600"> كلمة المرور الجديدة </label>
   <input
    type={showNew ? "text" : "password"}
    value={newPass}
    onChange={(e) => setNewPass(e.target.value)}
    className="w-full p-3 pr-10 pl-10 rounded-lg bg-gray-100 outline-none"
  />

  <button
    type="button"
    onClick={() => setShowNew(!showNew)}
    className="absolute left-2 top-[38px] p-1 text-gray-500 hover:text-black"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 10s3-5.5 9-5.5S19 10 19 10s-3 5.5-9 5.5S1 10 1 10z" />
        <circle cx="10" cy="10" r="3" />
      </svg>
  </button>

  <span className="absolute right-3 top-[42px] text-gray-400">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="9" width="14" height="10" rx="2" />
    <path d="M7 9V6a3 3 0 0 1 6 0v3" />
  </svg>
</span>
</div>
     

<div className="text-right relative">
   <label className="block mb-2 text-sm text-gray-600"> تأكيد كلمة المرور </label>
   <input
  type={showConfirm ? "text" : "password"}
  value={confirm}
  onChange={(e) => setConfirm(e.target.value)}
  className="w-full p-3 pr-10 pl-10 rounded-lg bg-gray-100 outline-none"
/>
  <span className="absolute right-3 top-[42px] text-gray-400">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="9" width="14" height="10" rx="2" />
    <path d="M7 9V6a3 3 0 0 1 6 0v3" />
  </svg>
</span>
</div>
          

      <button
          onClick={changePassword}
          className="w-full bg-green-600 text-white py-3 rounded-lg" >
          تحديث كلمة المرور
      </button>
        </div>
      </div>

      {/* الإشعارات */}
      <div dir="rtl" className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold mb-6 flex flex-row-reverse items-center justify-end gap-2 text-right">
            <span>الإشعارات</span>
          <span className="text-green-600 text-lg">🔔</span>
          
        </h3>

        <div className="space-y-4 text-xl font-bold mb-6 text-right">

          <Toggle label="إشعارات البريد الإلكتروني" state={emailNotif} setState={setEmailNotif} />
          <Toggle label="إشعارات الرسائل النصية" state={smsNotif} setState={setSmsNotif} />
          <Toggle label="الإشعارات الفورية" state={instantNotif} setState={setInstantNotif} />
          <Toggle label="العروض التسويقية" state={offersNotif} setState={setOffersNotif} />

        </div>
      </div>

      {/* منطقة الخطر */}
            {/* منطقة الخطر */}
      <div className="bg-white rounded-2xl p-8 border border-red-300 shadow-sm">
        <h3 className="text-xl font-bold text-red-600 mb-4 text-right">
          منطقة الخطر
        </h3>

        <p className="text-gray-600 mb-6 text-right">
          حذف حسابك سيؤدي إلى فقدان جميع بياناتك وطلباتك بشكل نهائي. هذا الإجراء لا يمكن التراجع عنه.
        </p>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="w-full border border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-50"
        >
          حذف الحساب نهائيًا 🗑️
        </button>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-2xl">

            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🗑️</span>
            </div>

            <h3 className="text-2xl font-bold text-red-600 mb-3">
              حذف الحساب
            </h3>

            <p className="text-gray-600 leading-7 mb-6">
              هل أنت متأكد أنك تريد حذف حسابك؟
              <br />
              لن تتمكن من استرجاع البيانات مرة أخرى.
            </p>

            <div className="flex gap-3">

              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                إلغاء
              </button>

              <button
                onClick={deleteAccount}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
              >
                نعم، حذف الحساب
              </button>

            </div>

          </div>

        </div>
      )}

    </div>


  );
}

export default Settings;



function Toggle({ label, state, setState }) {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-xl flex-row-reverse">
       
      <div
        onClick={() => setState(!state)}
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
          state ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
            state ? "-translate-x-6" : "translate-x-0"
          }`}
        />
      </div> 

      <span className="text-sm text-gray-700">{label}</span>

    </div>
    
  );
}