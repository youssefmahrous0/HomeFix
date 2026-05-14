import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ServiceOrderDetailsPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  useEffect(() => {

    axios.get(`http://localhost:5000/booking/${id}`, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setBooking(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  }, [id]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        جاري التحميل...
      </div>
    );
  }

  const provider = booking.provider || {};

  const statusSteps = [
  {
    title: "تم إنشاء الطلب",
    time: booking?.status_times?.scheduled,
    done: true,
  },

  {
    title: "تم قبول الطلب",
    time: booking?.status_times?.accepted,
    done:
      booking.status === "accepted" ||
      booking.status === "on_the_way" ||
      booking.status === "arrived" ||
      booking.status === "done",
  },

  {
    title: "جاري التنفيذ",
    time: booking?.status_times?.on_the_way,
    current:
      booking.status === "on_the_way" ||
      booking.status === "arrived",
  },

  {
    title: "مكتمل",
    time: booking?.status_times?.done,
    done: booking.status === "done",
  },
];

  const formatTime = (dateString) => {

    if (!dateString) return "منتظر";

    const date = new Date(dateString);

    return date.toLocaleString("ar-EG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (

    <div className="min-h-screen bg-[#f5f5f5]" dir="rtl">

      {/* PAGE */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* TOP */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">

          {/* RIGHT */}
          <div>

            <button
              onClick={() => navigate(-1)}
              className="text-gray-500 mb-5 flex items-center gap-2"
            >
              ← العودة للطلبات
            </button>

            <h2 className="text-4xl font-bold text-gray-700 mb-3">
              {booking.service}
            </h2>

            <div className="flex items-center gap-3">

              <p className="text-gray-500 text-lg">
                رقم الطلب: {booking.booking_code}
              </p>

              <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
                {booking.status === "pending" && "قيد المراجعة"}
                {booking.status === "accepted" && "تم القبول"}
                {booking.status === "on_the_way" && "قيد التنفيذ"}
                {booking.status === "arrived" && "وصل الفني"}
                {booking.status === "done" && "مكتمل"}
              </span>

            </div>

          </div>

          {/* LEFT */}
          <div className="text-right lg:text-left">

            <p className="text-gray-500 text-lg mb-2">
              المبلغ الإجمالي
            </p>

            <h3 className="text-5xl font-black text-green-600">
              {provider.price || booking.price || 0} ج.م
            </h3>

          </div>

        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-8">

            {/* STATUS */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8">

              <h3 className="text-3xl font-bold mb-10 text-left">
                حالة الطلب
              </h3>

              <div className="relative">

                <div className="absolute right-5 top-3 bottom-3 w-1 bg-gray-200 rounded-full"></div>

                <div className="space-y-12">

                  {statusSteps.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-start justify-between relative"
                    >

                      <div className="flex items-start gap-5">

                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white relative z-10
                          
                          ${
                            item.done
                              ? "bg-green-500"
                              : item.current
                              ? "bg-blue-500"
                              : "bg-gray-300"
                          }
                          
                          `}
                        >
                          ✓
                        </div>

                        <div>

                          <h4
                            className={`text-2xl font-bold mb-2
                            
                            ${
                              item.done
                                ? "text-green-600"
                                : item.current
                                ? "text-blue-600"
                                : "text-gray-400"
                            }
                            
                            `}
                          >
                            {item.title}
                          </h4>

                          <p className="text-gray-500 text-lg">
                            {formatTime(item.time)}
                          </p>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* DETAILS */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8">

              <h3 className="text-4xl font-bold mb-10 text-left">
                تفاصيل الخدمة
              </h3>

              <div className="flex flex-col gap-8 mb-10">

                <div>

                  <p className="text-gray-500 mb-2">
                    📅 التاريخ والوقت
                  </p>

                  <h4 className="font-bold text-2xl">
                    {booking.date} - {booking.time}
                  </h4>

                </div>

                <div>

                  <p className="text-gray-500 mb-2">
                    📍 العنوان
                  </p>

                  <h4 className="font-bold text-2xl leading-10">
                    {booking.address}
                  </h4>

                </div>

              </div>


              <div className="border-t border-gray-200 pt-8 mb-8">

                <p className="text-gray-500 mb-3 text-lg">
                  الوصف
                </p>

                <p className="leading-10 text-gray-700 text-lg">
                  {booking.notes || "لا يوجد وصف"}
                </p>

              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">

                <p className="text-yellow-700 font-bold mb-2 text-lg">
                  ملاحظات
                </p>

                <p className="text-gray-700 text-lg">
                  يرجي الاتصال قبل الزيارةب 30 دقيقة
                </p>

              </div>

            </div>

            {/* PAYMENT */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8">

              <h3 className="text-4xl font-bold mb-10">
                تفاصيل الدفع
              </h3>

              <div className="space-y-6 text-xl">

                <div className="flex items-center justify-between">

                  <span className="text-gray-500">
                    سعر الخدمة
                  </span>

                  <span>
                    {provider.price || booking.price || 0} ج.م
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-gray-500">
                    رسوم الخدمة
                  </span>

                  <span>
                    0 ج.م
                  </span>

                </div>

                <div className="border-t border-gray-200 pt-6 flex items-center justify-between">

                  <span className="text-3xl font-bold">
                    الإجمالي
                  </span>

                  <span className="text-5xl font-black text-green-600">
                    {provider.price || booking.price || 0} ج.م
                  </span>

                </div>

                <div className="text-gray-500 mt-4">
                  💵 {booking.payment || "الدفع عند الاستلام"}
                </div>

              </div>

            </div>

          </div>

          {/* LEFT SIDE */}
          <div className="space-y-6">

            {/* PROVIDER */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6">

              <h3 className="text-2xl font-bold mb-6">
                مقدم الخدمة
              </h3>

              <div className="flex items-center gap-5 mb-6">

  {/* ICON */}
  <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-4xl text-white flex-shrink-0">
    👨‍🔧
  </div>

  {/* INFO */}
  <div className="text-right">

    <h4 className="font-bold text-2xl mb-2">
      {provider.name || "غير متوفر"}
    </h4>

    <div className="flex items-center gap-2 text-yellow-500 mb-2">
      ⭐ <span className="text-gray-700">4.8</span>
    </div>

    <p className="text-gray-500">
      127 طلب مكتمل
    </p>

  </div>

</div>

              <div className="space-y-4 border-t border-gray-200 pt-6">

  {/* PHONE */}
  <div className="flex items-center justify-between text-gray-600">

    {/* NUMBER + ICON */}
    <div className="flex items-center gap-2">

      <span className="text-lg">
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.8"
  stroke="currentColor"
  className="w-6 h-6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M2.25 4.5c0-1.243 1.007-2.25 2.25-2.25h2.1c.966 0 1.813.617 2.118 1.535l.764 2.292a2.25 2.25 0 01-.516 2.32l-1.21 1.21a16.036 16.036 0 006.786 6.786l1.21-1.21a2.25 2.25 0 012.32-.516l2.292.764A2.25 2.25 0 0121.75 17.4v2.1c0 1.243-1.007 2.25-2.25 2.25h-.75C9.663 21.75 2.25 14.337 2.25 5.25V4.5z"
  />
</svg>
      </span>

      <span>
        {booking.phone || "01000000000"}
      </span>

    </div>

  </div>

  {/* EMAIL */}
  <div className="flex items-center justify-between text-gray-600">

    {/* EMAIL + ICON */}
    <div className="flex items-center gap-2">
       
        <span className="text-lg">
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.8"
  stroke="currentColor"
  className="w-6 h-6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5A2.25 2.25 0 002.25 6.75m19.5 0v.243a2.25 2.25 0 01-.97 1.852l-7.5 5.25a2.25 2.25 0 01-2.56 0l-7.5-5.25a2.25 2.25 0 01-.97-1.852V6.75"
  />
</svg>
        </span>

      <span>
        {booking.email || "user@email.com"}
      </span>

    </div>

  </div>

</div>
              <button className="mt-8 w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-2xl font-bold text-lg">
                اتصل الآن
              </button>

            </div>

            {/* ACTIONS */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6">

              <h3 className="text-2xl font-bold mb-6">
                الإجراءات
              </h3>

              <div className="space-y-4">

                <button
                  onClick={() => navigate(`/tracking/${booking.id}`)}
                  className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-2xl font-bold"
                >
                  تتبع الطلب الآن
                </button>

                <button className="w-full border border-gray-300 py-3 rounded-2xl font-medium hover:bg-gray-50 transition">
                  مراسلة مقدم الخدمة
                </button>

                <button
  onClick={async () => {

    try {

      await axios.put(
        `http://localhost:5000/cancel/${booking.id}`,
        {},
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      alert("تم إلغاء الطلب بنجاح");

      navigate("/servicesProviderPage");

    } catch (err) {

      console.log(err);

      alert("حدث خطأ أثناء إلغاء الطلب");

    }

  }}
  className="w-full border border-red-200 text-red-500 py-3 rounded-2xl font-medium hover:bg-red-50 transition"
>
  إلغاء الطلب
</button>

              </div>

            </div>

            {/* HELP */}
            <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 text-center">

              <h3 className="text-2xl font-bold mb-4">
                تحتاج مساعدة؟
              </h3>

              <p className="text-gray-600 mb-6 leading-8">
                فريق الدعم متاح لمساعدتك في أي استفسار
              </p>

              <button className="bg-white hover:bg-gray-50 transition border border-gray-200 px-6 py-3 rounded-2xl w-full font-bold">
                تواصل مع الدعم
              </button>

            </div>

          </div>
          
        </div>

      </div>

    </div>
  );
}