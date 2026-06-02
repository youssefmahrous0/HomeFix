import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { MapContainer, TileLayer, Marker, Polyline , useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Swal from "sweetalert2";

function RecenterMap({ lat, lng }) {
  const map = useMap();

  useEffect(() => {
    if (lat != null && lng != null) {
  map.flyTo([lat, lng], map.getZoom(), {
    duration: 1.5,
  });
}
  }, [lat, lng]);

  return null;
}


import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import icon2x from "leaflet/dist/images/marker-icon-2x.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon2x,
  iconUrl: icon,
  shadowUrl: shadow,
});

// 🔥 حساب المسافة (لازم فوق الكومبوننت)
function calcDistance(lat1, lon1, lat2, lon2) {
  lat1 = Number(lat1);
  lon1 = Number(lon1);
  lat2 = Number(lat2);
  lon2 = Number(lon2);

  if ([lat1, lon1, lat2, lon2].some(v => isNaN(v))) {
    return null;
  }

  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) *
    Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

//  الوقت حالة الطلب 
function formatTime(dateString) {
  if (!dateString) return "منتظر";

  const date = new Date(dateString);

  return date.toLocaleTimeString("ar-EG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// ⏰ تنسيق موعد الحجز
function formatBookingTime(timeString) {
  if (!timeString) return "--";

  try {
    // لو الوقت جاي 24 ساعة
    const [hour, minute] = timeString.split(":");

    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);

    return date.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Africa/Cairo",
    });

  } catch {
    return timeString;
  }
}

// دقائق الي ساعات
function formatETA(minutes) {
  if (!minutes && minutes !== 0) return "--";

  if (minutes < 60) {
    return `${minutes} دقيقة`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) {
    return `ساعة ${hours === 1 ? "" : hours}`.trim();
  }

  return `${hours} ساعة و ${mins} دقيقة`;
}

