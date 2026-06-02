import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import AdminSidebar from "../../components/Admin/AdminSidebar";

import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Eye,
  Filter,
  Search
} from "lucide-react";

export default function AdminComplaints() {

  const [complaints, setComplaints] =
    useState([]);

  const [stats, setStats] =
    useState({});

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");
 
  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  const [priorityFilter, setPriorityFilter] =
  useState("");

  // =====================================================
  // FETCH DATA
  // =====================================================

  useEffect(() => {

    fetchComplaints();

  }, []);

  const fetchComplaints = async () => {

    try {

      const res = await axios.get(
        "https://homefix-production-0bc9.up.railway.app/admin/complaints"
      );

      setComplaints(
        res.data.complaints
      );

      setStats({

        total:
          res.data.total_complaints,

        new:
          res.data.new_complaints,

        pending:
          res.data.pending_complaints,

        resolved:
          res.data.resolved_complaints,

      });

    } catch (err) {

      console.log(err);

    }

  };

  // =====================================================
  // FILTERS
  // =====================================================

  const filteredComplaints =
    complaints.filter((item) => {

      const matchSearch =

        item.customer
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        item.subject
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        item.ticket_number
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchStatus =

        statusFilter === ""

        ||

        item.status ===
        statusFilter;

        const matchPriority =

      priorityFilter === ""

      ||
   
      item.priority ===
       priorityFilter;

      return (
        matchSearch &&
        matchStatus &&
        matchPriority
      );

    });

  // =====================================================
  // STATUS COLORS
  // =====================================================

  const statusColor = (status) => {

    if (status === "جديدة") {

      return `
        bg-blue-100
        text-blue-600
      `;

    }

    if (
      status ===
      "قيد المراجعة"
    ) {

      return `
        bg-yellow-100
        text-yellow-700
      `;

    }

    if (status === "محلولة") {

      return `
        bg-green-100
        text-green-700
      `;

    }

    return `
      bg-gray-100
      text-gray-600
    `;

  };

  const priorityColor = (
    priority
  ) => {

    if (priority === "عالي") {

      return `
        bg-red-100
        text-red-600
      `;

    }

    if (priority === "متوسط") {

      return `
        bg-yellow-100
        text-yellow-700
      `;

    }

    if (priority === "منخفض") {

      return `
        bg-green-100
        text-green-700
      `;

    }

    return `
      bg-gray-100
      text-gray-600
    `;

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

        {/* TOP DATE */}

        <div className="
          h-[70px]
          border-b
          border-gray-200
          bg-white
          px-10
          flex
          items-center
          justify-start
        ">

          <p className="
            text-gray-500
            text-lg
          ">
            {
              new Date().toLocaleDateString(
                "ar-EG",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )
            }
          </p>

        </div>

        {/* CONTENT */}

        <div className="p-8">

          {/* HEADER */}

          <div className="mb-10 text-right">

            <h1 className="
              text-6xl
              font-black
              text-[#111827]
              mb-4
            ">
              إدارة الشكاوى
            </h1>

            <p className="
              text-2xl
              text-gray-500
            ">
              متابعة ومعالجة شكاوى
              واستفسارات العملاء
            </p>

          </div>

          {/* STATS */}

          <div className="
            grid
            grid-cols-4
            gap-6
            mb-8
          ">

            {/* TOTAL */}

            <div className="
              bg-white
              rounded-[28px]
              p-6
              shadow-sm
              flex
              items-center
              justify-between
            ">

              <div className="text-right">

                <p className="
                  text-gray-500
                  text-lg
                  mb-2
                ">
                  إجمالي الشكاوى
                </p>

                <h3 className="
                  text-5xl
                  font-black
                ">
                  {stats.total || 0}
                </h3>

              </div>

              <div className="
                w-16
                h-16
                rounded-full
                bg-green-100
                flex
                items-center
                justify-center
              ">

                <AlertCircle
                  color="#16A34A"
                  size={30}
                />

              </div>

            </div>

            {/* NEW */}

            <div className="
              bg-white
              rounded-[28px]
              p-6
              shadow-sm
              flex
              items-center
              justify-between
            ">

              <div className="text-right">

                <p className="
                  text-gray-500
                  text-lg
                  mb-2
                ">
                  شكاوى جديدة
                </p>

                <h3 className="
                  text-5xl
                  font-black
                  text-blue-600
                ">
                  {stats.new || 0}
                </h3>

              </div>

              <div className="
                w-16
                h-16
                rounded-full
                bg-blue-100
                flex
                items-center
                justify-center
              ">

                <AlertCircle
                  color="#2563EB"
                  size={30}
                />

              </div>

            </div>

            {/* PENDING */}

            <div className="
              bg-white
              rounded-[28px]
              p-6
              shadow-sm
              flex
              items-center
              justify-between
            ">

              <div className="text-right">

                <p className="
                  text-gray-500
                  text-lg
                  mb-2
                ">
                  قيد المراجعة
                </p>

                <h3 className="
                  text-5xl
                  font-black
                  text-yellow-600
                ">
                  {stats.pending || 0}
                </h3>

              </div>

              <div className="
                w-16
                h-16
                rounded-full
                bg-yellow-100
                flex
                items-center
                justify-center
              ">

                <Clock3
                  color="#CA8A04"
                  size={30}
                />

              </div>

            </div>

            {/* RESOLVED */}

            <div className="
              bg-white
              rounded-[28px]
              p-6
              shadow-sm
              flex
              items-center
              justify-between
            ">

              <div className="text-right">

                <p className="
                  text-gray-500
                  text-lg
                  mb-2
                ">
                  شكاوى محلولة
                </p>

                <h3 className="
                  text-5xl
                  font-black
                  text-green-600
                ">
                  {stats.resolved || 0}
                </h3>

              </div>

              <div className="
                w-16
                h-16
                rounded-full
                bg-green-100
                flex
                items-center
                justify-center
              ">

                <CheckCircle2
                  color="#16A34A"
                  size={30}
                />

              </div>

            </div>

          </div>

          {/* FILTERS */}

          <div className="
            bg-white
            rounded-[30px]
            shadow-sm
            p-6
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
                  البحث برقم الشكوى،
                  اسم العميل أو الموضوع...
                  "
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
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
                  "
                />

                <Search
                  className="
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                  "
                  size={28}
                  color="#9CA3AF"
                />

              </div>

              {/* FILTER */}

              <div className="
                h-[64px]
                min-w-[220px]
                rounded-2xl
                bg-[#F5F5F5]
                px-5
                flex
                items-center
                gap-3
              ">

                <Filter
                  size={20}
                  color="#9CA3AF"
                />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="
                    bg-transparent
                    outline-none
                    text-lg
                    w-full
                  "
                >

                  <option value="">
                    جميع الحالات
                  </option>

                  <option value="جديدة">
                    جديدة
                  </option>

                  <option value="قيد المراجعة">
                    قيد المراجعة
                  </option>

                  <option value="محلولة">
                    محلولة
                  </option>

                </select>

              </div>
              {/* PRIORITY FILTER */}

<div className="
  h-[64px]
  min-w-[220px]
  rounded-2xl
  bg-[#F5F5F5]
  px-5
  flex
  items-center
  gap-3
">

  <Filter
    size={20}
    color="#9CA3AF"
  />

  <select
    value={priorityFilter}
    onChange={(e) =>
      setPriorityFilter(
        e.target.value
      )
    }
    className="
      bg-transparent
      outline-none
      text-lg
      w-full
    "
  >

    <option value="">
      جميع الأولويات
    </option>

    <option value="عالي">
      عالي
    </option>

    <option value="متوسط">
      متوسط
    </option>

    <option value="منخفض">
      منخفض
    </option>

  </select>

</div>

            </div>

          </div>

          {/* COMPLAINTS */}

          <div className="space-y-6">

            {
              filteredComplaints.map(
                (item) => (

                  <div
   key={item.id}
  className="
    bg-white
    rounded-[28px]
    p-8
    shadow-sm
    border
    border-[#ECECEC]
  "
>

  {/* TOP */}

  <div className="
    flex
    flex-row-reverse
    items-start
    justify-between
    mb-6
  ">

    {/* RIGHT SIDE */}

    <div className="
      flex
      items-center
      gap-3
      min-w-[180px]
    ">

         <p className="
        text-[#9CA3AF]
        text-sm
        whitespace-nowrap
      ">
        {item.date}
      </p>

      <button
  onClick={() =>
    setSelectedComplaint(item)
  }
  className="
    h-[38px]
    px-4
    rounded-xl
    border
    border-[#D1D5DB]
    bg-white
    text-[14px]
    font-bold
    text-[#111827]
    flex
    items-center
    gap-2
    hover:bg-gray-50
    transition-all
  "
>

  <Eye size={15} />

  التفاصيل

</button>

    </div>

    {/* LEFT SIDE */}

    <div className="
      flex-1
      text-right
    ">

      {/* BADGES + TICKET */}

     {/* BADGES + SUBJECT */}

<div className="flex flex-col items-start">

  {/* TOP ROW */}

  <div className="
    flex
    items-center
    gap-2
    mb-2
  ">

    {/* TICKET */}

    <h3 className="
      text-[28px]
      font-black
      text-[#111827]
      leading-none
    ">
      {item.ticket_number}
    </h3>

    {/* PRIORITY */}

    <span className={`
      h-[28px]
      px-3
      rounded-full
      text-[12px]
      font-bold
      flex
      items-center
      justify-center
      ${priorityColor(item.priority)}
    `}>
      {item.priority}
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
      ${statusColor(item.status)}
    `}>
      {item.status}
    </span>

  </div>

  {/* SUBJECT */}

  <h2 className="
    text-[23px]
    font-black
    text-[#111827]
    leading-none
    mt-3
    mb-4
    mr-[145px]
  ">
    {item.subject}
  </h2>

</div>

      {/* INFO */}

      <div className="
        flex
        items-center
        justify-between
        text-[16px]
        text-[#6B7280]
      ">

        {/* CUSTOMER */}

        <p>
          العميل:
          <span className="
            text-[#111827]
            mr-1
            font-medium
          ">
            {item.customer}
          </span>
        </p>

        {/* PROVIDER */}

        <p>
          مقدم الخدمة:
          <span className="
            text-[#111827]
            mr-1
            font-medium
          ">
            {item.provider}
          </span>
        </p>

        {/* ORDER */}

        <p>
          رقم الطلب:
          <span className="
            text-[#111827]
            mr-1
            font-medium
          ">
            {item.order_number}
          </span>
        </p>

      </div>

    </div>

  </div>

  {/* DESCRIPTION */}

  <div className="
    bg-[#F9F9F9]
    rounded-2xl
    p-5
    text-right
    mb-5
  ">

    <h4 className="
      text-[15px]
      font-bold
      text-[#111827]
      mb-3
    ">
      الوصف:
    </h4>

    <p className="
      text-[15px]
      leading-8
      text-[#4B5563]
    ">
      {item.description}
    </p>

  </div>

  {/* RESPONSE */}

  {
    item.response && (

      <div className="
        bg-[#EDF9F0]
        rounded-2xl
        p-5
        text-right
      ">

        <h4 className="
          text-[15px]
          font-bold
          text-[#16A34A]
          mb-3
        ">
          الرد:
        </h4>

        <p className="
          text-[15px]
          leading-8
          text-[#16A34A]
        ">
          {item.response}
        </p>

      </div>

    )
  }

</div>
                )
              )
            }

          </div>

        </div>

      </div>
      {/* DETAILS MODAL */}

{
  selectedComplaint && (

    <div className="
      fixed
      inset-0
      bg-black/40
      z-50
      flex
      items-center
      justify-center
      p-4
    ">

      <div className="
        bg-white
        w-full
        max-w-[580px]
        rounded-[26px]
        p-6
        relative
      ">

        {/* CLOSE */}

<button
  onClick={() =>
    setSelectedComplaint(null)
  }
  className="
    absolute
    top-6
    left-6
    w-10
    h-10
    rounded-full
    bg-[#F3F4F6]
    hover:bg-gray-200
    transition-all
    text-xl
    font-bold
    flex
    items-center
    justify-center
    z-10
  "
>
  ×
</button>

       {/* HEADER */}

<div className="
  mb-6
  text-right
  pl-20
">

  <div className="
    flex
    items-center
    justify-end
    gap-4
    mb-4
  ">

    <span className={`
      h-[28px]
      px-3
      rounded-full
      text-[11px]
      font-bold
      flex
      items-center
      justify-center
      ${priorityColor(
        selectedComplaint.priority
      )}
    `}>
      {selectedComplaint.priority}
    </span>

    <span className={`
      h-[28px]
      px-3
      rounded-full
      text-[11px]
      font-bold
      flex
      items-center
      justify-center
      ${statusColor(
        selectedComplaint.status
      )}
    `}>
      {selectedComplaint.status}
    </span>

  </div>

  <h2 className="
    text-[30px]
    font-black
    text-[#111827]
    mb-2
  ">
    {
      selectedComplaint.subject
    }
  </h2>

  <p className="
    text-gray-500
    text-[15px]
  ">
    رقم التذكرة:
    {" "}
    {
      selectedComplaint.ticket_number
    }
  </p>

</div>

        {/* INFO */}

        <div className="
          grid
          grid-cols-2
          gap-4
          mb-6
        ">

          <div className="
            bg-[#F8F8F8]
            rounded-2xl
            p-4
            text-right
          ">

            <p className="
              text-gray-500
              text-sm
              mb-1
            ">
              العميل
            </p>

            <h4 className="
              text-[17px]
              font-bold
            ">
              {
                selectedComplaint.customer
              }
            </h4>

          </div>

          <div className="
            bg-[#F8F8F8]
            rounded-2xl
            p-4
            text-right
          ">

            <p className="
              text-gray-500
              text-sm
              mb-1
            ">
              مقدم الخدمة
            </p>

            <h4 className="
              text-[17px]
              font-bold
            ">
              {
                selectedComplaint.provider
              }
            </h4>

          </div>

          <div className="
            bg-[#F8F8F8]
            rounded-2xl
            p-4
            text-right
          ">

            <p className="
              text-gray-500
              text-sm
              mb-1
            ">
              رقم الطلب
            </p>

            <h4 className="
              text-[17px]
              font-bold
            ">
              {
                selectedComplaint.order_number
              }
            </h4>

          </div>

          <div className="
            bg-[#F8F8F8]
            rounded-2xl
            p-4
            text-right
          ">

            <p className="
              text-gray-500
              text-sm
              mb-1
            ">
              التاريخ
            </p>

            <h4 className="
              text-[17px]
              font-bold
            ">
              {
                selectedComplaint.date
              }
            </h4>

          </div>

        </div>

        {/* DESCRIPTION */}

        <div className="
          bg-[#F9F9F9]
          rounded-2xl
          p-5
          text-right
          mb-4
        ">

          <h3 className="
            text-lg
            font-black
            mb-3
          ">
            الوصف
          </h3>

          <p className="
            text-gray-600
            leading-8
            text-[15px]
          ">
            {
              selectedComplaint.description
            }
          </p>

        </div>

        {/* RESPONSE */}

        {
          selectedComplaint.response && (

            <div className="
              bg-[#EDF9F0]
              rounded-2xl
              p-5
              text-right
            ">

              <h3 className="
                text-lg
                font-black
                text-[#16A34A]
                mb-3
              ">
                الرد
              </h3>

              <p className="
                text-[#16A34A]
                leading-8
                text-[15px]
              ">
                {
                  selectedComplaint.response
                }
              </p>

            </div>

          )
        }

      </div>

    </div>

  )
}

    </div>

  );

}