import { useNavigate } from "react-router-dom";

function OrderCard({ order }) {

  const navigate = useNavigate();

  const getStatusText = () => {
    if (order.status === "pending") return "قيد التنفيذ";
    if (order.status === "completed") return "مكتمل";
    return "جارية";
  };

  const getStatusStyle = () => {
    if (order.status === "completed")
      return "bg-green-100 text-green-600";
    if (order.status === "pending")
      return "bg-blue-100 text-blue-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-6 mb-6 flex justify-between items-center">
      
      {/* RIGHT (details) */}
      <div className="text-right flex flex-col gap-2">

        <div className="flex items-center gap-2 justify-end">
          <h3 className="text-xl font-bold">
            {order.service}
          </h3>

          <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle()}`}>
            {getStatusText()}
          </span>
        </div>

        <p className="text-gray-500 text-sm">
          رقم الطلب: #{order.id.toString().padStart(3, "0")}
        </p>

        <p className="text-gray-600">
          الفني: {order.provider}
        </p>

        <p className="text-gray-600">
          {order.date}
        </p>

        <p className="text-gray-500 text-sm">
          {order.location}
        </p>
      </div>

      {/* LEFT (price + rating) */}
      <div className="flex flex-col gap-2">
        <h2 className="text-green-600 text-3xl font-bold">
          {order.price} ج.م
        </h2>

        {order.rating > 0 && (
          <div className="text-yellow-400 text-lg">
            {"★".repeat(order.rating)}
            {"☆".repeat(5 - order.rating)}
          </div>
        )}

        <button
  onClick={() => navigate(`/booking-details/${order.booking_id}`)}
  className="mt-2 border px-4 py-1 rounded-lg text-sm hover:bg-gray-100"
>
  عرض التفاصيل
</button>
      </div>

      
    </div>
  );
}

export default OrderCard;