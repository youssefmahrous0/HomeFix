import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import {
  Search,
  MoreVertical,
  Plus,
  Filter,
  X,
} from "lucide-react";

const API_URL = "https://homefix-production-0bc9.up.railway.app/admin/services";

export default function AdminServices() {

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("");

  const [openMenu, setOpenMenu] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const [selectedService, setSelectedService] = useState(null);

  const [editModal, setEditModal] = useState(false);

  const [newService, setNewService] = useState({
    name: "",
    category_id: "",
    description: "",
    min_price: "",
    max_price: "",
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);



  // ======================================================
  // GET SERVICES
  // ======================================================

  const fetchServices = async () => {

    try {

      const res = await fetch(API_URL);

      const data = await res.json();

      setServices(data.services || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchServices();
    fetchCategories();


  }, []);


  const fetchCategories = async () => {

  try {

    const res = await fetch(
      "https://homefix-production-0bc9.up.railway.app/admin/categories"
    );

    const data = await res.json();

    setCategories(data.categories || []);

  } catch (err) {

    console.log(err);

  }

};



  // ======================================================
  // ADD SERVICE
  // ======================================================

  const handleAddService = async () => {

    try {

      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      });

      setShowAddModal(false);

      setNewService({
        name: "",
        category_id: "",
        description: "",
        price: "",
      });

      fetchServices();

    } catch (err) {

      console.log(err);

    }

  };



  // ======================================================
  // DELETE SERVICE
  // ======================================================

  const handleDelete = async () => {

  if (!serviceToDelete) return;

  try {

    await fetch(
      `${API_URL}/${serviceToDelete.id}`,
      {
        method: "DELETE",
      }
    );

    setDeleteModal(false);

    setServiceToDelete(null);

    fetchServices();

  } catch (err) {

    console.log(err);

  }

};



  // ======================================================
  // TOGGLE STATUS
  // ======================================================

  const handleStatusChange = async (id, status) => {

    try {

      await fetch(`${API_URL}/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      fetchServices();

    } catch (err) {

      console.log(err);

    }

  };



  // ======================================================
  // UPDATE SERVICE
  // ======================================================

  const handleUpdateService = async () => {

    try {

      await fetch(`${API_URL}/${selectedService.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedService),
      });

      setEditModal(false);

      fetchServices();

    } catch (err) {

      console.log(err);

    }

  };



  // ======================================================
  // FILTER
  // ======================================================

  const filteredServices = services.filter((service) => {

    const matchesSearch =
      service.name?.includes(search) ||
      service.description?.includes(search);

    const matchesStatus =
      statusFilter === ""
        ? true
        : service.status === statusFilter;

    const matchesCategory =
      categoryFilter === ""
        ? true
        : service.category === categoryFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory
    );

  });

  const handleLogout = () => {

  localStorage.removeItem("token");

  window.location.href = "/login";

};

