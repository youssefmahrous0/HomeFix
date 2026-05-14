import React, {
  useEffect,
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import {
  Eye,
  Pencil,
  Plus,
  Play,
  Search,
  Trash2,
  MoreVertical
} from "lucide-react";


export default function AdminAds() {

  // =====================================================
  // STATES
  // =====================================================

  const [ads, setAds] =
    useState([]);

  const [filteredAds, setFilteredAds] =
    useState([]);

  const [stats, setStats] =
    useState({});

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [openMenu, setOpenMenu] =
    useState(null);

  const [selectedAd, setSelectedAd] =
    useState(null);
    const [showEditModal, setShowEditModal] =
  useState(false);

  

  // =====================================================
  // FETCH ADS
  // =====================================================

  useEffect(() => {

    fetchAds();

  }, []);

  const fetchAds = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:5000/admin/ads"
      );

      setAds(res.data.ads);

      setFilteredAds(
        res.data.ads
      );

      setStats({

        total_ads:
          res.data.total_ads,

        active_ads:
          res.data.active_ads,

        total_views:
          res.data.total_views,

        total_clicks:
          res.data.total_clicks,

      });

    } catch (err) {

      console.log(err);

    }

  };

  // =====================================================
  // FILTER
  // =====================================================

  useEffect(() => {

    let data = [...ads];

    if (search !== "") {

      data = data.filter((item) =>

        item.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        item.description
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

      );

    }

    if (statusFilter !== "") {

      data = data.filter(
        (item) =>
          item.status ===
          statusFilter
      );

    }

    setFilteredAds(data);

  }, [
    search,
    statusFilter,
    ads
  ]);

  // =====================================================
  // DELETE AD
  // =====================================================

 const deleteAd = async () => {

  try {

    await axios.delete(
      `http://127.0.0.1:5000/admin/ads/${deleteAdId}`
    );

    setDeleteAdId(null);

    setSelectedAd(null);

    fetchAds();

  } catch (err) {

    console.log(err);

  }

};

  // =====================================================
  // TOGGLE STATUS
  // =====================================================

  const toggleStatus =
    async (item) => {

      try {

        await axios.put(
          `http://127.0.0.1:5000/admin/ads/${item.id}`,
          {
            status:
              item.status === "نشط"
                ? "متوقف"
                : "نشط"
          }
        );

        fetchAds();

      } catch (err) {

        console.log(err);

      }

    };


    const [showAddModal, setShowAddModal] =
   useState(false);

   const [newAd, setNewAd] =
   useState({
    title: "",
    description: "",
    location: "",
    ad_type: "",
    start_date: "",
    end_date: "",
  });

  const [editAd, setEditAd] =
   useState({
    id: "",
    title: "",
    description: "",
    location: "",
    ad_type: "",
    start_date: "",
    end_date: "",
    status: ""
  });

  const [deleteAdId, setDeleteAdId] =
  useState(null);


  // =====================================================
// UPDATE AD
// =====================================================

const updateAd = async () => {

  try {

    await axios.put(
      `http://127.0.0.1:5000/admin/ads/${editAd.id}`,
      editAd
    );

    setShowEditModal(false);

    fetchAds();

  } catch (err) {

    console.log(err);

  }

};

  // =====================================================
// CREATE AD
// =====================================================

