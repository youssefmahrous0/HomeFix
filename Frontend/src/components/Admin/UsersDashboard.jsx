import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  UserPlus,
  X,
} from "lucide-react";

export default function UsersDashboard() {
    
const [users, setUsers] = useState([]);
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("الكل");

const filteredUsers = users.filter((user) => {

  const matchesSearch =
    user.name?.includes(search) ||
    user.email?.includes(search) ||
    user.phone?.includes(search);

  const matchesStatus =
    statusFilter === "الكل"
      ? true
      : user.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  const [openMenu, setOpenMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "نشط",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

   
   const handleStatusChange = async (id, status) => {

  try {

    await axios.put(
      `http://https://homefix-production-0bc9.up.railway.app/admin/users/${id}`,
      { status }
    );

    fetchUsers();

  } catch (err) {
    console.log(err);
  }
};

  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        "http://https://homefix-production-0bc9.up.railway.app/admin/users"
      );

      setUsers(res.data.users || []);

    } catch (err) {
      console.log(err);
    }
  };

  const handleAddUser = async () => {

    try {

      await axios.post(
        "http://https://homefix-production-0bc9.up.railway.app/admin/users",
        formData
      );

      setShowModal(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        status: "نشط",
      });

      fetchUsers();

    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateUser = async () => {

  try {

    await axios.put(
      `http://https://homefix-production-0bc9.up.railway.app/admin/users/${selectedUser.id}`,
      selectedUser
    );

    setEditModal(false);

    fetchUsers();

  } catch (err) {
    console.log(err);
  }
};

  const handleEditClick = (user) => {

  setSelectedUser({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    status: user.status,
  });

  setEditModal(true);
};

  const today = new Date().toLocaleDateString("ar-EG", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const handleDetailsClick = (user) => {

  setSelectedUser(user);

  setDetailsModal(true);

};

const [confirmModal, setConfirmModal] = useState(false);
const [selectedStatusUser, setSelectedStatusUser] = useState(null);


  return (

  <div className="min-h-screen bg-[#f5f5f5] flex ">

    <AdminSidebar />

    <div className="flex-1">

        {/* Date */}
       <div className="bg-white border-b border-gray-200 px-8 py-6">
        <p className="text-gray-500 text-lg font-medium text-right">
        {today}
        </p>
      </div>

       {/* Content */}
  <div className="p-8">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-10">

        
        <div className="text-right">
          <h1 className="text-5xl font-black text-gray-900 mb-2">
            إدارة المستخدمين
          </h1>

          <p className="text-gray-500 text-xl">
            إدارة حسابات المستخدمين وبياناتهم
          </p>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm"
        >
          <UserPlus size={20} />
          إضافة مستخدم جديد
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
          text-[15px]
          outline-none
          border border-transparent
          focus:border-green-500
          transition
        "
      />

    </div>

    {/* Filter */}
    <div className="relative">

      <Filter
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        size={18}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="
          appearance-none
          bg-[#f5f5f5]
          h-[58px]
          rounded-2xl
          pr-12
          pl-10
          text-gray-700
          font-medium
          outline-none
          min-w-[160px]
          border border-transparent
          focus:border-green-500
          transition
          cursor-pointer
        "
      >
        <option value="الكل">جميع الحالات</option>
        <option value="نشط">نشط</option>
        <option value="موقوف">موقوف</option>
      </select>

    </div>

  </div>

</div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredUsers.map((user) => (

          <div
            key={user.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative"
          >

            {/* Top */}
             <div className="flex items-start justify-between flex-row-reverse mb-6">

           {/* Right Side */}
           <div className="relative">

         <button
           onClick={() =>
           setOpenMenu(
           openMenu === user.id ? null : user.id
          )
           }
          className="p-1"
          >
          <MoreVertical size={22} />
        </button>

    {openMenu === user.id && (

      <div className="absolute right-0 top-8 w-44 bg-white shadow-xl rounded-2xl  z-50 overflow-hidden">

        <button
  onClick={() => handleDetailsClick(user)}
  className="w-full text-right px-4 py-3 hover:bg-gray-50 text-gray-700"
>
  عرض التفاصيل
</button>

        <button
  onClick={() => handleEditClick(user)}
  className="w-full text-right px-4 py-3 hover:bg-gray-50 text-gray-700"
>
  تعديل البيانات
</button>

       <button
  onClick={() => {

    setSelectedStatusUser(user);

    setConfirmModal(true);

    setOpenMenu(null);

  }}
  className={`
    w-full text-right px-4 py-3 transition
    ${
      user.status === "نشط"
        ? "hover:bg-red-50 text-red-500"
        : "hover:bg-green-50 text-green-600"
    }
  `}
>
  {user.status === "نشط"
    ? "تعطيل الحساب"
    : "تفعيل الحساب"}
</button>

      </div>

    )}

  </div>

  {/* User Info */}
  <div className="flex items-center gap-4">

    {/* Avatar */}
    <div className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold">
      {user.name?.charAt(0)}
    </div>

    {/* Name + Status */}
    <div className="flex flex-col">

      <h3 className="font-bold text-2xl text-gray-800 leading-none mb-2">
        {user.name}
      </h3>

      <span
        className={`
          w-fit px-3 py-1 rounded-full text-xs font-bold
          ${
            user.status === "نشط"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }
        `}
      >
        {user.status}
      </span>

    </div>

  </div>

</div>

            {/* Info */}
            <div className="space-y-4 text-gray-500">

  <div className="flex items-center justify-start gap-2">

    <Mail size={18} />

    <span>{user.email}</span>

  </div>

  <div className="flex items-center justify-start gap-2">

    <Phone size={18} />

    <span>{user.phone}</span>

  </div>

  <div className="flex items-center justify-start gap-2">

    <MapPin size={18} />

    <span>{user.address}</span>

  </div>

  <div className="flex items-center justify-start gap-2">

    <Calendar size={18} />

    <span>
      انضم في {user.joined_at}
    </span>

  </div>

</div>

            {/* Divider */}
            <div className="border-t my-6"></div>

            {/* Footer */}
            <div className="flex items-center justify-between">

              <div className="text-center">

                <p className="text-gray-400 text-sm">
                  الطلبات
                </p>

                <h4 className="text-4xl font-black text-gray-800">
                  {user.orders}
                </h4>

              </div>

              <div className="text-center">

                <p className="text-gray-400 text-sm">
                  إجمالي الإنفاق
                </p>

                <h4 className="text-4xl font-black text-green-600">
                  ج.م {Number(user.spent || 0).toLocaleString()}
                </h4>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Modal */}
      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

  <div className="bg-white w-full max-w-[480px] rounded-[18px] p-5 relative shadow-2xl">

    {/* Close */}
    <button
      onClick={() => setShowModal(false)}
      className="absolute left-4 top-4 text-gray-500 hover:text-black"
    >
      <X size={20} />
    </button>

    <div className="text-right mb-5">

      <h2 className="text-2xl font-black mb-1">
        إضافة مستخدم جديد
      </h2>

      <p className="text-gray-500 text-base">
        قم بإدخال بيانات المستخدم الجديد
      </p>

    </div>

    <div className="space-y-3">

      <div>
        <label className="block mb-1.5 font-bold text-right text-sm">
          الاسم الكامل
        </label>

        <input
          type="text"
          placeholder="أدخل الاسم الكامل"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="w-full h-[48px] bg-[#f5f5f5] rounded-xl px-4 outline-none text-sm"
        />
      </div>

      <div>
        <label className="block mb-1.5 font-bold text-right text-sm">
          البريد الإلكتروني
        </label>

        <input
          type="email"
          placeholder="example@email.com"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          className="w-full h-[48px] bg-[#f5f5f5] rounded-xl px-4 outline-none text-sm"
        />
      </div>

      <div>
        <label className="block mb-1.5 font-bold text-right text-sm">
          رقم الهاتف
        </label>

        <input
          type="text"
          placeholder="01xxxxxxxxxx"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value,
            })
          }
          className="w-full h-[48px] bg-[#f5f5f5] rounded-xl px-4 outline-none text-sm"
        />
      </div>

      <div>
        <label className="block mb-1.5 font-bold text-right text-sm">
          الموقع
        </label>

        <input
          type="text"
          placeholder="المدينة - الحي"
          value={formData.address}
          onChange={(e) =>
            setFormData({
              ...formData,
              address: e.target.value,
            })
          }
          className="w-full h-[48px] bg-[#f5f5f5] rounded-xl px-4 outline-none text-sm"
        />
      </div>

      <div>
        <label className="block mb-1.5 font-bold text-right text-sm">
          الحالة
        </label>

        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value,
            })
          }
          className="w-full h-[48px] bg-[#f5f5f5] rounded-xl px-4 outline-none text-sm"
        >
          <option>نشط</option>
          <option>موقوف</option>
        </select>
      </div>

    </div>

    {/* Buttons */}
    <div className="flex items-center gap-3 mt-5">

      <button
        onClick={handleAddUser}
        className="bg-green-600 hover:bg-green-700 text-white px-6 h-[44px] rounded-xl font-bold text-sm"
      >
        حفظ
      </button>

      <button
        onClick={() => setShowModal(false)}
        className="border border-gray-300 px-6 h-[44px] rounded-xl font-medium text-sm"
      >
        إلغاء
      </button>

    </div>

  </div>

</div>


      )}
      </div>
      </div>
      {editModal && (

  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white w-full max-w-[480px] rounded-[18px] p-5 relative shadow-2xl">

      <button
        onClick={() => setEditModal(false)}
        className="absolute left-4 top-4"
      >
        <X size={20} />
      </button>

      <div className="text-right mb-5">

        <h2 className="text-2xl font-black mb-1">
          تعديل بيانات المستخدم
        </h2>

      </div>

      <div className="space-y-3">

        <input
          type="text"
          value={selectedUser.name}
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              name: e.target.value,
            })
          }
          className="w-full h-[48px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
        />

        <input
          type="email"
          value={selectedUser.email}
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              email: e.target.value,
            })
          }
          className="w-full h-[48px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
        />

        <input
          type="text"
          value={selectedUser.phone}
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              phone: e.target.value,
            })
          }
          className="w-full h-[48px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
        />

        <input
          type="text"
          value={selectedUser.address}
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              address: e.target.value,
            })
          }
          className="w-full h-[48px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
        />

        <select
          value={selectedUser.status}
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              status: e.target.value,
            })
          }
          className="w-full h-[48px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
        >
          <option>نشط</option>
          <option>موقوف</option>
        </select>

      </div>

      <div className="flex items-center gap-3 mt-5">

        <button
          onClick={handleUpdateUser}
          className="bg-green-600 text-white px-6 h-[44px] rounded-xl"
        >
          حفظ التعديلات
        </button>

        <button
          onClick={() => setEditModal(false)}
          className="border px-6 h-[44px] rounded-xl"
        >
          إلغاء
        </button>

      </div>

    </div>

  </div>
  

)}
{detailsModal && selectedUser && (

  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white w-full max-w-[500px] rounded-[22px] p-6 relative shadow-2xl">

      {/* Close */}
      <button
        onClick={() => setDetailsModal(false)}
        className="absolute left-5 top-5 text-gray-500 hover:text-black"
      >
        <X size={22} />
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">

        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-green-600 text-white flex items-center justify-center text-4xl font-black">
          {selectedUser.name?.charAt(0)}
        </div>

        {/* Info */}
        <div className="text-right">

          <h2 className="text-3xl font-black text-gray-900 mb-2">
            {selectedUser.name}
          </h2>

          <span
            className={`
              px-4 py-1 rounded-full text-sm font-bold
              ${
                selectedUser.status === "نشط"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }
            `}
          >
            {selectedUser.status}
          </span>

        </div>

      </div>

      {/* Details */}
      <div className="space-y-5">

        <div className="bg-[#f5f5f5] rounded-2xl p-4 flex items-center gap-3">

          <Mail className="text-gray-500" size={20} />

          <div>

            <p className="text-sm text-gray-400">
              البريد الإلكتروني
            </p>

            <h4 className="font-bold text-gray-800">
              {selectedUser.email}
            </h4>

          </div>

        </div>

        <div className="bg-[#f5f5f5] rounded-2xl p-4 flex items-center gap-3">

          <Phone className="text-gray-500" size={20} />

          <div>

            <p className="text-sm text-gray-400">
              رقم الهاتف
            </p>

            <h4 className="font-bold text-gray-800">
              {selectedUser.phone}
            </h4>

          </div>

        </div>

        <div className="bg-[#f5f5f5] rounded-2xl p-4 flex items-center gap-3">

          <MapPin className="text-gray-500" size={20} />

          <div>

            <p className="text-sm text-gray-400">
              الموقع
            </p>

            <h4 className="font-bold text-gray-800">
              {selectedUser.address}
            </h4>

          </div>

        </div>

        <div className="bg-[#f5f5f5] rounded-2xl p-4 flex items-center gap-3">

          <Calendar className="text-gray-500" size={20} />

          <div>

            <p className="text-sm text-gray-400">
              تاريخ الانضمام
            </p>

            <h4 className="font-bold text-gray-800">
              {selectedUser.joined_at}
            </h4>

          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-4 mt-8">

        <div className="bg-[#f5f5f5] rounded-2xl p-5 text-center">

          <p className="text-gray-400 text-sm mb-2">
            الطلبات
          </p>

          <h3 className="text-3xl font-black text-gray-800">
            {selectedUser.orders}
          </h3>

        </div>

        <div className="bg-[#f5f5f5] rounded-2xl p-5 text-center">

          <p className="text-gray-400 text-sm mb-2">
            إجمالي الإنفاق
          </p>

          <h3 className="text-3xl font-black text-green-600">
            ج.م {Number(selectedUser.spent || 0).toLocaleString()}
          </h3>

        </div>

      </div>

    </div>

  </div>

)}
{/* Confirm Status Modal */}
{confirmModal && selectedStatusUser && (

  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

    <div
      className="
        bg-white
        w-full
        max-w-[420px]
        rounded-[28px]
        p-7
        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        animate-in fade-in zoom-in-95
      "
    >

      {/* Icon */}
      <div
        className={`
          w-20 h-20 mx-auto rounded-full
          flex items-center justify-center mb-6
          ${
            selectedStatusUser.status === "نشط"
              ? "bg-red-100"
              : "bg-green-100"
          }
        `}
      >

        <div
          className={`
            w-12 h-12 rounded-full
            flex items-center justify-center
            text-2xl font-black
            ${
              selectedStatusUser.status === "نشط"
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }
          `}
        >
          !
        </div>

      </div>

      {/* Title */}
      <h2 className="text-3xl font-black text-center text-gray-900 mb-3">

        {selectedStatusUser.status === "نشط"
          ? "تعطيل الحساب؟"
          : "تفعيل الحساب؟"}

      </h2>

      {/* Description */}
      <p className="text-center text-gray-500 leading-8 mb-8 text-lg">

        {selectedStatusUser.status === "نشط"
          ? `سيتم إيقاف حساب ${selectedStatusUser.name} ولن يتمكن من استخدام التطبيق مؤقتًا.`
          : `سيتم إعادة تفعيل حساب ${selectedStatusUser.name} ويمكنه استخدام التطبيق مرة أخرى.`}

      </p>

      {/* Buttons */}
      <div className="flex items-center gap-4">

        <button
          onClick={async () => {

            await handleStatusChange(
              selectedStatusUser.id,
              selectedStatusUser.status === "نشط"
                ? "موقوف"
                : "نشط"
            );

            setConfirmModal(false);

          }}
          className={`
            flex-1
            h-[56px]
            rounded-2xl
            text-white
            font-bold
            text-lg
            transition
            ${
              selectedStatusUser.status === "نشط"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-600 hover:bg-green-700"
            }
          `}
        >

          {selectedStatusUser.status === "نشط"
            ? "نعم، تعطيل الحساب"
            : "نعم، تفعيل الحساب"}

        </button>

        <button
          onClick={() => setConfirmModal(false)}
          className="
            flex-1
            h-[56px]
            rounded-2xl
            border
            border-gray-300
            text-gray-700
            font-bold
            text-lg
            hover:bg-gray-100
            transition
          "
        >
          إلغاء
        </button>

      </div>

    </div>

  </div>

)}
    </div>
  );
}