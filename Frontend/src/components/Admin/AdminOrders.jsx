import React, { useEffect, useState } from "react";

import {
  Search,
  Eye,
  Filter,
  X,
  Calendar,
  ShoppingCart,
  DollarSign,
  CheckCircle,
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";

const API_URL =
  "http://https://homefix-production-0bc9.up.railway.app/admin/orders";

export default function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const [stats, setStats] = useState({});

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  const fetchOrders = async () => {

    try {

      const res = await fetch(API_URL);

      const data = await res.json();

      setOrders(data.orders || []);

      setStats({
        total_orders: data.total_orders,
        active_orders: data.active_orders,
        completed_orders: data.completed_orders,
        total_revenue: data.total_revenue,
      });

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchOrders();

  }, []);

  // =====================================================
  // VIEW ORDER
  // =====================================================

  const handleView = async (id) => {

    try {

      const res = await fetch(
        `${API_URL}/${id}`
      );

      const data = await res.json();

      setSelectedOrder(data);

      setShowModal(true);

    } catch (err) {

      console.log(err);

    }

  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredOrders = orders.filter(
    (order) => {

      const matchesSearch =
        order.order_number
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        order.customer
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        order.provider
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === ""
          ? true
          : order.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );

    }
  );

  const today = new Date().toLocaleDateString(
    "ar-EG",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (

    <div className="min-h-screen bg-[#F5F5F5] flex">

      <AdminSidebar />

      <div className="flex-1">

        {/* DATE */}

        <div className="bg-white border-b border-gray-200 px-8 py-6">

          <p className="text-right text-gray-500 text-lg font-medium">
            {today}
          </p>

        </div>

        <div className="p-8 direction-rtl">

          {/* HEADER */}

          <div className="mb-8 text-right">

            <h1 className="text-[56px] font-black text-[#111827] mb-2">
              إدارة الطلبات
            </h1>

            <p className="text-[#6B7280] text-2xl">
              متابعة وإدارة جميع الطلبات في التطبيق
            </p>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-4 gap-6 mb-8">

            {/* TOTAL */}

            <div className="bg-white rounded-[24px] p-6 shadow-sm flex items-center justify-between">

              <div className="text-right">

                <p className="text-gray-500 text-lg mb-2">
                  إجمالي الطلبات
                </p>

                <h3 className="text-5xl font-black text-[#111827]">
                  {stats.total_orders || 0}
                </h3>

              </div>

              <div className="w-16 h-16 rounded-full bg-[#00B140] flex items-center justify-center">

                <ShoppingCart
                  color="white"
                  size={30}
                />

              </div>

            </div>

            {/* ACTIVE */}

            <div className="bg-white rounded-[24px] p-6 shadow-sm flex items-center justify-between">

              <div className="text-right">

                <p className="text-gray-500 text-lg mb-2">
                  طلبات نشطة
                </p>

                <h3 className="text-5xl font-black text-blue-600">
                  {stats.active_orders || 0}
                </h3>

              </div>

              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">

                <Calendar
                  color="#2563EB"
                  size={30}
                />

              </div>

            </div>

            {/* COMPLETED */}

            <div className="bg-white rounded-[24px] p-6 shadow-sm flex items-center justify-between">

              <div className="text-right">

                <p className="text-gray-500 text-lg mb-2">
                  طلبات مكتملة
                </p>

                <h3 className="text-5xl font-black text-[#00B140]">
                  {stats.completed_orders || 0}
                </h3>

              </div>

              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">

                <CheckCircle
                  color="#00B140"
                  size={30}
                />

              </div>

            </div>

            {/* REVENUE */}

            <div className="bg-white rounded-[24px] p-6 shadow-sm flex items-center justify-between">

              <div className="text-right">

                <p className="text-gray-500 text-lg mb-2">
                  إجمالي الإيرادات
                </p>

                <h3 className="text-5xl font-black text-[#00B140]">
                  {stats.total_revenue || 0} ج.م
                </h3>

              </div>

              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">

                <DollarSign
                  color="#00B140"
                  size={30}
                />

              </div>

            </div>

          </div>

          {/* FILTERS */}

          <div className="bg-white rounded-[30px] shadow-sm p-6 mb-8">

            <div className="flex items-center gap-4">

              {/* SEARCH */}

              <div className="flex-1 relative">

                <input
                  type="text"
                  placeholder="البحث برقم الطلب، اسم العميل أو مقدم الخدمة..."
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

              

              {/* STATUS FILTER */}

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
                    جميع الطلبات
                  </option>

                  <option value="pending">
                    قيد التنفيذ
                  </option>

                  <option value="completed">
                    مكتمل
                  </option>

                  <option value="cancelled">
                    ملغي
                  </option>

                </select>

              </div>

              {/* STATUS FILTER */}

    <div
      className="
        h-[64px]
        min-w-[190px]
        rounded-2xl
        bg-[#F5F5F5]
        px-5
        flex
        items-center
        gap-3
      "
    >

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
          cursor-pointer
        "
      >

        <option value="">
          جميع الحالات
        </option>

        <option value="pending">
          قيد التنفيذ
        </option>

        <option value="completed">
          مكتمل
        </option>

        <option value="cancelled">
          ملغي
        </option>

      </select>

    </div>

            </div>

          </div>

          {/* TABLE */}

          <div className="
            bg-white
            rounded-[30px]
            shadow-sm
            overflow-hidden
          ">

            <div className="
              p-8
              border-b
              text-right
            ">

              <h3 className="
                text-3xl
                font-black
              ">
                قائمة الطلبات
              </h3>

            </div>

            {loading ? (

              <div className="
                text-center
                py-20
                text-2xl
              ">
                جاري التحميل...
              </div>

            ) : (

              <table className="w-full">

                <thead>

                  <tr className="
                    border-b
                    bg-[#FAFAFA]
                    text-right
                  ">

                    <th className="p-6">
                      رقم الطلب
                    </th>

                    <th className="p-6">
                      العميل
                    </th>

                    <th className="p-6">
                      مقدم الخدمة
                    </th>

                    <th className="p-6">
                      الخدمة
                    </th>

                    <th className="p-6">
                      التاريخ
                    </th>

                    <th className="p-6">
                      المبلغ
                    </th>

                    <th className="p-6">
                      حالة الطلب
                    </th>

                    <th className="p-6">
                      حالة الدفع
                    </th>

                    <th className="p-6">
                      إجراءات
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredOrders.map(
                    (order) => (

                      <tr
                        key={order.id}
                        className="
                          border-b
                          hover:bg-[#FAFAFA]
                          transition
                        "
                      >

                        <td className="p-6 font-bold">
                          {order.order_number}
                        </td>

                        <td className="p-6">
                          {order.customer}
                        </td>

                        <td className="p-6">
                          {order.provider}
                        </td>

                        <td className="p-6">
                          {order.service}
                        </td>

                        <td className="p-6 text-gray-500">
                          {order.date}
                        </td>

                        <td className="
                          p-6
                          font-black
                          text-xl
                        ">
                          {order.amount} ج.م
                        </td>

                        <td className="p-6">

                          <span
                            className={`
                              px-4
                              py-2
                              rounded-full
                              text-sm
                              font-bold

                              ${
                                order.status ===
                                "completed"
                                  ? "bg-green-100 text-green-700"
                                  : order.status ===
                                    "pending"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-red-100 text-red-700"
                              }
                            `}
                          >

                            {
                              order.status ===
                              "completed"
                                ? "مكتمل"
                                : order.status ===
                                  "pending"
                                ? "قيد التنفيذ"
                                : "ملغي"
                            }

                          </span>

                        </td>

                        <td className="p-6">

                          <span
                            className={`
                              px-4
                              py-2
                              rounded-full
                              text-sm
                              font-bold

                              ${
                                order.payment_status ===
                                "مدفوع"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }
                            `}
                          >

                            {
                              order.payment_status
                            }

                          </span>

                        </td>

                        <td className="p-6">

                          <button
                            onClick={() =>
                              handleView(
                                order.id
                              )
                            }
                            className="
                              hover:scale-110
                              transition
                            "
                          >

                            <Eye size={22} />

                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            )}

          </div>

          {/* MODAL */}

          {showModal &&
            selectedOrder && (

            <div className="
              fixed inset-0
              bg-black/40
              flex items-center
              justify-center
              z-50
            ">

              <div className="
                bg-white
                w-full
                max-w-[620px]
                rounded-[24px]
                p-8
                relative
                shadow-2xl
              ">

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="
                    absolute
                    left-6
                    top-6
                  "
                >

                  <X />

                </button>

                <div className="
                  text-right
                  mb-8
                ">

                  <h2 className="
                    text-4xl
                    font-black
                    mb-2
                  ">
                    تفاصيل الطلب{" "}
                    {
                      selectedOrder.order_number
                    }
                  </h2>

                  <p className="
                    text-gray-500
                    text-lg
                  ">
                    معلومات تفصيلية عن الطلب
                  </p>

                </div>

                <div className="
                  grid
                  grid-cols-2
                  gap-10
                  text-right
                ">

                  <div className="space-y-6">

                    <div>

                      <p className="
                        text-gray-500
                        mb-1
                      ">
                        العميل
                      </p>

                      <h4 className="
                        font-black
                        text-2xl
                      ">
                        {
                          selectedOrder.customer
                        }
                      </h4>

                    </div>

                    <div>

                      <p className="
                        text-gray-500
                        mb-1
                      ">
                        الخدمة
                      </p>

                      <h4 className="
                        font-black
                        text-2xl
                      ">
                        {
                          selectedOrder.service
                        }
                      </h4>

                    </div>

                    <div>

                      <p className="
                        text-gray-500
                        mb-1
                      ">
                        الموقع
                      </p>

                      <h4 className="
                        font-black
                        text-2xl
                      ">
                        {
                          selectedOrder.location
                        }
                      </h4>

                    </div>

                  </div>

                  <div className="space-y-6">

                    <div>

                      <p className="
                        text-gray-500
                        mb-1
                      ">
                        مقدم الخدمة
                      </p>

                      <h4 className="
                        font-black
                        text-2xl
                      ">
                        {
                          selectedOrder.provider
                        }
                      </h4>

                    </div>

                    <div>

                      <p className="
                        text-gray-500
                        mb-1
                      ">
                        التاريخ
                      </p>

                      <h4 className="
                        font-black
                        text-2xl
                      ">
                        {
                          selectedOrder.date
                        }
                      </h4>

                    </div>

                    <div>

                      <p className="
                        text-gray-500
                        mb-1
                      ">
                        المبلغ
                      </p>

                      <h4 className="
                        font-black
                        text-[#00B140]
                        text-3xl
                      ">
                        {
                          selectedOrder.amount
                        }{" "}
                        ج.م
                      </h4>

                    </div>

                  </div>

                </div>

                <div className="
                  mt-10
                  flex justify-start
                ">

                  <button
                    onClick={() =>
                      setShowModal(false)
                    }
                    className="
                      border
                      h-[52px]
                      px-8
                      rounded-2xl
                      font-bold
                    "
                  >
                    إغلاق
                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}