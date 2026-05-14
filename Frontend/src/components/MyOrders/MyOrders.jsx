import { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "../OrderCard/OrderCard";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios.get("http://localhost:5000/my-orders", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then(res => setOrders(res.data))
    .catch(err => console.log(err));
  }, []);

  // ✅ فلترة الطلبات
  const filteredOrders = orders.filter(order => {
    if (filter === "pending") return order.status === "pending";
    if (filter === "completed") return order.status === "completed";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#E5E7EB] p-8" dir="rtl">

      {/* العنوان */}
      <h2 className="text-3xl font-bold mb-4 text-right">
        طلباتي
      </h2>

      {/* الفلاتر */}
      <div className="flex justify-start gap-3 mb-10">

        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-xl ${
            filter === "all"
              ? "bg-green-600 text-white"
              : "bg-gray-100"
          }`}
        >
          الكل ({orders.length})
        </button>

        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded-xl ${
            filter === "pending"
              ? "bg-green-600 text-white"
              : "bg-gray-100"
          }`}
        >
          جارية ({orders.filter(o => o.status === "pending").length})
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-xl ${
            filter === "completed"
              ? "bg-green-600 text-white"
              : "bg-gray-100"
          }`}
        >
          مكتملة ({orders.filter(o => o.status === "completed").length})
        </button>

      </div>

      {/* الكروت */}
      <div className="flex flex-col gap-6">
        {filteredOrders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

    </div>
  );
}

export default MyOrders;