export default function TrackingPage() {


  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [providerLoc, setProviderLoc] = useState(null);
  const [fullRoute, setFullRoute] = useState([]);
  const [currentRoute, setCurrentRoute] = useState([]);  
  const [eta, setEta] = useState(null);
  const [distance, setDistance] = useState(null);
  const navigate = useNavigate();

  const steps = [
  { key: "pending", label: "تم تأكيد الطلب", icon: 
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <circle cx="12" cy="12" r="9" strokeWidth="2"/>
     <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
     , desc: "تم استلام طلبك بنجاح" },
  { key: "on_the_way", label: "الفني في الطريق", icon: 
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       d="M3 7h13v8H3z" />
       <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       d="M16 10h3l2 3v2h-5v-5z" /> <circle cx="7.5" cy="17" r="1.5" /> <circle cx="17.5" cy="17" r="1.5" />
       </svg>, desc: "الفني متجه إليك الآن" },
  { key: "arrived", label: "وصول الفني", icon: 
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       d="M3 11l18-8-8 18-2-8-8-2z" />
       </svg>, desc: "سيصل في الوقت المحدد" },
  { key: "done", label: "اكتمال الخدمة", icon: 
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        d="M3 7l9-4 9 4-9 4-9-4z" />
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        d="M3 7v10l9 4 9-4V7" />
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        d="M12 11v10" />
      </svg>, desc: "تم إنهاء الخدمة" }
 ];

   
 const statusTimes = booking?.status_times || {};


  // 🔥 socket
  useEffect(() => {
  const socket = io("homefix-production-0bc9.up.railway.app");
  const user_id = localStorage.getItem("user_id"); // لازم يكون متخزن
  // 🔥 أهم سطر
   socket.emit("join_booking", { booking_id: id });
   socket.emit("join", { user_id });
   socket.on("receive_location", (data) => {
  if (Number(data.booking_id) === Number(id)) {
    const newLat = Number(data.lat);
    const newLng = Number(data.lng);

    setProviderLoc({ lat: newLat, lng: newLng });
     // 🔥 أهم حاجة: تحديث الحالة
    // ✅ الحالة
    if (data.status) {

  setBooking(prev => {

    const updatedStatusTimes = {
      ...(prev?.status_times || {})
    };

    // ⏰ سجل وقت الحالة الجديدة
    if (!updatedStatusTimes[data.status]) {
      updatedStatusTimes[data.status] =
        new Date().toISOString();
    }

    return {
      ...prev,
      status: data.status,
      status_times: updatedStatusTimes
    };
  });

}

    // ✅ ETA من الباك (أهم سطر)
    if (data.eta !== undefined) {
      setEta(data.eta);
    }
    if (data.distance !== undefined) {
      setDistance(data.distance);
    }

   // 🔥 قص الطريق
      setCurrentRoute(prev => {
        if (!prev.length) return prev;

        let closestIndex = 0;
        let minDist = Infinity;

        for (let i = 0; i < prev.length; i++) {
          const point = prev[i];
          const d = calcDistance(newLat, newLng, point[0], point[1]);

          if (d < minDist) {
            minDist = d;
            closestIndex = i;
          }
        }

        const newRoute = prev.slice(closestIndex);
        return [[newLat, newLng], ...newRoute];
      });
    }
  });

  return () => socket.disconnect();
}, [id]);


useEffect(() => {
  if (booking?.lat && providerLoc?.lat && fullRoute.length === 0) {
    const getRoute = async () => {
      try {
        const res = await axios.get(
          `https://router.project-osrm.org/route/v1/driving/${providerLoc.lng},${providerLoc.lat};${booking.lng},${booking.lat}?overview=full&geometries=geojson`
        );

        const coords = res.data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);

        setFullRoute(coords);
        setCurrentRoute(coords);
      } catch (err) {
        console.log("route error", err);
      }
    };

    getRoute();
  }
}, [booking, providerLoc]);
    
   

  // 🔥 get booking
  useEffect(() => {
  axios.get(`homefix-production-0bc9.up.railway.app/booking/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
  .then(res => {
     setBooking(res.data);
     console.log(res.data);
     console.log("BOOKING LOCATION:", res.data.lat, res.data.lng);
     console.log(
  "PROVIDER LOCATION:",
  res.data.provider_location?.lat,
  res.data.provider_location?.lng
);

  // 📍 أول موقع للفني
  if (res.data.provider_location) {

    setProviderLoc({
      lat: Number(res.data.provider_location.lat),
      lng: Number(res.data.provider_location.lng),
    });

  }

  // ⏱️ ETA
  if (res.data.eta !== undefined) {
    setEta(res.data.eta);
  }

  // 📏 distance
  if (res.data.distance !== undefined) {
    setDistance(res.data.distance);
  }
  })
  .catch(err => console.log("❌ ERROR:", err));
}, [id]);

  if (!booking) return <p className="text-center mt-10">جاري التحميل...</p>;

  const provider = booking.provider || {};
  const status = booking.status;
  const currentStepIndex =
  steps.findIndex(s => s.key === status) !== -1
    ? steps.findIndex(s => s.key === status)
    : 0;


  return (
    <div className="bg-gray-50 min-h-screen p-6" dir="rtl">

      {/* HEADER */}
      <div className="mb-6 space-y-4">

  {/* TOP BAR */}
  <div className="flex justify-between items-center">

  {/* العودة للطلبات (هتبقى شمال) */}
  <button
    onClick={() => window.history.back()}
    className="text-gray-500 flex items-center gap-2"
  >
    ← العودة للطلبات
  </button>

  {/* البادج (هتبقى يمين) */}
  <div className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="9" strokeWidth="2"/>
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        d="M12 7v5l3 3" />
       </svg> الوصول خلال {formatETA(eta)} 
</div>

</div>
  {/* TITLE */}
  <div className="text-right">
    <h2 className="text-2xl font-bold">تتبع الطلب</h2>
    <p className="text-gray-500">
      رقم الطلب: {booking.booking_code}
    </p>
  </div>

</div>

      <div className="flex flex-col md:flex-row-reverse gap-6">

        {/* RIGHT CARD */}
       <div className="max-w-5xl mx-auto px-4 space-y-6">

  {/* ================= الفني ================= */}
  <div className="bg-white rounded-xl shadow p-6 space-y-4">

    <h3 className="font-bold text-gray-700">معلومات الفني</h3>

   <div className="flex items-center gap-5">

  {/* avatar */}
  <div className="bg-green-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-lg flex-shrink-0">
    {provider.name?.[0]}
  </div>

  {/* info */}
  <div className="flex flex-col">

    {/* الاسم */}
    <p className="font-bold text-base leading-tight">
      {provider.name}
    </p>

    {/* الوظيفة تحت الاسم */}
    <p className="text-sm text-gray-500 leading-tight mt-1">
      {booking.service}
    </p>

    {/* التقييم */}
    <div className="flex items-center gap-1 text-sm mt-2 text-yellow-500">
      ⭐ 4.9 <span className="text-gray-400">(120)</span>
    </div>

  </div>

</div>

    {/* buttons */}
    <button className="bg-green-600 text-white w-full py-2 rounded-lg flex items-center justify-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.516 2.064a2 2 0 01-.45 1.85l-1.27 1.27a16.06 16.06 0 006.586 6.586l1.27-1.27a2 2 0 011.85-.45l2.064.516A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg> اتصل بالفني
    </button>

    <button className="border w-full py-2 rounded-lg flex items-center justify-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       d="M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1-3.5A7.8 7.8 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg> واتساب
    </button>

  {/* 🔹 المسافة + الوقت */}
<div className="border-t border-gray-300 my-6 pt-4 text-sm text-gray-500 space-y-2">

  {/* 📍 المسافة */}
  <div className="flex items-center gap-2 justify-start">
     <span>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z" />
          <circle cx="12" cy="11" r="2.5" />
        </svg>
     </span>
    <span>
      {distance != null
  ? `على بعد ${distance.toFixed(2)} كم`
  : "جاري تحديد الموقع..."}
    </span>
  </div>

  {/* ⏱️ الوقت */}
  <div className="flex items-center gap-2 justify-start">
    <span>
       <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="9" strokeWidth="2"/>
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        d="M12 7v5l3 3" />
       </svg>
    </span>
    <span>
      {eta !== null ? `وقت الوصول: ${formatETA(eta)}` : "--"}
    </span>
  </div>

</div>

  </div>


  {/* ================= الإجراءات ================= */}
  <div className="bg-white rounded-xl shadow p-6 space-y-3">

    <h3 className="font-bold text-gray-700">إجراءات</h3>

    <button
  onClick={() => navigate(`/ServiceOrderDetailsPage/${id}`)}
  className="border w-full py-2 rounded-lg"
>
  عرض تفاصيل الطلب
</button>

    <button
  onClick={async () => {

    const result = await Swal.fire({
  title: "هل تريد إلغاء الطلب؟",
  text: "لا يمكن التراجع بعد الإلغاء",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "نعم، إلغاء الطلب",
  cancelButtonText: "رجوع",
  confirmButtonColor: "#ef4444",
  cancelButtonColor: "#6b7280",
});

if (!result.isConfirmed) return;

    try {
  await axios.put(
    `homefix-production-0bc9.up.railway.app/cancel/${id}`,
    {},
    {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  await Swal.fire({
    icon: "success",
    title: "تم إلغاء الطلب",
    text: "تم إلغاء الطلب بنجاح",
    confirmButtonText: "حسناً",
    confirmButtonColor: "#16a34a",
  });

  navigate("/servicesProviderPage");

} catch (err) {
  console.log(err);

  Swal.fire({
    icon: "error",
    title: "حدث خطأ",
    text: "فشل إلغاء الطلب",
    confirmButtonText: "إغلاق",
  });
}

  }}
  className="border border-red-500 text-red-500 w-full py-2 rounded-lg"
>
  إلغاء الطلب
</button>

    <button className="border w-full py-2 rounded-lg">
      تواصل مع الدعم
    </button>

  </div>


  {/* ================= الدعم ================= */}
  <div className="bg-blue-50 rounded-xl p-6 text-center space-y-3">

    <h3 className="font-bold text-gray-700">هل تحتاج مساعدة؟</h3>

    <p className="text-sm text-gray-500">
      فريق الدعم متاح على مدار الساعة لمساعدتك
    </p>

    <button className="bg-white w-full py-2 rounded-lg shadow">
      📞 اتصل بالدعم: 16666
    </button>

  </div>

</div>

        <div className="w-full md:w-2/3 space-y-6">

  {/* ===== MAP CARD ===== */}
  <div className="bg-white rounded-xl shadow p-4">

  <div className="flex  items-center gap-2 mb-3">
    <span className="text-green-500 text-sm">
       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z" />
        <circle cx="12" cy="11" r="2.5" />
       </svg>
     </span>
    <h3 className="font-bold text-sm">موقع الفني</h3>
   </div>

  <div className="h-80 rounded-xl overflow-hidden">
  {booking?.lat && booking?.lng && (
    <MapContainer
  center={[booking.lat, booking.lng]}
  zoom={15}
  style={{ height: "100%", width: "100%" }}
>

  <RecenterMap
    lat={providerLoc?.lat || booking.lat}
    lng={providerLoc?.lng || booking.lng}
  />

  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

  <Marker position={[booking.lat, booking.lng]} />

  {providerLoc && (
    <Marker position={[providerLoc.lat, providerLoc.lng]} />
  )}

  {/* 🔘 المسار القديم (اللي مشي فيه) */}
{currentRoute.length > 1 && (
  <Polyline positions={currentRoute} color="green" weight={5} />
)}


</MapContainer>
  )}
</div>




  {/* ===== INFO ===== */}
 <div className="bg-green-50 border border-green-100 rounded-xl p-4 mt-4">

  <div className="grid grid-cols-2 gap-4">

    {/* ⏱️ الوقت */}
    <div className="text-right">
      <p className="text-gray-500 text-sm">الوقت المتوقع</p>
      <p className="text-green-600 font-bold text-lg">
        {formatETA(eta)}
      </p>
    </div>

    {/* 📍 المسافة */}
    <div className="text-left">
      <p className="text-gray-500 text-sm">المسافة المتبقية</p>
      <p className="text-green-600 font-bold text-lg">
        {distance != null ? `على بعد ${Number(distance).toFixed(1)} كم` : "--"}
      </p>
    </div>

  </div>

</div>
</div>


  {/* ===== STATUS ===== */}
  <div className="bg-white rounded-xl shadow p-5">

  <h3 className="font-bold mb-4">حالة الطلب</h3>

  <div className="relative">

    {/* الخط الرمادي الأساسي */}
    <div className="absolute right-4 top-0 bottom-0 w-[2px] bg-gray-200"></div>

    {/* الخط الأخضر (progress) */}
    <div
      className="absolute right-4 top-0 w-[2px] bg-green-500 transition-all duration-500"
      style={{
        height: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
      }}
    ></div>

    <div className="space-y-8">

      {steps.map((step, index) => {
        const isDone = index < currentStepIndex;
        const isActive = index === currentStepIndex;
        const isWaiting = index > currentStepIndex;

        return (
          <div key={step.key} className="flex items-start gap-4 relative">

            {/* ICON */}
            <div className="relative z-10">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full
                  ${
                    isDone || isActive
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
              >
                {step.icon}
              </div>
            </div>

            {/* TEXT */}
            <div
              className={`flex justify-between w-full ${
                isActive ? "bg-gray-100 p-3 rounded-lg" : ""
              } ${isWaiting ? "text-gray-400" : ""}`}
            >

              {/* LEFT */}
              <div>
                <p
                  className={`font-bold ${
                    isDone ? "text-green-600" : ""
                  }`}
                >
                  {step.label}
                </p>

                <p className="text-xs text-gray-400">
                  {step.desc}
                </p>
              </div>

              {/* RIGHT TIME */}
              <div className="text-xs text-gray-400">
                {formatTime(statusTimes[step.key])}
              </div>

            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>

  {/* ===== DETAILS ===== */}
  <div className="bg-white rounded-xl shadow p-5">

  <h3 className="font-bold mb-4 text-right">تفاصيل الخدمة</h3>

  <div className="text-sm">

  {/* الخدمة */}
  <div className="flex justify-between py-3">
    <span className="text-gray-500">الخدمة</span>
    <span className="font-medium">{booking.service}</span>
  </div>

  {/* الموعد */}
  <div className="flex justify-between py-3 border-t border-gray-300">
    <span className="text-gray-500">الموعد المحدد</span>
    <span>{formatBookingTime(booking.time)}</span>
  </div>

  {/* العنوان */}
  <div className="flex justify-between py-3 border-t border-gray-300">
    <span className="text-gray-500">العنوان</span>
    <span className="text-left">{booking.address}</span>
  </div>

  {/* الدفع */}
  <div className="flex justify-between py-3 border-t border-gray-300">
    <span className="text-gray-500">طريقة الدفع</span>
    <span>{booking.payment}</span>
  </div>

  {/* السعر */}
  <div className="flex justify-between py-3 border-t border-gray-300 items-center">
    <span className="text-gray-500">المبلغ الإجمالي</span>
    <span className="text-green-600 font-bold text-lg">
      {provider.price} جنيه
    </span>
  </div>

</div>
</div>

  {/* ===== NOTES ===== */}
  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm">

    <h3 className="font-bold mb-2 text-yellow-700">تعليمات هامة</h3>

    <ul className="space-y-1 text-gray-600">
      <li>• يرجى التواجد في الموقع عند وصول الفني</li>
      <li>• في حالة التأخير , سيتواصل معك الفني مباشرة</li>
      <li>• يمكنك إلغاء الطلب قبل وصول الفني ب 15 دقيقة</li>
    </ul>

  </div>

</div>



      </div>
    </div>
  );
}