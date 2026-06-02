import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    axios.get(`homefix-production-0bc9.up.railway.app/booking/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(res => setBooking(res.data))
    .catch(err => console.log(err));
  }, [id]);

  if (!booking) {
    return <p className="text-center mt-10">جاري تحميل البيانات...</p>;
  }

  return (
    <div className="bg-green-50 min-h-screen" dir="rtl">

      {/* HEADER */}
      <div className="py-16 text-center">
        <h2 className="text-3xl font-bold">
          تفاصيل الحجز
        </h2>

        <p className="text-gray-500 mt-2">
          رقم الحجز:
          <span className="font-medium mr-2">
            {booking.booking_code}
          </span>
        </p>
      </div>

      {/* CARD */}
      <div className="max-w-4xl mx-auto px-6 -mt-10">
        <div className="bg-white rounded-2xl shadow p-6">

          <h3 className="font-bold mb-6 text-right">معلومات الحجز</h3>
          <div className="h-px bg-gray-200 my-6"></div>

          <div className="grid grid-cols-2 gap-6 text-sm text-right">

            <div>
              <p className="text-gray-500">الخدمة</p>
              <p>{booking.service}</p>
            </div>

            <div>
              <p className="text-gray-500">طريقة الدفع</p>
              <p>
                {booking.payment === "cash"
                  ? "نقدًا عند الاستلام"
                  : "دفع إلكتروني"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">التاريخ</p>
              <p>{booking.date}</p>
            </div>

            <div>
              <p className="text-gray-500">الوقت</p>
              <p>{booking.time}</p>
            </div>

            <div>
              <p className="text-gray-500">العنوان</p>
              <p>{booking.address || "لم يتم تحديد العنوان"}</p>
            </div>

            <div>
              <p className="text-gray-500">المدينة</p>
              <p>{booking.city}</p>
            </div>

            <div>
              <p className="text-gray-500">المنطقة</p>
              <p>{booking.area}</p>
            </div>

            <div>
              <p className="text-gray-500">رقم الهاتف</p>
              <p>{booking.phone}</p>
            </div>

          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/my-orders")}
            className="bg-green-600 text-white px-6 py-3 rounded-xl"
          >
            الرجوع لطلباتي
          </button>
        </div>

      </div>
    </div>
  );
}