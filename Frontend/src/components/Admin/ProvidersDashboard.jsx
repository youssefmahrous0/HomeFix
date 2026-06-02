import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

import {
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Star,
  UserPlus,
  X,
} from "lucide-react";

export default function ProvidersDashboard() {

  const [providers, setProviders] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("الكل");

  const [openMenu, setOpenMenu] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [detailsModal, setDetailsModal] = useState(false);

  const [providerDetails, setProviderDetails] = useState(null);
  const [editModal, setEditModal] = useState(false);

  const [selectedProvider, setSelectedProvider] =
  useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    job: "",
    status: "نشط",
  });

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {

    try {

      const res = await axios.get(
        "https://homefix-production-0bc9.up.railway.app/admin/providers"
      );

      setProviders(res.data.providers || []);

    } catch (err) {
      console.log(err);
    }
  };

  const handleShowDetails = async (id) => {

    try {

      const res = await axios.get(
        `https://homefix-production-0bc9.up.railway.app/admin/providers/${id}`
      );

      setProviderDetails(res.data.provider);


      setDetailsModal(true);

    } catch (err) {
      console.log(err);
    }
  };

  const handleAddProvider = async () => {

    try {

      await axios.post(
        "https://homefix-production-0bc9.up.railway.app/admin/providers",
        formData
      );

      setShowModal(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        job: "",
        status: "نشط",
      });

      fetchProviders();

    } catch (err) {
      console.log(err);
    }
  };
   
  const handleVerifyProvider = async (id) => {

  try {

    await axios.put(
      `https://homefix-production-0bc9.up.railway.app/admin/providers/${id}/verify`
    );

    fetchProviders();

  } catch (err) {
    console.log(err);
  }
};

  const handleStatusChange = async (id, status) => {

  try {

    await axios.put(
      `https://homefix-production-0bc9.up.railway.app/admin/providers/${id}/status`,
      { status }
    );

    fetchProviders();

  } catch (err) {
    console.log(err);
  }
};

  const filteredProviders = providers.filter((provider) => {

    const matchesSearch =

  (provider.name || "")
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  (provider.email || "")
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  (provider.phone || "")
    .toLowerCase()
    .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "الكل"
        ? true
        : provider.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const today = new Date().toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleEditProvider = (provider) => {

  setSelectedProvider({
    id: provider.id,
    name: provider.name,
    email: provider.email,
    phone: provider.phone,
    address: provider.address,
    rating: provider.rating,
    job: provider.job,
    status: provider.status,
  });

  setEditModal(true);
};
const handleUpdateProvider = async () => {

  try {

    await axios.put(
      `https://homefix-production-0bc9.up.railway.app/admin/providers/${selectedProvider.id}`,
      selectedProvider
    );

    setEditModal(false);

    fetchProviders();

  } catch (err) {
    console.log(err);
  }
};
const [statusModal, setStatusModal] = useState(false);
const [providerToUpdate, setProviderToUpdate] = useState(null);
const confirmStatusChange = async () => {

  if (!providerToUpdate) return;

  await handleStatusChange(
    providerToUpdate.id,
    providerToUpdate.status === "نشط"
      ? "موقوف"
      : "نشط"
  );

  setStatusModal(false);

  setProviderToUpdate(null);

};

  return (

    <div className="min-h-screen bg-[#f5f5f5] flex">

      <AdminSidebar />

      <div className="flex-1">

        {/* Date */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">

          <p className="text-gray-500 text-lg font-medium text-right">
            {today}
          </p>

        </div>

        <div className="p-8">

          {/* Header */}
          <div className="flex items-start justify-between mb-10">

            <div className="text-right">

              <h1 className="text-5xl font-black text-gray-900 mb-2">
                إدارة مقدمي الخدمات
              </h1>

              <p className="text-gray-500 text-xl">
                إدارة حسابات مقدمي الخدمات والموافقة على الطلبات
              </p>

            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-4 rounded-2xl flex items-center gap-3"
            >
              <UserPlus size={20} />

              إضافة مقدم خدمة جديد
            </button>

          </div>

          {/* Filters */}
          <div className="bg-white rounded-[28px] p-5 shadow-sm border border-gray-100 mb-8">

            <div className="flex items-center gap-4">

              {/* Search */}
              <div className="flex-1 relative">

                <Search
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                  size={22}
                />

                <input
                  type="text"
                  placeholder="البحث بالاسم، البريد الإلكتروني أو رقم الهاتف..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                    w-full
                    h-[58px]
                    bg-[#f5f5f5]
                    rounded-2xl
                    pr-14
                    pl-5
                    text-right
                    outline-none
                  "
                />

              </div>

              {/* Filter */}
              <div className="relative">

                <Filter
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="
                    appearance-none
                    bg-[#f5f5f5]
                    h-[58px]
                    rounded-2xl
                    pr-12
                    pl-10
                    outline-none
                    min-w-[160px]
                  "
                >
                  <option value="الكل">
                    جميع الحالات
                  </option>

                  <option value="نشط">
                    نشط
                  </option>

                  <option value="موقوف">
                    معلق
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* Providers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredProviders.map((provider) => (

              <div
                key={provider.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
              >

                {/* Top */}
                <div className="flex items-start justify-between flex-row-reverse mb-6">

                  {/* Menu */}
<div className="relative">

  <button
    onClick={() =>
      setOpenMenu(
        openMenu === provider.id
          ? null
          : provider.id
      )
    }
    className="p-1"
  >
    <MoreVertical size={22} />
  </button>

  {openMenu === provider.id && (

    <div
      className="
        absolute right-0 top-10
        w-52
        bg-white
        rounded-[22px]
        shadow-2xl
        border border-gray-100
        overflow-hidden
        z-50
      "
    >

      {/* DETAILS */}
      <button
        onClick={() => {
          handleShowDetails(provider.id);
          setOpenMenu(null);
        }}
        className="
          w-full
          text-right
          px-6
          py-4
          text-[18px]
          font-medium
          text-gray-800
          hover:bg-gray-50
          transition
        "
      >
        عرض التفاصيل
      </button>

      {/* EDIT */}
      <button
        onClick={() => {
          handleEditProvider(provider);
          setOpenMenu(null);
        }}
        className="
          w-full
          text-right
          px-6
          py-4
          text-[18px]
          font-medium
          text-gray-800
          hover:bg-gray-50
          transition
        "
      >
        تعديل البيانات
      </button>

      {/* VERIFY */}
      <button
        onClick={() => {
          handleVerifyProvider(provider.id);
          setOpenMenu(null);
        }}
        className="
          w-full
          text-right
          px-6
          py-4
          text-[18px]
          font-medium
          text-gray-800
          hover:bg-green-50
          transition
        "
      >
        {provider.is_verified
          ? "إلغاء التوثيق"
          : "توثيق الحساب"}
      </button>

      {/* DISABLE */}
      <button
  onClick={() => {

    setProviderToUpdate(provider);

    setStatusModal(true);

    setOpenMenu(null);

  }}
  className="
    w-full
    text-right
    px-6
    py-4
    text-[20px]
    font-bold
    text-red-500
    hover:bg-red-50
    transition
  "
>
  {provider.status === "نشط"
    ? "تعطيل الحساب"
    : "تفعيل الحساب"}
</button>

    </div>

  )}

</div>

                  {/* User */}
                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold">
                      {provider.name?.charAt(0)}
                    </div>

                    <div>

                      <div className="flex items-center gap-2 mb-2">

                        <h3 className="font-bold text-2xl">
                          {provider.name}
                        </h3>

                        {
    provider.is_verified && (
      <span
        className="
          bg-blue-100
          text-blue-600
          text-xs
          px-2
          py-1
          rounded-full
          font-medium
        "
      >
        موثق
      </span>
    )
  }

                      </div>

                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs font-bold
                          ${
                            provider.status === "نشط"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        `}
                      >
                        {provider.status}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Job */}
                <div className="bg-green-50 text-green-600 rounded-xl py-3 text-center font-bold mb-5">

                  {provider.job}

                </div>

                {/* Info */}
                <div className="space-y-4 text-gray-500">

                  <div className="flex items-center justify-start gap-2">

                    <Mail size={18} />

                    <span>{provider.email}</span>

                  </div>

                  <div className="flex items-center justify-start gap-2">

                    <Phone size={18} />

                    <span>{provider.phone}</span>

                  </div>

                  <div className="flex items-center justify-start gap-2">

                    <MapPin size={18} />

                    <span>{provider.address}</span>

                  </div>

                  <div className="flex items-center justify-start gap-2">
                     
                      <Star
                      size={18}
                      className="text-yellow-500 fill-yellow-500"
                    />

                    <span className="font-bold text-black">
                      {provider.rating}
                    </span>

                    <span>
                      ({provider.reviews} تقييم)
                    </span>

                   
                  </div>

                </div>

                {/* Footer */}
                <div className="border-t mt-6 pt-5 flex items-center justify-between">

                  <div className="text-center">

                    <p className="text-gray-400 mb-1">
                      الأعمال
                    </p>

                    <h4 className="text-4xl font-black text-gray-800">
                      {provider.orders}
                    </h4>

                  </div>

                  <div className="text-center">

                    <p className="text-gray-400 mb-1">
                      الأرباح
                    </p>

                    <h4 className="text-4xl font-black text-green-600">
                      {provider.earnings?.toLocaleString()} ج.م
                    </h4>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Add Modal */}
      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-[500px] rounded-[24px] p-6 relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute left-5 top-5"
            >
              <X size={22} />
            </button>

            <div className="text-right mb-6">

              <h2 className="text-3xl font-black mb-2">
                إضافة مقدم خدمة جديد
              </h2>

              <p className="text-gray-500">
                قم بإدخال بيانات مقدم الخدمة
              </p>

            </div>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="الاسم الكامل"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full h-[54px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
              />

              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full h-[54px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
              />

              <input
                type="text"
                placeholder="رقم الهاتف"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="w-full h-[54px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
              />

              <input
                type="text"
                placeholder="الموقع"
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                className="w-full h-[54px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
              />

              <select
                value={formData.job}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    job: e.target.value,
                  })
                }
                className="w-full h-[54px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
              >
                <option value="">
                  اختر التخصص
                </option>

                <option>كهرباء</option>
                <option>سباكة</option>
                <option>تكييف</option>
                <option>دهان</option>
                <option>تنظيف</option>
                <option>نجارة</option>
                <option>صيانة</option>
                <option>ألوميتال</option>

              </select>

            </div>

            <div className="flex items-center gap-3 mt-6">

              <button
                onClick={handleAddProvider}
                className="bg-green-600 text-white px-6 h-[48px] rounded-xl font-bold"
              >
                حفظ
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="border px-6 h-[48px] rounded-xl"
              >
                إلغاء
              </button>

            </div>

          </div>

        </div>

      )}

      {/* Details Modal */}
      {detailsModal && providerDetails && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-[520px] rounded-[24px] p-6 relative">

            <button
              onClick={() => setDetailsModal(false)}
              className="absolute left-5 top-5"
            >
              <X size={22} />
            </button>

            <div className="flex items-center gap-4 mb-8">

              <div className="w-20 h-20 rounded-full bg-green-600 text-white flex items-center justify-center text-4xl font-bold">
                {providerDetails.name?.charAt(0)}
              </div>

              <div>

                <h2 className="text-3xl font-black mb-2">
                  {providerDetails.name}
                </h2>

                <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold">
                  {providerDetails.status}
                </span>

              </div>

            </div>

            <div className="space-y-5 text-gray-700">

              <div className="flex items-center justify-between">
                <span>{providerDetails.email}</span>
                <Mail />
              </div>

              <div className="flex items-center justify-between">
                <span>{providerDetails.phone}</span>
                <Phone />
              </div>

              <div className="flex items-center justify-between">
                <span>{providerDetails.address}</span>
                <MapPin />
              </div>

              <div className="flex items-center justify-between">
                <span>{providerDetails.job}</span>
                <span className="font-bold">
                  التخصص
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>{providerDetails.rating} ⭐</span>
                <span className="font-bold">
                  التقييم
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>{providerDetails.orders}</span>
                <span className="font-bold">
                  الأعمال
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>{providerDetails.earnings} ج.م</span>
                <span className="font-bold">
                  الأرباح
                </span>
              </div>

            </div>

          </div>

        </div>

      )}
      {editModal && selectedProvider && (

  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white w-full max-w-[500px] rounded-[24px] p-6">

      <h2 className="text-2xl font-black mb-6 text-right">
        تعديل البيانات
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          value={selectedProvider.name}
          onChange={(e) =>
            setSelectedProvider({
              ...selectedProvider,
              name: e.target.value,
            })
          }
          className="w-full h-[54px] bg-[#f5f5f5] rounded-xl px-4"
        />

        <input
          type="email"
          value={selectedProvider.email}
          onChange={(e) =>
            setSelectedProvider({
              ...selectedProvider,
              email: e.target.value,
            })
          }
          className="w-full h-[54px] bg-[#f5f5f5] rounded-xl px-4"
        />

        <input
          type="text"
          value={selectedProvider.phone}
          onChange={(e) =>
            setSelectedProvider({
              ...selectedProvider,
              phone: e.target.value,
            })
          }
          className="w-full h-[54px] bg-[#f5f5f5] rounded-xl px-4"
        />
        <input
  type="text"
  value={selectedProvider.address}
  onChange={(e) =>
    setSelectedProvider({
      ...selectedProvider,
      address: e.target.value,
    })
  }
  placeholder="الموقع"
  className="w-full h-[54px] bg-[#f5f5f5] rounded-xl px-4"
/>

<input
  type="number"
  step="0.1"
  value={selectedProvider.rating}
  onChange={(e) =>
    setSelectedProvider({
      ...selectedProvider,
      rating: e.target.value,
    })
  }
  placeholder="التقييم"
  className="w-full h-[54px] bg-[#f5f5f5] rounded-xl px-4"
/>

      </div>

      <div className="flex items-center gap-3 mt-6">

        <button
          onClick={handleUpdateProvider}
          className="bg-green-600 text-white px-6 h-[48px] rounded-xl"
        >
          حفظ
        </button>

        <button
          onClick={() => setEditModal(false)}
          className="border px-6 h-[48px] rounded-xl"
        >
          إلغاء
        </button>

      </div>

    </div>

  </div>

)}
{/* STATUS MODAL */}

{
  statusModal && providerToUpdate && (

    <div
      className="
        fixed
        inset-0
        bg-black/50
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
        p-4
      "
    >

      <div
        className="
          bg-white
          w-full
          max-w-[450px]
          rounded-[32px]
          p-8
          text-center
          shadow-2xl
        "
      >

        {/* ICON */}

        <div
          className={`
            w-24
            h-24
            rounded-full
            mx-auto
            mb-6
            flex
            items-center
            justify-center

            ${
              providerToUpdate.status === "نشط"
                ? "bg-red-100"
                : "bg-green-100"
            }
          `}
        >

          <X
            size={40}
            color={
              providerToUpdate.status === "نشط"
                ? "#DC2626"
                : "#16A34A"
            }
          />

        </div>

        {/* TITLE */}

        <h2
          className="
            text-[32px]
            font-black
            text-[#111827]
            mb-4
          "
        >
          {
            providerToUpdate.status === "نشط"
              ? "تعطيل الحساب"
              : "تفعيل الحساب"
          }
        </h2>

        {/* TEXT */}

        <p
          className="
            text-[#6B7280]
            text-lg
            leading-8
            mb-8
          "
        >

          هل أنت متأكد من

          <span className="font-black text-black">
            {
              providerToUpdate.status === "نشط"
                ? " تعطيل "
                : " تفعيل "
            }
          </span>

          حساب

          <span className="font-black text-black">
            {" "}
            {providerToUpdate.name}
          </span>

          ؟

        </p>

        {/* BUTTONS */}

        <div className="flex gap-4">

          <button
            onClick={confirmStatusChange}
            className={`
              flex-1
              h-[56px]
              rounded-2xl
              text-white
              font-black
              text-lg
              transition-all

              ${
                providerToUpdate.status === "نشط"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }
            `}
          >

            {
              providerToUpdate.status === "نشط"
                ? "تعطيل الحساب"
                : "تفعيل الحساب"
            }

          </button>

          <button
            onClick={() => {

              setStatusModal(false);

              setProviderToUpdate(null);

            }}
            className="
              flex-1
              h-[56px]
              rounded-2xl
              border
              border-[#E5E7EB]
              hover:bg-gray-50
              transition-all
              font-bold
              text-lg
            "
          >
            إلغاء
          </button>

        </div>

      </div>

    </div>

  )
}

    </div>
  );
}