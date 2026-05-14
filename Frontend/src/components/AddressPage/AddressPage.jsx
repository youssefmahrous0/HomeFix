import React, { useEffect, useState } from "react";
import { FiHome, FiBriefcase, FiMapPin } from "react-icons/fi";
import iconDelete from "../../assets/Icon23.svg";
import iconEdit from "../../assets/Icon24.svg";

export default function AddressPage() {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    governorate: "",
    area: "",
    street: "",
    building_number: "",
    floor: "",
    apartment_number: "",
    address_type: "home",
  });

  // ================= GET =================
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:5000/addresses", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setAddresses(data.data || []));
  }, []);

  // ================= HANDLE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      full_name: "",
      phone: "",
      governorate: "",
      area: "",
      street: "",
      building_number: "",
      floor: "",
      apartment_number: "",
      address_type: "home",
    });
    setEditId(null);
  };

  // ================= ADD + UPDATE =================
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const url = editId
      ? `http://127.0.0.1:5000/addresses/${editId}`
      : "http://127.0.0.1:5000/addresses";

    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (editId) {
      setAddresses(addresses.map((a) => (a.id === editId ? data.data : a)));
    } else {
      setAddresses([...addresses, data.data]);
    }

    resetForm();
    setShowForm(false);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`http://127.0.0.1:5000/addresses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    setAddresses(addresses.filter((a) => a.id !== id));
  };

  // ================= EDIT =================
  const handleEdit = (a) => {
    setForm({
      full_name: a.full_name,
      phone: a.phone,
      governorate: a.governorate,
      area: a.area,
      street: a.street,
      building_number: a.building_number,
      floor: a.floor,
      apartment_number: a.apartment_number,
      address_type: a.address_type,
    });

    setEditId(a.id);
    setShowForm(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-10 text-right">

        {/* title */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">العناوين</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            + إضافة عنوان جديد
          </button>
        </div>

        {/* ================= FORM ================= */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl border-2 border-green-500">

            <h2 className="text-xl font-bold mb-4">
              {editId ? "تعديل العنوان" : "عنوان جديد"}
            </h2>

            {/* type */}
            <div className="mb-6">
              <span className="text-gray-600">نوع العنوان</span>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => setForm({ ...form, address_type: "home" })}
                  className={`px-5 py-2 rounded-xl border flex items-center gap-2 ${
                    form.address_type === "home"
                      ? "bg-green-100 text-green-600 border-green-500"
                      : ""
                  }`}
                >
                  <FiHome /> المنزل
                </button>

                <button
                  onClick={() => setForm({ ...form, address_type: "work" })}
                  className={`px-5 py-2 rounded-xl border flex items-center gap-2 ${
                    form.address_type === "work"
                      ? "bg-green-100 text-green-600 border-green-500"
                      : ""
                  }`}
                >
                  <FiBriefcase /> العمل
                </button>

                <button
                  onClick={() => setForm({ ...form, address_type: "other" })}
                  className={`px-5 py-2 rounded-xl border flex items-center gap-2 ${
                    form.address_type === "other"
                      ? "bg-green-100 text-green-600 border-green-500"
                      : ""
                  }`}
                >
                  <FiMapPin /> آخر
                </button>
              </div>
            </div>

            {/* inputs */}
            <div className="grid grid-cols-2 gap-4">
              <input name="full_name" placeholder="الاسم الكامل" onChange={handleChange} value={form.full_name} className="p-3 bg-gray-100 rounded-lg"/>
              <input name="phone" placeholder="رقم الهاتف" onChange={handleChange} value={form.phone} className="p-3 bg-gray-100 rounded-lg"/>
              <input name="governorate" placeholder="المحافظة" onChange={handleChange} value={form.governorate} className="p-3 bg-gray-100 rounded-lg"/>
              <input name="area" placeholder="المنطقة" onChange={handleChange} value={form.area} className="p-3 bg-gray-100 rounded-lg"/>
              <input name="street" placeholder="الشارع" onChange={handleChange} value={form.street} className="p-3 bg-gray-100 rounded-lg col-span-2"/>
              <input name="building_number" placeholder="رقم العمارة" onChange={handleChange} value={form.building_number} className="p-3 bg-gray-100 rounded-lg"/>
              <input name="floor" placeholder="الدور" onChange={handleChange} value={form.floor} className="p-3 bg-gray-100 rounded-lg"/>
              <input name="apartment_number" placeholder="الشقة" onChange={handleChange} value={form.apartment_number} className="p-3 bg-gray-100 rounded-lg col-span-2"/>
            </div>

            {/* buttons */}
            <div className="flex gap-3 mt-6">
              <button onClick={handleSubmit} className="flex-1 bg-green-600 text-white py-3 rounded-lg">
                حفظ العنوان
              </button>

              <button
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="flex-1 border py-3 rounded-lg"
              >
                إلغاء
              </button>
            </div>
          </div>
        )}

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          {addresses.map((a) => (
            <div key={a.id} className="bg-white p-6 rounded-2xl shadow-sm text-right">

              {/* header */}
              <div className="flex justify-between mb-4">

                {/* left */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100">
                    {a.address_type === "home" && "🏠"}
                    {a.address_type === "work" && "💼"}
                    {a.address_type === "other" && "📍"}
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      {a.address_type === "home"
                        ? "المنزل"
                        : a.address_type === "work"
                        ? "العمل"
                        : "آخر"}
                    </h3>
                    <p className="text-gray-600 text-sm">{a.full_name}</p>
                  </div>
                </div>

                {/* default */}
                <div>
                  {a.is_default ? (
                    <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                      افتراضي
                    </span>
                  ) : (
                    <button className="text-xs border px-3 py-1 rounded-full">
                      جعله افتراضي
                    </button>
                  )}
                </div>
              </div>

              {/* data */}
              <p className="mt-2">{a.phone}</p>

              <p className="text-gray-500 text-sm mt-2">
                شارع {a.street}، {a.area}، {a.governorate}
                <br />
                عمارة {a.building_number}، الدور {a.floor}، شقة {a.apartment_number}
              </p>

              <hr className="my-5" />

              {/* actions */}
              <div className="flex justify-end gap-3">
                <button onClick={() => handleDelete(a.id)} className="w-10 h-10 border border-red-400 rounded-lg flex items-center justify-center">
                  <img src={iconDelete} />
                </button>

                <button onClick={() => handleEdit(a)} className="border px-4 py-2 rounded-lg flex items-center gap-2">
                  <img src={iconEdit} />
                  تعديل
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}