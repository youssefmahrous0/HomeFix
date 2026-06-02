import { useNavigate, useParams  } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingSuccess() {
  const navigate = useNavigate();
  const { id } = useParams();

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
    return <p className="text-center mt-10">جاري التحميل...</p>;
  }

const provider = booking.provider || {};

  return (
    <div className="bg-green-50 min-h-screen" dir="rtl">

      {/* ================= HEADER ================= */}
      <div className="bg-green-50 py-16 text-center">

        {/* ICON */}
        <div className="bg-green-100 w-24 h-24 mx-auto rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 12l3 3 7-7" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold mt-6">
          تم تأكيد حجزك بنجاح!
        </h2>

        <p className="text-gray-500 mt-2">
  رقم الحجز:{" "}
  <span className="font-medium">
    {booking.booking_code} 
  </span>
</p>
      </div>

      {/* ================= CARD ================= */}
      <div className="max-w-4xl mx-auto px-6 -mt-10">

        <div className="bg-white rounded-2xl shadow p-6">

          <h3 className="font-bold mb-6 text-right">تفاصيل الحجز</h3>
          <div className="h-px bg-gray-200 my-6"></div>
          {/* PROVIDER */}
          <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center mb-6">

          {/* Right */}
         <div className="flex items-center gap-3">

            <div className="bg-green-600 text-white w-12 h-12 flex items-center justify-center rounded-full">
               {provider.name?.[0]}
            </div>

           <div className="text-right">
              <p className="font-bold">{provider.name}</p>
              <p className="text-sm text-gray-500"> {booking.job || booking.service} </p>
             </div>
           </div>

          {/* Left */}
          <a  href={`tel:${booking.phone}`}  className="bg-white border px-4 py-2 rounded-lg text-sm flex items-center gap-2" >
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             d="M3 5a2 2 0 012-2h2l2 5-2 2a16 16 0 007 7l2-2 5 2v2a2 2 0 01-2 2h-1C10 21 3 14 3 6V5z" />
            </svg>
             اتصل
           </a>
         </div>
          {/* DETAILS */}
          <div className="grid grid-cols-2 gap-6 text-sm text-right">

            <div>
              <p className="text-gray-500 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 d="M9 12h6M9 16h6M9 8h6M7 4h6l4 4v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
                </svg> الخدمة
              </p>
              <p>{booking.service}</p>
            </div>

            <div>
              <p className="text-gray-500 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
                 <path strokeWidth="2" d="M2 10h20" />
                </svg> طريقة الدفع
              </p>
              <p> {booking.payment === "cash" ? "نقدًا عند الاستلام" : "دفع إلكتروني"} </p>
            </div>

            <div>
              <p className="text-gray-500 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
                 <path strokeWidth="2" d="M16 2v4M8 2v4M3 10h18" />
               </svg> التاريخ
              </p>
              <p>{booking.date}</p>
            </div>

            <div>
              <p className="text-gray-500 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <circle cx="12" cy="12" r="10" strokeWidth="2" />
                 <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                </svg>الوقت
              </p>
              <p>{booking.time}</p>
            </div>

            <div>
              <p className="text-gray-500 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  d="M12 21s-6-5.5-6-10a6 6 0 1112 0c0 4.5-6 10-6 10z" />
                  <circle cx="12" cy="11" r="2" strokeWidth="2" />
                </svg> العنوان
              </p>
              <p>{booking.address || "لم يتم تحديد العنوان"}</p>
            </div>

            <div>
              <p className="text-gray-500 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h2l2 5-2 2a16 16 0 007 7l2-2 5 2v2a2 2 0 01-2 2h-1C10 21 3 14 3 6V5z" />
                 </svg> رقم الهاتف
              </p>
              <p>{booking.phone}</p>
            </div>
              
               {/* PRICE */}
            <div>
              <p className="text-gray-500 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
                 <path strokeWidth="2" d="M2 10h20" />
                </svg> المبلغ الأجمالي
              </p>
              <p> {provider.price + 30} جنيه </p>
            </div>

          </div>

          
        </div>

        {/* ================= NOTES ================= */}
     <div className="bg-blue-50 p-6 rounded-xl mt-6 text-sm space-y-3 text-left">
       {/* العنوان */}
         <div className="flex items-center gap-2 mb-4">
          <h4 className="font-bold text-gray-700"> ملاحظات هامة </h4>
        </div>

       {/* العناصر */}
       <div className="space-y-3 text-sm text-gray-600">

      <div className="flex items-start gap-2">
       <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <circle cx="12" cy="12" r="10" strokeWidth="2" />
         <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 12l3 3 7-7" />
       </svg>
       <span>سيتواصل معك الفني قبل الموعد بـ 30 دقيقة للتأكيد</span>
     </div>

     <div className="flex items-start gap-2">
       <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <circle cx="12" cy="12" r="10" strokeWidth="2" />
         <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 12l3 3 7-7" />
       </svg>
       <span>يمكنك إلغاء أو تعديل الحجز مجانًا قبل 24 ساعة من الموعد</span>
     </div>

     <div className="flex items-start gap-2">
       <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <circle cx="12" cy="12" r="10" strokeWidth="2" />
         <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 12l3 3 7-7" />
       </svg>
       <span>تم إرسال تفاصيل الحجز إلى بريدك الإلكتروني</span>
     </div>

     <div className="flex items-start gap-2">
       <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <circle cx="12" cy="12" r="10" strokeWidth="2" />
         <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 12l3 3 7-7" />
       </svg>
       <span>يمكنك متابعة حالة الطلب من خلال حسابك</span>
     </div>

  </div>
</div>

        {/* ================= BUTTONS ================= */}
        <div className="mt-10 pb-20">

  {/* Buttons */}
  <div className="grid grid-cols-2 gap-4">

    <button onClick={() => navigate(`/tracking/${id}`)} className="bg-green-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition">
      <svg className="w-6 h-6 text-white-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        d="M22 2L11 13" />
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        d="M22 2L15 22l-4-9-9-4 20-7z" />
     </svg>
      تتبع الطلب الآن
    </button>

    <button onClick={() => navigate("/my-orders")} className="border py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
         d="M7 7h10M7 11h10M7 15h6M6 3h7l5 5v13a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" />
      </svg>
      عرض جميع طلباتي
    </button>

    <button onClick={() => navigate("/")} className="border py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
         d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5v-6h4v6h5a1 1 0 001-1V10" />
      </svg>
      العودة للرئيسية
    </button>

    <button className="border py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.8-4A7.8 7.8 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      تواصل معنا
    </button>

  </div>

  {/* Support Box */}
  <div className="mt-6 bg-gray-100 rounded-xl p-4 text-center text-sm text-gray-600">

    <p className="mb-1">هل تحتاج مساعدة؟</p>

    <p>
      تواصل مع خدمة العملاء على{" "}
      <span className="text-green-600 font-medium">16666</span>
      {" "}أو عبر{" "}
      <span className="text-green-600 font-medium">support@homefix.com</span>
    </p>

  </div>

</div>




      </div>
    </div>
  );
}