const createAd = async () => {

  try {

    await axios.post(
      "http://127.0.0.1:5000/admin/ads",
      {
        ...newAd,
        status: "نشط",
        clicks: 0,
        views: 0,
        ctr: 0
      }
    );

    setShowAddModal(false);

    setNewAd({
      title: "",
      description: "",
      location: "",
      ad_type: "",
      start_date: "",
      end_date: "",
    });

    fetchAds();

  } catch (err) {

    console.log(err);

  }

};

  return (

    <div className="
      flex
      bg-[#F5F5F5]
      min-h-screen
    ">

      {/* SIDEBAR */}

      <AdminSidebar />

      {/* PAGE */}

      <div className="flex-1">

        {/* TOPBAR */}

        <div className="
          h-[75px]
          bg-white
          border-b
          border-[#ECECEC]
          px-10
          flex
          items-center
          justify-start
        ">

          <p className="
            text-[#6B7280]
            text-lg
          ">

            {
              new Date().toLocaleDateString(
                "ar-EG",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                }
              )
            }

          </p>

        </div>

        {/* CONTENT */}

        <div className="p-8">

          {/* HEADER */}

          <div className="
            flex
            items-start
            justify-between
            mb-10
          ">

             {/* TITLE */}

            <div className="text-right">

              <h1 className="
                text-[64px]
                font-black
                text-[#111827]
                leading-none
                mb-4
              ">
                إدارة الإعلانات
              </h1>

              <p className="
                text-[28px]
                text-[#6B7280]
              ">
                إنشاء وإدارة الحملات الإعلانية في التطبيق
              </p>

            </div>

            {/* BUTTON */}

            <button
  onClick={() =>
    setShowAddModal(true)
  }
  className="
    h-[48px]
    px-6
    rounded-2xl
    bg-[#16A34A]
    hover:bg-[#15803D]
    transition-all
    text-white
    font-bold
    text-lg
    flex
    items-center
    gap-3
  "
>

  <Plus size={22} />

  إضافة إعلان جديد

</button>

          </div>

          {/* STATS */}

          <div className="
            grid
            grid-cols-4
            gap-6
            mb-8
          ">

            {/* TOTAL ADS */}

            <div className="
              bg-white
              rounded-[28px]
              p-6
              shadow-sm
              border
              border-[#ECECEC]
              flex
              items-center
              justify-between
            ">

              <div className="text-right">

                <p className="
                  text-[#6B7280]
                  text-lg
                  mb-2
                ">
                  إجمالي الإعلانات
                </p>

                <h3 className="
                  text-[52px]
                  font-black
                  text-[#111827]
                ">
                  {
                    stats.total_ads || 0
                  }
                </h3>

              </div>

              <div className="
                w-16
                h-16
                rounded-full
                bg-[#DCFCE7]
                flex
                items-center
                justify-center
              ">

                <Eye
                  size={30}
                  color="#16A34A"
                />

              </div>

            </div>

            {/* ACTIVE ADS */}

            <div className="
              bg-white
              rounded-[28px]
              p-6
              shadow-sm
              border
              border-[#ECECEC]
              flex
              items-center
              justify-between
            ">

              <div className="text-right">

                <p className="
                  text-[#6B7280]
                  text-lg
                  mb-2
                ">
                  إعلانات نشطة
                </p>

                <h3 className="
                  text-[52px]
                  font-black
                  text-[#16A34A]
                ">
                  {
                    stats.active_ads || 0
                  }
                </h3>

              </div>

              <div className="
                w-16
                h-16
                rounded-full
                bg-[#DCFCE7]
                flex
                items-center
                justify-center
              ">

                <Play
                  size={30}
                  color="#16A34A"
                />

              </div>

            </div>

            {/* VIEWS */}

            <div className="
              bg-white
              rounded-[28px]
              p-6
              shadow-sm
              border
              border-[#ECECEC]
              flex
              items-center
              justify-between
            ">

              <div className="text-right">

                <p className="
                  text-[#6B7280]
                  text-lg
                  mb-2
                ">
                  إجمالي المشاهدات
                </p>

                <h3 className="
                  text-[52px]
                  font-black
                  text-[#2563EB]
                ">
                  {
                    stats.total_views || 0
                  }
                </h3>

              </div>

              <div className="
                w-16
                h-16
                rounded-full
                bg-[#DBEAFE]
                flex
                items-center
                justify-center
              ">

                <Eye
                  size={30}
                  color="#2563EB"
                />

              </div>

            </div>

            {/* CLICKS */}

            <div className="
              bg-white
              rounded-[28px]
              p-6
              shadow-sm
              border
              border-[#ECECEC]
              flex
              items-center
              justify-between
            ">

              <div className="text-right">

                <p className="
                  text-[#6B7280]
                  text-lg
                  mb-2
                ">
                  إجمالي النقرات
                </p>

                <h3 className="
                  text-[52px]
                  font-black
                  text-[#16A34A]
                ">
                  {
                    stats.total_clicks || 0
                  }
                </h3>

              </div>

              <div className="
                w-16
                h-16
                rounded-full
                bg-[#DCFCE7]
                flex
                items-center
                justify-center
              ">

                <Play
                  size={30}
                  color="#16A34A"
                />

              </div>

            </div>

          </div>

          {/* FILTERS */}

          <div className="
            bg-white
            rounded-[28px]
            p-6
            shadow-sm
            border
            border-[#ECECEC]
            mb-8
          ">

            <div className="
              flex
              items-center
              gap-4
            ">

              {/* SEARCH */}

              <div className="
                flex-1
                relative
              ">

                <input
                  type="text"
                  placeholder="
                  البحث بعنوان الإعلان أو الوصف...
                  "
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-[48px]
                    rounded-2xl
                    bg-[#F5F5F5]
                    pr-14
                    px-5
                    outline-none
                    text-[16px]
                  "
                />

                <Search
                  size={20}
                  color="#9CA3AF"
                  className="
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                  "
                />

              </div>

              {/* STATUS */}

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="
                  h-[48px]
                  min-w-[180px]
                  rounded-2xl
                  bg-[#F5F5F5]
                  px-5
                  outline-none
                  text-[16px]
                "
              >

                <option value="">
                  جميع الحالات
                </option>

                <option value="نشط">
                  نشط
                </option>

                <option value="متوقف">
                  متوقف
                </option>

                <option value="منتهي">
                  منتهي
                </option>

              </select>

            </div>
            

          </div>

          {/* ADS GRID */}

<div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-3
    gap-6
  "
>

  {
    filteredAds.map((item) => (

      <div
        key={item.id}
        className="
          bg-[#FAFAFA]
          rounded-[28px]
          p-6
          border
          border-[#EAEAEA]
          shadow-sm
          relative
          
        "
      >

        {/* TOP */}

        <div className="
          flex
          items-start
          justify-between
          mb-6
        ">

          {/* BADGES */}

          <div className="
            flex
            items-center
            gap-2
          ">

            {/* TYPE */}

            <span className={`
              h-[28px]
              px-3
              rounded-full
              text-[12px]
              font-bold
              flex
              items-center
              justify-center
              ${
                item.ad_type === "بانر جانبي"
                  ? "bg-[#DCFCE7] text-[#16A34A]"
                  : "bg-[#FEF3C7] text-[#B45309]"
              }
            `}>

              {item.ad_type}

            </span>

            {/* STATUS */}

            <span className={`
              h-[28px]
              px-3
              rounded-full
              text-[12px]
              font-bold
              flex
              items-center
              justify-center
              ${
                item.status === "نشط"
                  ? "bg-[#16A34A] text-white"
                  : item.status === "منتهي"
                  ? "bg-[#E5E7EB] text-[#6B7280]"
                  : "bg-[#FEF3C7] text-[#B45309]"
              }
            `}>

              {item.status}

            </span>

          </div>

          {/* MENU */}

          <div className="relative">

  {/* زر الثلاث نقاط */}
  <button
    onClick={() =>
      setOpenMenu(
        openMenu === item.id
          ? null
          : item.id
      )
    }
    className="
      w-10
      h-10
      rounded-xl
      hover:bg-gray-100
      flex
      items-center
      justify-center
      transition
    "
  >
    <MoreVertical size={20} />
  </button>

  {/* القائمة */}
  {
    openMenu === item.id && (
      <div
        className="
          absolute
          top-12
          left-0
          w-[190px]
          bg-white
          rounded-2xl
          shadow-xl
          border
          border-[#ECECEC]
          py-2
          z-50
        "
      >

      {/* عرض التفاصيل */}
<button
  onClick={() => {
    setSelectedAd(item);
    setOpenMenu(null);
  }}
  className="
    w-full
    px-4
    py-3
    flex
    items-center
    gap-3
    text-right
    hover:bg-gray-50
    transition
  "
>
  <Eye size={18} />
  عرض التفاصيل
</button>

        {/* تعديل */}
        {/* تعديل */}
<button
  onClick={() => {

    setEditAd({
      id: item.id,
      title: item.title,
      description: item.description,
      location: item.location,
      ad_type: item.ad_type,
      start_date: item.start_date,
      end_date: item.end_date,
      status: item.status
    });

    setShowEditModal(true);

    setOpenMenu(null);

  }}
  className="
    w-full
    px-4
    py-3
    flex
    items-center
    gap-3
    text-right
    hover:bg-gray-50
    transition
  "
>
  <Pencil size={18} />
  تعديل الإعلان
</button>
        {/* تفعيل */}
       <button
  onClick={() => toggleStatus(item)}
  className="
    w-full
    px-4
    py-3
    flex
    items-center
    gap-3
    text-right
    hover:bg-gray-50
    transition
  "
>
  <Play size={18} />

  {
    item.status === "نشط"
      ? "إيقاف الإعلان"
      : "تفعيل الإعلان"
  }

</button>

        {/* حذف */}
       <button
  onClick={() =>
    setDeleteAdId(item.id)
  }
  className="
    w-full
    px-4
    py-3
    flex
    items-center
    gap-3
    text-right
    text-red-500
    hover:bg-red-50
    transition
  "
>
  <Trash2 size={18} />
  حذف الإعلان
</button>

      </div>
    )
  }

</div>

        </div>

        {/* TITLE */}

        <h2
          className="
            text-[22px]
            font-black
            text-[#111827]
            text-right
            leading-[44px]
            mb-5
            min-h-[90px]
          "
        >
          {item.title}
        </h2>

        {/* DESC */}

        <p
          className="
            text-right
            text-[#6B7280]
            text-[16px]
            leading-8
            mb-6
            min-h-[80px]
          "
        >
          {item.description}
        </p>

        {/* INFO */}

        <div
          className="
            space-y-3
            mb-5
            text-right
          "
        >

          <div className="
            flex
            items-center
            justify-between
          ">
            <span className="text-[#6B7280]">
              :الموقع
            </span>
            
            <span className="
              text-[#111827]
              font-bold
            ">
              {item.location}
            </span>

          </div>

          <div className="
            flex
            items-center
            justify-between
          "> 
             <span className="text-[#6B7280]">
              تاريخ البداية: 
            </span>

            <span className="
              text-[#111827]
              font-bold
            ">
              {item.start_date}
            </span>

          </div>

          <div className="
            flex
            items-center
            justify-between
          ">
        
             <span className="text-[#6B7280]">
              تاريخ النهاية: 
            </span>

            <span className="
              text-[#111827]
              font-bold
            ">
              {item.end_date}
            </span>

            

          </div>

        </div>

        {/* LINE */}

        <div
          className="
            h-[1px]
            bg-[#E5E7EB]
            mb-5
          "
        />

        {/* STATS */}

        <div
          className="
            grid
            grid-cols-2
            gap-3
            mb-4
          "
        >

          {/* CLICKS */}

          <div
            className="
              bg-[#EDF9F0]
              rounded-2xl
              py-4
              text-center
            "
          >

            <p
              className="
                text-[#16A34A]
                text-sm
                mb-1
              "
            >
              النقرات
            </p>

            <h3
              className="
                text-[22px]
                font-black
                text-[#166534]
              "
            >
              {item.clicks}
            </h3>

          </div>

          {/* VIEWS */}

          <div
            className="
              bg-[#EEF2FF]
              rounded-2xl
              py-4
              text-center
            "
          >

            <p
              className="
                text-[#2563EB]
                text-sm
                mb-1
              "
            >
              المشاهدات
            </p>

            <h3
              className="
                text-[22px]
                font-black
                text-[#1E3A8A]
              "
            >
              {item.views}
            </h3>

          </div>

        </div>

        {/* CTR */}

        <div
          className="
            bg-[#EDF9F0]
            rounded-2xl
            py-4
            text-center
            mb-5
          "
        >

          <p
            className="
              text-[#6B7280]
              text-sm
              mb-1
            "
          >
            (CTR) معدل النقر
          </p>

          <h3
            className="
              text-[20px]
              font-black
              text-[#16A34A]
            "
          >
            {item.ctr}%
          </h3>

        </div>
      </div>

    ))
  }

</div>

        </div>

      </div>

      {/* ADD MODAL */}

{
  showAddModal && (

    <div className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      p-4
    ">

      <div className="
        bg-white
        w-full
        max-w-[560px]
        rounded-[28px]
        p-6
        relative
      ">

        {/* CLOSE */}

        <button
          onClick={() =>
            setShowAddModal(false)
          }
          className="
            absolute
            top-6
            left-6
            text-[#6B7280]
            hover:text-black
            text-2xl
          "
        >
          ×
        </button>

        {/* TITLE */}

        <div className="mb-8 text-right">

          <h2 className="
            text-[24px]
            font-black
            text-[#111827]
            mb-2
          ">
            إنشاء إعلان جديد
          </h2>

          <p className="
            text-[#6B7280]
            text-lg
          ">
            قم بإدخال تفاصيل الإعلان الجديد
          </p>

        </div>

        {/* FORM */}

        <div className="space-y-4">

          {/* TITLE */}

          <div>

            <label className="
              block
              text-right
              font-bold
              mb-3
            ">
              عنوان الإعلان
            </label>

            <input
              type="text"
              placeholder="أدخل عنوان الإعلان"
              value={newAd.title}
              onChange={(e) =>
                setNewAd({
                  ...newAd,
                  title: e.target.value
                })
              }
              className="
                w-full
                h-[48px]
                rounded-2xl
                bg-[#F5F5F5]
                px-5
                outline-none
              "
            />

          </div>

          {/* DESCRIPTION */}

          <div>

            <label className="
              block
              text-right
              font-bold
              mb-3
            ">
              الوصف
            </label>

            <textarea
              placeholder="وصف الإعلان"
              value={newAd.description}
              onChange={(e) =>
                setNewAd({
                  ...newAd,
                  description: e.target.value
                })
              }
              className="
                w-full
                h-[90px]
                rounded-2xl
                bg-[#F5F5F5]
                px-5
                py-4
                outline-none
                resize-none
              "
            />

          </div>

          {/* ROW */}

          <div className="
            grid
            grid-cols-2
            gap-3
          ">

            {/* TYPE */}

            <div>

              <label className="
                block
                text-right
                font-bold
                mb-3
              ">
                نوع الإعلان
              </label>

              <select
                value={newAd.ad_type}
                onChange={(e) =>
                  setNewAd({
                    ...newAd,
                    ad_type: e.target.value
                  })
                }
                className="
                  w-full
                  h-[48px]
                  rounded-2xl
                  bg-[#F5F5F5]
                  px-5
                  outline-none
                "
              >

                <option value="">
                  اختر النوع
                </option>

                <option value="بانر">
                  بانر
                </option>

                <option value="بانر جانبي">
                  بانر جانبي
                </option>

              </select>

            </div>

            {/* LOCATION */}

            <div>

              <label className="
                block
                text-right
                font-bold
                mb-3
              ">
                الموقع
              </label>

              <select
                value={newAd.location}
                onChange={(e) =>
                  setNewAd({
                    ...newAd,
                    location: e.target.value
                  })
                }
                className="
                  w-full
                  h-[48px]
                  rounded-2xl
                  bg-[#F5F5F5]
                  px-5
                  outline-none
                "
              >

                <option value="">
                  اختر الموقع
                </option>

                <option value="الصفحة الرئيسية">
                  الصفحة الرئيسية
                </option>

                <option value="صفحة الخدمات">
                  صفحة الخدمات
                </option>

              </select>

            </div>

          </div>

          {/* DATES */}

          <div className="
            grid
            grid-cols-2
            gap-5
          ">

            {/* START */}

            <div>

              <label className="
                block
                text-right
                font-bold
                mb-3
              ">
                تاريخ البداية
              </label>

              <input
                type="date"
                value={newAd.start_date}
                onChange={(e) =>
                  setNewAd({
                    ...newAd,
                    start_date: e.target.value
                  })
                }
                className="
                  w-full
                  h-[48px]
                  rounded-2xl
                  bg-[#F5F5F5]
                  px-5
                  outline-none
                "
              />

            </div>

            {/* END */}

            <div>

              <label className="
                block
                text-right
                font-bold
                mb-3
              ">
                تاريخ النهاية
              </label>

              <input
                type="date"
                value={newAd.end_date}
                onChange={(e) =>
                  setNewAd({
                    ...newAd,
                    end_date: e.target.value
                  })
                }
                className="
                  w-full
                  h-[48px]
                  rounded-2xl
                  bg-[#F5F5F5]
                  px-5
                  outline-none
                "
              />

            </div>

          </div>

          {/* BUTTONS */}

          <div className="
            flex
            items-center
            gap-4
            pt-4
          ">

            <button
              onClick={createAd}
              className="
                h-[48px]
                px-8
                rounded-2xl
                bg-[#16A34A]
                hover:bg-[#15803D]
                transition-all
                text-white
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
                h-[48px]
                px-8
                rounded-2xl
                border
                border-[#D1D5DB]
                hover:bg-gray-50
                transition-all
                font-bold
              "
            >
              إلغاء
            </button>

          </div>

        </div>

      </div>

    </div>

  )
}
{/* DETAILS MODAL */}

{
  selectedAd && (

    <div className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      p-4
    ">

      <div className="
        bg-white
        w-full
        max-w-[600px]
        rounded-[28px]
        p-8
        relative
      ">

        {/* CLOSE */}

        <button
          onClick={() =>
            setSelectedAd(null)
          }
          className="
            absolute
            top-5
            left-5
            text-2xl
            text-gray-500
          "
        >
          ×
        </button>

        {/* TITLE */}

        <div className="text-right mb-8">

          <h2 className="
            text-[30px]
            font-black
            text-[#111827]
            mb-3
          ">
            {selectedAd.title}
          </h2>

          <p className="
            text-[#6B7280]
            leading-8
            text-lg
          ">
            {selectedAd.description}
          </p>

        </div>

        {/* INFO */}

        <div className="
          space-y-5
          text-right
        ">

          <div className="
            flex
            items-center
            justify-between
          ">
            <span className="font-bold">
              {selectedAd.location}
            </span>

            <span className="text-gray-500">
              الموقع
            </span>
          </div>

          <div className="
            flex
            items-center
            justify-between
          ">
            <span className="font-bold">
              {selectedAd.ad_type}
            </span>

            <span className="text-gray-500">
              نوع الإعلان
            </span>
          </div>

          <div className="
            flex
            items-center
            justify-between
          ">
            <span className="font-bold">
              {selectedAd.status}
            </span>

            <span className="text-gray-500">
              الحالة
            </span>
          </div>

          <div className="
            flex
            items-center
            justify-between
          ">
            <span className="font-bold">
              {selectedAd.start_date}
            </span>

            <span className="text-gray-500">
              تاريخ البداية
            </span>
          </div>

          <div className="
            flex
            items-center
            justify-between
          ">
            <span className="font-bold">
              {selectedAd.end_date}
            </span>

            <span className="text-gray-500">
              تاريخ النهاية
            </span>
          </div>

        </div>

        {/* STATS */}

        <div className="
          grid
          grid-cols-3
          gap-4
          mt-8
        ">

          <div className="
            bg-[#EDF9F0]
            rounded-2xl
            p-4
            text-center
          ">
            <p className="text-sm text-gray-500 mb-2">
              النقرات
            </p>

            <h3 className="
              text-2xl
              font-black
              text-[#16A34A]
            ">
              {selectedAd.clicks}
            </h3>
          </div>

          <div className="
            bg-[#EEF2FF]
            rounded-2xl
            p-4
            text-center
          ">
            <p className="text-sm text-gray-500 mb-2">
              المشاهدات
            </p>

            <h3 className="
              text-2xl
              font-black
              text-[#2563EB]
            ">
              {selectedAd.views}
            </h3>
          </div>

          <div className="
            bg-[#FEF3C7]
            rounded-2xl
            p-4
            text-center
          ">
            <p className="text-sm text-gray-500 mb-2">
              CTR
            </p>

            <h3 className="
              text-2xl
              font-black
              text-[#B45309]
            ">
              %{selectedAd.ctr}
            </h3>
          </div>

        </div>

      </div>

    </div>

  )
}
{/* EDIT MODAL */}

{
  showEditModal && (

    <div className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      p-4
    ">

      <div className="
        bg-white
        w-full
        max-w-[560px]
        rounded-[28px]
        p-6
        relative
      ">

        {/* CLOSE */}

        <button
          onClick={() =>
            setShowEditModal(false)
          }
          className="
            absolute
            top-6
            left-6
            text-2xl
            text-[#6B7280]
          "
        >
          ×
        </button>

        {/* TITLE */}

        <div className="mb-8 text-right">

          <h2 className="
            text-[24px]
            font-black
            text-[#111827]
            mb-2
          ">
            تعديل الإعلان
          </h2>

        </div>

        {/* FORM */}

        <div className="space-y-4">

          {/* TITLE */}

          <input
            type="text"
            value={editAd.title}
            onChange={(e) =>
              setEditAd({
                ...editAd,
                title: e.target.value
              })
            }
            placeholder="عنوان الإعلان"
            className="
              w-full
              h-[48px]
              rounded-2xl
              bg-[#F5F5F5]
              px-5
              outline-none
            "
          />

          {/* DESCRIPTION */}

          <textarea
            value={editAd.description}
            onChange={(e) =>
              setEditAd({
                ...editAd,
                description: e.target.value
              })
            }
            placeholder="الوصف"
            className="
              w-full
              h-[100px]
              rounded-2xl
              bg-[#F5F5F5]
              px-5
              py-4
              outline-none
              resize-none
            "
          />

          {/* TYPE */}

          <select
            value={editAd.ad_type}
            onChange={(e) =>
              setEditAd({
                ...editAd,
                ad_type: e.target.value
              })
            }
            className="
              w-full
              h-[48px]
              rounded-2xl
              bg-[#F5F5F5]
              px-5
              outline-none
            "
          >

            <option value="بانر">
              بانر
            </option>

            <option value="بانر جانبي">
              بانر جانبي
            </option>

          </select>

          {/* LOCATION */}

          <select
            value={editAd.location}
            onChange={(e) =>
              setEditAd({
                ...editAd,
                location: e.target.value
              })
            }
            className="
              w-full
              h-[48px]
              rounded-2xl
              bg-[#F5F5F5]
              px-5
              outline-none
            "
          >

            <option value="الصفحة الرئيسية">
              الصفحة الرئيسية
            </option>

            <option value="صفحة الخدمات">
              صفحة الخدمات
            </option>

          </select>

          {/* DATES */}

          <div className="
            grid
            grid-cols-2
            gap-4
          ">

            <input
              type="date"
              value={editAd.start_date}
              onChange={(e) =>
                setEditAd({
                  ...editAd,
                  start_date: e.target.value
                })
              }
              className="
                h-[48px]
                rounded-2xl
                bg-[#F5F5F5]
                px-5
                outline-none
              "
            />

            <input
              type="date"
              value={editAd.end_date}
              onChange={(e) =>
                setEditAd({
                  ...editAd,
                  end_date: e.target.value
                })
              }
              className="
                h-[48px]
                rounded-2xl
                bg-[#F5F5F5]
                px-5
                outline-none
              "
            />

          </div>

          {/* BUTTONS */}

          <div className="
            flex
            items-center
            gap-4
            pt-4
          ">

            <button
              onClick={updateAd}
              className="
                h-[48px]
                px-8
                rounded-2xl
                bg-[#16A34A]
                hover:bg-[#15803D]
                text-white
                font-bold
              "
            >
              حفظ التعديلات
            </button>

            <button
              onClick={() =>
                setShowEditModal(false)
              }
              className="
                h-[48px]
                px-8
                rounded-2xl
                border
                border-[#D1D5DB]
              "
            >
              إلغاء
            </button>

          </div>

        </div>

      </div>

    </div>

  )
}
{
  deleteAdId && (

    <div className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      p-4
    ">

      <div className="
        bg-white
        w-full
        max-w-[420px]
        rounded-[28px]
        p-8
        text-center
        animate-in
      ">

        {/* ICON */}

        <div className="
          w-20
          h-20
          rounded-full
          bg-red-100
          mx-auto
          mb-6
          flex
          items-center
          justify-center
        ">

          <Trash2
            size={34}
            color="#DC2626"
          />

        </div>

        {/* TITLE */}

        <h2 className="
          text-[28px]
          font-black
          text-[#111827]
          mb-3
        ">
          حذف الإعلان
        </h2>

        {/* TEXT */}

        <p className="
          text-[#6B7280]
          text-lg
          leading-8
          mb-8
        ">
          هل أنت متأكد من حذف هذا الإعلان؟
          <br />
          لا يمكن التراجع بعد الحذف.
        </p>

        {/* BUTTONS */}

        <div className="
          flex
          items-center
          gap-4
        ">

          <button
            onClick={deleteAd}
            className="
              flex-1
              h-[52px]
              rounded-2xl
              bg-red-500
              hover:bg-red-600
              transition-all
              text-white
              font-bold
              text-lg
            "
          >
            حذف
          </button>

          <button
            onClick={() =>
              setDeleteAdId(null)
            }
            className="
              flex-1
              h-[52px]
              rounded-2xl
              border
              border-[#D1D5DB]
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