const today = new Date().toLocaleDateString("ar-EG", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});


  return (

   <div className="min-h-screen bg-[#f5f5f5] flex">

  <AdminSidebar handleLogout={handleLogout} />

  <div className="flex-1">

  {/* Date */}
  <div className="bg-white border-b border-gray-200 px-8 py-6">
    <p className="text-gray-500 text-lg font-medium text-right">
      {today}
    </p>
  </div>

  {/* Content */}
  <div className="p-8 direction-rtl">
    

      {/* HEADER */}

      <div className="flex items-start justify-between mb-8">
         
         <div className="text-right">

          <h1 className="text-[52px] font-black text-[#111827]">
            إدارة الخدمات
          </h1>

          <p className="text-[#6B7280] text-2xl">
            إدارة وتنظيم الخدمات المتاحة في التطبيق
          </p>

        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="
            bg-[#00B140]
            text-white
            h-[54px]
            px-6
            rounded-2xl
            flex items-center gap-3
            font-bold
            hover:bg-green-700
            transition
          "
        >
          <Plus size={20} />
          إضافة خدمة جديدة
        </button>

       

      </div>



    {/* FILTERS */}

<div
  className="
    bg-white
    rounded-[30px]
    shadow-sm
    p-6
    mb-8
  "
>

  <div className="flex items-center gap-4">

    {/* SEARCH */}

    <div className="flex-1 relative">

      <input
        type="text"
        placeholder="البحث باسم الخدمة أو الوصف..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          h-[64px]
          rounded-2xl
          bg-[#F5F5F5]
          pr-16
          pl-5
          text-lg
          outline-none
          border-none
        "
      />

      <Search
        className="
          absolute
          right-5
          top-1/2
          -translate-y-1/2
        "
        color="#9CA3AF"
        size={28}
      />

    </div>



    {/* CATEGORY */}

    <div
      className="
        h-[64px]
        min-w-[180px]
        rounded-2xl
        bg-[#F5F5F5]
        px-5
        flex
        items-center
      "
    >

      <select
        value={categoryFilter}
        onChange={(e) =>
          setCategoryFilter(e.target.value)
        }
        className="
          bg-transparent
          outline-none
          text-lg
          w-full
          text-[#374151]
        "
      >

        <option value="">
          جميع التصنيفات
        </option>

        {categories.map((category) => (

          <option
            key={category.id}
            value={category.name}
          >
            {category.name}
          </option>

        ))}

      </select>

    </div>



    {/* STATUS */}

    <div
      className="
        h-[64px]
        min-w-[180px]
        rounded-2xl
        bg-[#F5F5F5]
        px-5
        flex
        items-center
        gap-3
      "
    >

      <Filter
        size={20}
        color="#9CA3AF"
      />

      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(e.target.value)
        }
        className="
          bg-transparent
          outline-none
          text-lg
          w-full
          text-[#374151]
        "
      >

        <option value="">
          جميع الحالات
        </option>

        <option value="نشط">
          نشط
        </option>

        <option value="معطل">
          معطل
        </option>

      </select>

    </div>

  </div>

</div>



      {/* SERVICES */}

      {loading ? (

        <div className="text-center py-20 text-2xl">
          جاري التحميل...
        </div>

      ) : (

        <div className="grid grid-cols-3 gap-6">

          {filteredServices.map((service) => (

            <div
              key={service.id}
              className="
                bg-white
                rounded-[24px]
                p-6
                shadow-sm
                relative
              "
            >

              {/* MENU */}

              <div className="absolute top-6 left-6">

                <button
                  onClick={() =>
                    setOpenMenu(
                      openMenu === service.id
                        ? null
                        : service.id
                    )
                  }
                >
                  <MoreVertical />
                </button>



                {openMenu === service.id && (

                  <div
                    className="
                      absolute
                      top-8
                      left-0
                      bg-white
                      shadow-2xl
                      rounded-2xl
                      overflow-hidden
                      w-48
                      z-50
                    "
                  >

                    <button
                      onClick={() => {

                        setSelectedService(service);

                        setEditModal(true);

                        setOpenMenu(null);

                      }}
                      className="
                        w-full
                        text-right
                        px-5
                        py-3
                        hover:bg-gray-50
                      "
                    >
                      تعديل البيانات
                    </button>

                    <button
                      onClick={() =>
                        handleStatusChange(
                          service.id,
                          service.status === "نشط"
                            ? "معطل"
                            : "نشط"
                        )
                      }
                      className="
                        w-full
                        text-right
                        px-5
                        py-3
                        text-red-500
                        hover:bg-red-50
                      "
                    >
                      {service.status === "نشط"
                        ? "تعطيل الخدمة"
                        : "تفعيل الخدمة"}
                    </button>

                    <button
  onClick={() => {

    setServiceToDelete(service);

    setDeleteModal(true);

    setOpenMenu(null);

  }}
  className="
    w-full
    text-right
    px-5
    py-3
    text-red-600
    hover:bg-red-50
  "
>
  حذف الخدمة
</button>

                  </div>

                )}

              </div>



              {/* STATUS */}

              <div className="flex justify-start gap-2 mb-5">
                 
                   <span
                  className="
                    bg-[#00B140]
                    text-white
                    px-4
                    py-1
                    rounded-full
                    text-sm
                    font-bold
                  "
                >
                  {service.category}
                </span>

                <span
                  className={`
                    px-4 py-1 rounded-full text-sm font-bold

                    ${
                      service.status === "نشط"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }
                  `}
                >
                  {service.status}
                </span>

              </div>



              {/* TITLE */}

              <h2
                className="
                  text-[36px]
                  font-black
                  text-center
                  mb-5
                "
              >
                {service.name}
              </h2>



              {/* DESCRIPTION */}

              <p
                className="
                  text-center
                  text-[#6B7280]
                  text-lg
                  leading-8
                  mb-6
                  min-h-[70px]
                "
              >
                {service.description}
              </p>



              {/* PRICE */}

              <div
  className="
    bg-[#EAF7EF]
    rounded-2xl
    py-5
    text-center
    mb-6
  "
>

  <p className="text-[#6B7280] text-xl mb-2">
    السعر المتوسط
  </p>

  <h3
    className="
      text-[#00B140]
      text-[42px]
      font-black
      leading-none
    "
  >
    {service.min_price} - {service.max_price} ج.م
  </h3>

</div>


              {/* STATS */}

              <div
                className="
                  border-t
                  pt-5
                  grid
                  grid-cols-3
                  text-center
                "
              >

                <div>

                  <p className="text-[#6B7280]">
                    مقدمو الخدمة
                  </p>

                  <h3
                    className="
                      text-[#111827]
                      text-3xl
                      font-black
                    "
                  >
                    {service.providers_count}
                  </h3>

                </div>

                <div>

                  <p className="text-[#6B7280]">
                    الطلبات
                  </p>

                  <h3
                    className="
                      text-[#111827]
                      text-3xl
                      font-black
                    "
                  >
                    {service.orders_count}
                  </h3>

                </div>

                 <div>

                  <p className="text-[#6B7280]">
                    التقييم
                  </p>

                  <h3
                    className="
                      text-[#D18B00]
                      text-3xl
                      font-black
                    "
                  >
                    {service.rating}
                  </h3>

                </div>

                

              </div>

            </div>

          ))}

        </div>

      )}



      {/* ================================================= */}
      {/* ADD MODAL */}
      {/* ================================================= */}

      {showAddModal && (

        <div
          className="
            fixed inset-0
            bg-black/40
            flex items-center justify-center
            z-50
          "
        >

          <div
  className="
    bg-white
    w-full
    max-w-[500px]
    rounded-[24px]
    p-6
    relative
  "
>

            <div className="flex items-start justify-between mb-8">

              <button
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                <X />
              </button>

              <div className="text-right">

                <h2 className="text-4xl font-black">
                  إضافة خدمة جديدة
                </h2>

                <p className="text-gray-500 text-lg">
                  قم بإدخال بيانات الخدمة الجديدة
                </p>

              </div>

            </div>



            <div className="space-y-4">

              <div>

                <label className="block mb-2 font-bold text-right">
                  اسم الخدمة
                </label>

                <input
                  type="text"
                  placeholder="أدخل اسم الخدمة"
                  value={newService.name}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      name: e.target.value,
                    })
                  }
                  className="
                    w-full
                    h-[54px]
                    rounded-xl
                    bg-[#f5f5f5]
                    px-5
                    outline-none
                  "
                />

              </div>

              <div>

                <label className="block mb-2 font-bold text-right">
                  التصنيف
                </label>

                <select
                  value={newService.category_id}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      category_id: e.target.value,
                    })
                  }
                  className="
                    w-full
                    h-[58px]
                    rounded-2xl
                    bg-[#f5f5f5]
                    px-5
                    outline-none
                  "
                >
                 {categories.map((category) => (

                  <option
                   key={category.id}
                   value={category.id}
                   >
                   {category.name}
                 </option>
                 ))}

                </select>

              </div>

              <div>

                <label className="block mb-2 font-bold text-right">
                  الوصف
                </label>

                <textarea
                  rows={3}
                  placeholder="وصف تفصيلي للخدمة"
                  value={newService.description}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      description: e.target.value,
                    })
                  }
                  className="
                    w-full
                    rounded-2xl
                    bg-[#f5f5f5]
                    p-5
                    outline-none
                  "
                />

              </div>

              <div>

  <label className="block mb-2 font-bold text-right">
    السعر الأساسي (ج.م)
  </label>

  <input
    type="number"
    placeholder="200"
    value={newService.price}
    onChange={(e) =>
      setNewService({
        ...newService,
        price: e.target.value,
      })
    }
    className="
      w-full
      h-[54px]
      rounded-xl
      bg-[#f5f5f5]
      px-4
      outline-none
    "
  />

</div>



            </div>



            <div className="flex items-center gap-4 mt-8">

              <button
                onClick={handleAddService}
                className="
                  bg-[#00B140]
                  text-white
                  h-[52px]
                  px-8
                  rounded-2xl
                  font-bold
                "
              >
                حفظ
              </button>

              <button
                onClick={() =>
                  setShowAddModal(false)
                }
                className="
                  border
                  h-[52px]
                  px-8
                  rounded-2xl
                  font-bold
                "
              >
                إلغاء
              </button>

            </div>

          </div>

        </div>

      )}



      {/* ================================================= */}
      {/* EDIT MODAL */}
      {/* ================================================= */}

      {editModal && selectedService && (

        <div
          className="
            fixed inset-0
            bg-black/40
            flex items-center justify-center
            z-50
          "
        >

          <div
  className="
    bg-white
    w-full
    max-w-[500px]
    rounded-[24px]
    p-6
    relative
  "
>

            <h2
              className="
                text-4xl
                font-black
                text-right
                mb-8
              "
            >
              تعديل الخدمة
            </h2>



            <div className="space-y-4">

              <input
                type="text"
                value={selectedService.name}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    name: e.target.value,
                  })
                }
                className="
                  w-full
                  h-[54px]
                  rounded-2xl
                  bg-[#f5f5f5]
                  px-5
                "
              />



              <textarea
                rows={3}
                value={selectedService.description}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    description: e.target.value,
                  })
                }
                className="
                  w-full
                  rounded-2xl
                  bg-[#f5f5f5]
                  p-5
                "
              />



              <div className="grid grid-cols-2 gap-4">

                <input
                  type="number"
                  value={selectedService.min_price}
                  onChange={(e) =>
                    setSelectedService({
                      ...selectedService,
                      min_price: e.target.value,
                    })
                  }
                  className="
                    w-full
                    h-[58px]
                    rounded-2xl
                    bg-[#f5f5f5]
                    px-5
                  "
                />



                <input
                  type="number"
                  value={selectedService.max_price}
                  onChange={(e) =>
                    setSelectedService({
                      ...selectedService,
                      max_price: e.target.value,
                    })
                  }
                  className="
                    w-full
                    h-[58px]
                    rounded-2xl
                    bg-[#f5f5f5]
                    px-5
                  "
                />

              </div>

            </div>



            <div className="flex gap-4 mt-8">

              <button
                onClick={handleUpdateService}
                className="
                  bg-[#00B140]
                  text-white
                  h-[52px]
                  px-8
                  rounded-2xl
                  font-bold
                "
              >
                حفظ
              </button>

              <button
                onClick={() =>
                  setEditModal(false)
                }
                className="
                  border
                  h-[52px]
                  px-8
                  rounded-2xl
                  font-bold
                "
              >
                إلغاء
              </button>

            </div>

          </div>

        </div>

      )}
      {/* DELETE MODAL */}

{
  deleteModal && serviceToDelete && (

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
          max-w-[430px]
          rounded-[32px]
          p-8
          text-center
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
        "
      >

        {/* ICON */}

        <div
          className="
            w-24
            h-24
            rounded-full
            bg-red-100
            mx-auto
            mb-6
            flex
            items-center
            justify-center
          "
        >

          <X
            size={42}
            color="#DC2626"
          />

        </div>

        {/* TITLE */}

        <h2
          className="
            text-[30px]
            font-black
            text-[#111827]
            mb-3
          "
        >
          حذف الخدمة
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
          هل أنت متأكد من حذف الخدمة
          <span className="font-black text-black">
            {" "}
            "{serviceToDelete.name}"
          </span>
          ؟
          <br />
          لا يمكن التراجع بعد الحذف.
        </p>

        {/* BUTTONS */}

        <div className="flex gap-4">

          <button
            onClick={handleDelete}
            className="
              flex-1
              h-[56px]
              rounded-2xl
              bg-red-600
              hover:bg-red-700
              transition-all
              text-white
              font-black
              text-lg
            "
          >
            حذف الخدمة
          </button>

          <button
            onClick={() => {

              setDeleteModal(false);

              setServiceToDelete(null);

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
    </div>
</div>

  );

}