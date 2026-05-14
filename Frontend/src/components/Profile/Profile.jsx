import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCamera,
  FaCalendar
} from "react-icons/fa";
import icon from "../../assets/Icon22.svg";

export default function Profile() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    birth_date: ""
  });

  const [editing, setEditing] = useState(false);

  // =========================
  // ✅ GET PROFILE
  // =========================
  useEffect(() => {
    fetch("http://127.0.0.1:5000/profile/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        setUser({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          birth_date: data.birth_date
            ? data.birth_date.split(" ")[0] // 🔥 fix date format
            : ""
        });
      })
      .catch(err => console.log("ERROR:", err));
  }, []);

  // =========================
  // ✅ UPDATE PROFILE
  // =========================
  const handleUpdate = () => {
    fetch("http://127.0.0.1:5000/profile/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(() => {
        setEditing(false); // 🔥 يرجع زر "تعديل"
      })
      .catch(err => console.log(err));
  };

  return (
    <section className="bg-gray-50 min-h-screen pt-10">
      <div className="container mx-auto  px-6">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-right mb-8">
          الملف الشخصي
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= RIGHT CARD ================= */}
          <div className="bg-white rounded-2xl shadow p-6 text-center">

            {/* AVATAR */}
            <div className="relative w-fit mx-auto mb-4 group">

              <div className="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center text-white text-4xl overflow-hidden">
                <img src={icon} alt="Profile" className="font-bold mb-8 mt-5" />
              </div>

              {/* CAMERA */}
              <label className="absolute bottom-2 left-2 bg-white p-2 rounded-full shadow cursor-pointer opacity-0 group-hover:opacity-100 transition">
                <FaCamera />
                <input type="file" className="hidden" />
              </label>

            </div>

            {/* NAME */}
            <h3 className="text-3xl font-bold text-center my-8">
              {user.name || "اسم المستخدم"}
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              عضو منذ 2024
            </p>

            {/* STATS */}
            <div className="flex justify-around bg-gray-100 rounded-xl mt-6 py-3">

              <div>
                <p className="text-green-600 font-bold text-lg">12</p>
                <span className="text-gray-500 text-sm">طلبات</span>
              </div>

              <div>
                <p className="text-yellow-500 font-bold text-lg">4.8</p>
                <span className="text-gray-500 text-sm">التقييم</span>
              </div>

            </div>
          </div>

          {/* ================= LEFT CARD ================= */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-8">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">

              <h3 className="text-3xl font-bold text-right mb-8">
                المعلومات الشخصية
              </h3>

              <div className="flex gap-2">
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="border px-4 py-1 rounded-lg hover:bg-gray-100"
                  >
                    تعديل
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700"
                    >
                      حفظ
                    </button>

                    <button
                      onClick={() => setEditing(false)}
                      className="border px-4 py-1 rounded-lg"
                    >
                      إلغاء
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* FORM */}
            <div className="grid grid-cols-2 gap-6 text-right">

              <InputField
                label="الاسم الكامل"
                icon={<FaUser />}
                value={user.name}
                disabled={!editing}
                onChange={(e) =>
                  setUser({ ...user, name: e.target.value })
                }
              />

              {/* 🔥 EMAIL (مش editable) */}
              <InputField
                label="البريد الإلكتروني"
                icon={<FaEnvelope />}
                value={user.email}
                disabled
              />

              <InputField
                label="رقم الهاتف"
                icon={<FaPhone />}
                value={user.phone}
                disabled={!editing}
                onChange={(e) =>
                  setUser({ ...user, phone: e.target.value })
                }
              />

              <DateField
                value={user.birth_date}
                disabled={!editing}
                onChange={(e) =>
                  setUser({ ...user, birth_date: e.target.value })
                }
              />
               <div className="col-span-2">
              <InputField
                label="العنوان"
                icon={<FaMapMarkerAlt />}
                value={user.address}
                disabled={!editing}
                onChange={(e) =>
                  setUser({ ...user, address: e.target.value })
                }
              />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

//////////////////////////////
// 🔥 INPUT COMPONENT
//////////////////////////////
function InputField({ label, icon, value, onChange, disabled }) {
  return (
    <div>
      <label className="text-gray-500 text-sm">{label}</label>

      <div className="relative mt-1">
        <input
          type="text"
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          className={`w-full border rounded-lg px-10 py-2 transition
          ${disabled ? "bg-gray-100" : "focus:ring-2 focus:ring-green-500"}`}
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      </div>
    </div>
  );
}

//////////////////////////////
// 🔥 DATE FIELD
//////////////////////////////
function DateField({ value, onChange, disabled }) {
  return (
    <div>
      <label className="text-gray-500 text-sm">تاريخ الميلاد</label>

      <div className="relative mt-1">
        <input
          type="date"
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          className={`w-full border rounded-lg px-10 py-2
          ${disabled ? "bg-gray-100" : "focus:ring-2 focus:ring-green-500"}`}
        />

        <FaCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}