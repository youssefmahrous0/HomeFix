import { useParams , useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



export default function BookingPage() {
  const { id } = useParams();
  const provider_id = id;
  const [provider, setProvider] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    address: "",
    city: "",
    area: "",
    phone: "",
    notes: "",
    payment: "cash",
  });

  useEffect(() => {
    axios.get(`https://homefix-production-0bc9.up.railway.app/providers/${id}`)
      .then(res => setProvider(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    
    // 🔥 تحويل التاريخ لـ ISO
    const formattedDate = new Date(form.date).toISOString().split("T")[0];


    axios.post("https://homefix-production-0bc9.up.railway.app/bookings", {
      provider_id,
      service: form.service,
      date: form.date,
      time: form.time,
      address: form.address,
      city: form.city,
      area: form.area,
      phone: form.phone,
      payment: form.payment,
      // ✅ أضف دي
      notes: form.notes,
      lat,
      lng
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
    .then(res => {
      navigate(`/booking-success/${res.data.booking_id}`);
    })
    .catch(err => console.log(err));
  });
};
  if (!provider) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6" dir="rtl">

      <div className="max-w-6xl mx-auto">

        {/* 🔹 العنوان */}
        <h2 className="text-2xl font-bold mb-6 text-right">احجز الآن</h2>

        <div className="flex flex-row-reverse gap-6">

          {/* ================= RIGHT (ملخص الحجز) ================= */}
          <div className="w-1/3 bg-white p-6 rounded-2xl shadow-sm">

            <h3 className="font-bold mb-4 text-right">ملخص الحجز</h3>

            {/* Provider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-lg">
                {provider.name[0]}
              </div>

              <div className="text-right">
                <p className="font-bold">{provider.name}</p>
                 <p className="text-sm text-gray-500">
                 {provider.job || provider.service}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4 justify-start">
              {provider.skills?.map((s, i) => (
             <span key={i}
             className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs" > {s} </span>
               ))}
            </div>

            {/* Prices */}
            <div className="text-sm space-y-3">

            {/* سعر الزيارة */}
           <div className="flex justify-between items-center">
             <span className="text-gray-500">سعر الزيارة</span>
             <span>{provider.price} جنيه</span>
            </div>

            {/* رسوم الخدمة */}
           <div className="flex justify-between items-center">
             <span className="text-gray-500">رسوم الخدمة</span>
             <span>30 جنيه</span>
           </div>

             {/* خط */}
           <hr className="border-t border-gray-200 my-4" />

             {/* الإجمالي */}
            <div className="flex justify-between items-center font-bold text-lg">
             <span>الإجمالي</span>
             <span>{provider.price + 30} جنيه</span>
            </div>
        </div>
            {/* خط */}
          <hr className="border-t border-gray-200 my-4" />

            {/* سياسة */}
          <div className="mt-6 text-right">

            {/* العنوان */}
            <p className="text-sm text-gray-500 mb-2"> سياسة الإلغاء </p>

            {/* البوكس */}
           <div className="bg-blue-50 text-blue-600 text-sm p-4 rounded-xl leading-6">
            يمكنك إلغاء الحجز مجانًا قبل 24 ساعة من الموعد المحدد
           </div>
       </div>

            {/* مميزات */}
          <div className="mt-4 space-y-3 text-sm text-left">

  {/* عنصر */}
  <div className="flex items-center gap-2">
    
    {/* ✔ SVG */}
    <svg
      className="w-5 h-5 text-green-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 12l3 3 7-7"
      />
    </svg>

    <span>ضمان الجودة</span>
  </div>

  {/* عنصر */}
  <div className="flex items-center gap-2">
    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 12l3 3 7-7" />
    </svg>
    <span>فني معتمد ومدرب</span>
  </div>

  {/* عنصر */}
  <div className="flex items-center gap-2">
    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 12l3 3 7-7" />
    </svg>
    <span>دعم فني 24/7</span>
  </div>

</div>

            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white w-full py-3 rounded-lg mt-6 hover:bg-green-700"
            >
              تأكيد الحجز
            </button>

          </div>

          {/* ================= LEFT (تفاصيل الحجز) ================= */}
          <div className="w-2/3 bg-white p-6 rounded-2xl shadow-sm">

  {/* العنوان */}
  <h3 className="font-bold mb-6 text-right">تفاصيل الحجز</h3>

  <div className="grid grid-cols-2 gap-4 text-right">

    {/* الخدمة */}
    <div className="col-span-2">
      <label className="text-sm text-gray-500 flex  items-center gap-2 mb-1">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
           d="M9 12h6M9 16h6M9 8h6M7 4h6l4 4v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
        <span>الخدمة المختارة</span>
      </label>

      <input
       name="service"
       value={form.service}
       onChange={handleChange}
       className="w-full bg-gray-100 border-none p-3 rounded-lg" />
    </div>

    {/* التاريخ */}
    <div>
      <label className="text-sm text-gray-500 flex  items-center gap-2 mb-1">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
          <path strokeWidth="2" d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        <span>التاريخ</span>
      </label>

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full bg-gray-100 border-none p-3 rounded-lg" />
    </div>

    {/* الوقت */}
    <div>
      <label className="text-sm text-gray-500 flex  items-center gap-2 mb-1">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      </svg>
      <span>الوقت</span>
      </label>

      <input
       type="time"
       name="time"
       value={form.time}
       onChange={handleChange}
       className="w-full bg-gray-100 border-none p-3 rounded-lg" />
    </div>

    {/* العنوان */}
    <div className="col-span-2">
      <label className="text-sm text-gray-500 flex items-center gap-2 mb-1">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             d="M12 21s-6-5.5-6-10a6 6 0 1112 0c0 4.5-6 10-6 10z" />
             <circle cx="12" cy="11" r="2" strokeWidth="2" />
        </svg>
        <span>العنوان بالتفصيل</span>
      </label>

      <input
       name="address"
       value={form.address}
       onChange={handleChange}
       className="w-full bg-gray-100 border-none p-3 rounded-lg"
       placeholder="مثال: 15 شارع الجمهورية"
/>
    </div>

    {/* المحافظة */}
    <div>
      <label className="text-sm text-gray-500 mb-1 block">المحافظة</label>
      <input
       name="city"
       value={form.city}
       onChange={handleChange}
       className="w-full bg-gray-100 border-none p-3 rounded-lg"
/>
    </div>

    {/* المنطقة */}
    <div>
      <label className="text-sm text-gray-500 mb-1 block">المنطقة</label>
     <input
       name="area"
       value={form.area}
       onChange={handleChange}
       className="w-full bg-gray-100 border-none p-3 rounded-lg"
/>
    </div>

    {/* رقم الهاتف */}
    <div className="col-span-2">
      <label className="text-sm text-gray-500 flex  items-center gap-2 mb-1">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h2l2 5-2 2a16 16 0 007 7l2-2 5 2v2a2 2 0 01-2 2h-1C10 21 3 14 3 6V5z" />
        </svg>
        <span>رقم الهاتف</span>
      </label>

      <input
      name="phone"
      value={form.phone}
      onChange={handleChange}
      className="w-full bg-gray-100 border-none p-3 rounded-lg" />
    </div>

    {/* ملاحظات */}
    <div className="col-span-2">
      <label className="text-sm text-gray-500 mb-1 block">ملاحظات إضافية</label>
      <textarea
        name="notes"
       value={form.notes}
       onChange={handleChange}
       className="w-full bg-gray-100 border-none p-3 rounded-lg"
/>
    </div>

  </div>

  {/* الدفع */}
  <div className="mt-6 text-right">

    <p className="text-sm text-gray-500 mb-3 flex  items-center gap-2">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
         <path strokeWidth="2" d="M2 10h20" />
        </svg>
        <span>طريقة الدفع</span>
    </p>

    <div className="space-y-3">

      <div
        onClick={() => setForm({ ...form, payment: "cash" })}
        className={`p-4 rounded-xl border cursor-pointer ${
          form.payment === "cash"
            ? "border-green-600 bg-green-50"
            : "border-gray-200"
        }`}
      >
        <p className="font-medium">الدفع نقدًا عند الاستلام</p>
        <p className="text-xs text-gray-400">ادفع للفني بعد إنهاء الخدمة</p>
      </div>

      <div
        onClick={() => setForm({ ...form, payment: "online" })}
        className={`p-4 rounded-xl border cursor-pointer ${
          form.payment === "online"
            ? "border-green-600 bg-green-50"
            : "border-gray-200"
        }`}
      >
        <p className="font-medium">الدفع الإلكتروني</p>
        <p className="text-xs text-gray-400 ">
          بطاقة ائتمان أو محفظة إلكترونية
        </p>
        </div>
       </div>
      </div>
    </div>
   </div>
  </div>
</div>
  );
}