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
    birth_date: "",
    created_at: ""
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
            ? data.birth_date.split(" ")[0]  
            : "",
            created_at: data.created_at || ""
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
        setEditing(false); 
      })
      .catch(err => console.log(err));
  };

  return (
    <section className="bg-gray-50 min-h-screen pt-10">
  <div className="container mx-auto px-4 md:px-6">

    {/* TITLE */}
    <h2 className="text-2xl md:text-3xl font-bold text-right mb-8">
      الملف الشخصي
    </h2>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* ================= RIGHT CARD ================= */}
      <div className="bg-white rounded-2xl shadow p-5 md:p-6 text-center">

        {/* AVATAR */}
        <div className="relative w-fit mx-auto mb-4 group">

          <div className="w-24 h-24 md:w-32 md:h-32 bg-green-600 rounded-full flex items-center justify-center text-white text-4xl overflow-hidden">
            <img
              src={icon}
              alt="Profile"
              className="w-20 md:w-auto font-bold mb-5 md:mb-8 mt-3 md:mt-5"
            />
          </div>

          {/* CAMERA */}
          <label className="absolute bottom-2 left-2 bg-white p-2 rounded-full shadow cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
            <FaCamera />
            <input type="file" className="hidden" />
          </label>

        </div>

        {/* NAME */}
        <h3 className="text-2xl md:text-3xl font-bold text-center my-6">
          {user.name || "اسم المستخدم"}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          عضو منذ{" "}
          {user.created_at
            ? new Date(user.created_at).getFullYear()
            : ""}
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
      <div className="lg:col-span-2 bg-white rounded-2xl shadow p-5 md:p-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

          <h3 className="text-2xl md:text-3xl font-bold text-right">
            المعلومات الشخصية
          </h3>

          <div className="flex gap-2 flex-wrap">

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="border px-4 py-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto"
              >
                تعديل
              </button>
            ) : (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full sm:w-auto"
                >
                  حفظ
                </button>

                <button
                  onClick={() => setEditing(false)}
                  className="border px-4 py-2 rounded-lg w-full sm:w-auto"
                >
                  إلغاء
                </button>
              </>
            )}

          </div>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">

          {/* fields */}

          <InputField
            label="الاسم الكامل"
            icon={<FaUser />}
            value={user.name}
            disabled={!editing}
            onChange={(e) =>
              setUser({ ...user, name: e.target.value })
            }
          />

          <InputField
            label="البريد الإلكتروني"
            icon={<FaEnvelope />}
            value={user.email}
            disabled={!editing}
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

          <div className="md:col-span-2">
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
          className={`w-full border rounded-lg px-10 py-3 text-sm md:text-base transition
${disabled ? "bg-gray-100" : "focus:ring-2 focus:ring-green-500"}`}
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      </div>
    </div>
  );
}

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