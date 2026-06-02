import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  
  CartesianGrid,
  Legend,
} from "recharts";

import {
  Users,
  Briefcase,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Star,
  Bell,
  LogOut,
  LayoutDashboard,
  UserCheck,
  ClipboardList,
  MessageSquare,
  Megaphone,
  Package,
} from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

   const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
};
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "homefix-production-0bc9.up.railway.app/api/admin/dashboard"
      );

      setData(res.data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  const stats = data.statistics;

  const pieData = data.services_distribution || [];

  const COLORS = [
    "#16a34a",
    "#22c55e",
    "#4ade80",
    "#86efac",
    "#bbf7d0",
    "#dcfce7",
  ];

  const areaData = [
    { month: "يناير", users: 400, orders: 450 },
    { month: "فبراير", users: 500, orders: 520 },
    { month: "مارس", users: 620, orders: 610 },
    { month: "أبريل", users: 690, orders: 670 },
    { month: "مايو", users: 760, orders: 760 },
    { month: "يونيو", users: 880, orders: 850 },
  ];

 const barData = data.bar_chart_data || [];
 const topProviders = data.top_providers || [];
 const latestActivities = data.latest_activities || [];
 const today = new Date().toLocaleDateString("ar-EG", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
  

  return (
    <div
      dir="rtl"
      className="bg-[#f5f5f5] min-h-screen flex"
    >
     <AdminSidebar handleLogout={handleLogout} />

      {/* Content */}
      <div className="flex-1 bg-[#f5f5f5]">

  {/* Date Bar */}
  <div className="bg-white border-b border-gray-200 px-8 py-6">

    <p className="text-gray-500 text-lg font-medium text-right">
      {today}
    </p>

  </div>

  {/* Page Content */}
  <div className="px-8 pb-8 pt-2">

  {/* العنوان */}
  <div className="text-right mb-10 -mt-2">
  <h1 className="text-[52px] leading-tight font-black text-gray-900">
    لوحة التحكم الرئيسية
  </h1>

  <p className="text-gray-500 text-2xl mt-3">
    نظرة شاملة على أداء تطبيق HomeFix
  </p>
</div>

       {/* Stats */}
<div className="grid grid-cols-3 gap-8 mb-10">
  
  {/* إجمالي المستخدمين */}
  <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-[30px] overflow-hidden shadow-xl">
    
    <div className="p-8 h-[230px] flex flex-col justify-between text-white">

      <div className="flex items-start justify-between">

        <div className="bg-white/20 w-20 h-20 rounded-[22px] flex items-center justify-center shrink-0">
          <Users size={40} strokeWidth={2.5} />
        </div>

        <div className="text-right flex-1 pr-6">
          <p className="text-green-100 text-2xl mb-5">
            إجمالي المستخدمين
          </p>

          <h2 className="text-[68px] leading-none font-black tracking-tight min-h-[70px] flex items-center justify-end">
            {Number(stats.users).toLocaleString()}
          </h2>
        </div>

      </div>

      <p className="text-green-100 text-xl text-right">
        ↑ 12.5% مقارنة بالشهر الماضي
      </p>

    </div>

    <div className="h-9 bg-white/90"></div>
  </div>

  
  {/* مقدمو الخدمات */}
  <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-[30px] overflow-hidden shadow-xl">
    
    <div className="p-8 h-[230px] flex flex-col justify-between text-white">

      <div className="flex items-start justify-between">

        <div className="bg-white/20 w-20 h-20 rounded-[22px] flex items-center justify-center shrink-0">
          <Briefcase size={40} strokeWidth={2.5} />
        </div>

        <div className="text-right flex-1 pr-6">
          <p className="text-blue-100 text-2xl mb-5">
            مقدمو الخدمات
          </p>

          <h2 className="text-[68px] leading-none font-black tracking-tight min-h-[70px] flex items-center justify-end">
            {Number(stats.providers).toLocaleString()}
          </h2>
        </div>

      </div>

      <p className="text-blue-100 text-xl text-right">
        ↑ 8.3% مقارنة بالشهر الماضي
      </p>

    </div>

    <div className="h-9 bg-white/90"></div>
  </div>

  {/* إجمالي الخدمات */}
  <div className="bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-[30px] overflow-hidden shadow-xl">
    
    <div className="p-8 h-[230px] flex flex-col justify-between text-white">

      <div className="flex items-start justify-between">

        <div className="bg-white/20 w-20 h-20 rounded-[22px] flex items-center justify-center shrink-0">
          <Package size={40} strokeWidth={2.5} />
        </div>

        <div className="text-right flex-1 pr-6">
          <p className="text-purple-100 text-2xl mb-5">
            إجمالي الخدمات
          </p>

          <h2 className="text-[68px] leading-none font-black tracking-tight min-h-[70px] flex items-center justify-end">
           {Number(stats.services).toLocaleString()}
          </h2>
        </div>

      </div>

      <p className="text-purple-100 text-xl text-right">
        ↑ 15.2% مقارنة بالشهر الماضي
      </p>

    </div>

    <div className="h-9 bg-white/90"></div>
  </div>



  {/* الطلبات النشطة */}
  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-[30px] overflow-hidden shadow-xl">
    
    <div className="p-8 h-[230px] flex flex-col justify-between text-white">

      <div className="flex items-start justify-between">

        <div className="bg-white/20 w-20 h-20 rounded-[22px] flex items-center justify-center shrink-0">
          <ShoppingCart size={40} strokeWidth={2.5} />
        </div>

        <div className="text-right flex-1 pr-6">
          <p className="text-orange-100 text-2xl mb-5">
            الطلبات النشطة
          </p>

          <h2 className="text-[68px] leading-none font-black tracking-tight min-h-[70px] flex items-center justify-end">
            {Number(stats.orders).toLocaleString()}
          </h2>
        </div>

      </div>

      <p className="text-orange-100 text-xl text-right">
        ↑ 23.1% مقارنة بالشهر الماضي
      </p>

    </div>

    <div className="h-9 bg-white/90"></div>
  </div>

  {/* الإيرادات */}
  <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-[30px] overflow-hidden shadow-xl">
    
    <div className="p-7 pb-13 h-[230px] flex flex-col justify-between text-white">

      <div className="flex items-start justify-between">

        <div className="bg-white/20 w-20 h-20 rounded-[22px] flex items-center justify-center shrink-0">
          <DollarSign size={40} strokeWidth={2.5} />
        </div>

        <div className="text-right flex-1 pr-6">
          <p className="text-emerald-100 text-2xl mb-5">
            إجمالي الإيرادات
          </p>

          <h2 className="text-[52px] xl:text-[60px] leading-none font-black tracking-tight min-h-[70px] flex items-center justify-end">
            {Number(stats.revenue).toLocaleString()} ج
          </h2>
        </div>

      </div>

      <p className="text-emerald-100 text-xl text-right">
        ↑ 18.7% مقارنة بالشهر الماضي
      </p>

    </div>

    <div className="h-9 bg-white/90"></div>
  </div>

  {/* معدل النمو */}
  <div className="bg-gradient-to-r from-pink-600 to-pink-500 rounded-[30px] overflow-hidden shadow-xl">
    
    <div className="p-8 h-[230px] flex flex-col justify-between text-white">

      <div className="flex items-start justify-between">

        <div className="bg-white/20 w-20 h-20 rounded-[22px] flex items-center justify-center shrink-0">
          <TrendingUp size={40} strokeWidth={2.5} />
        </div>

        <div className="text-right flex-1 pr-6">
          <p className="text-pink-100 text-2xl mb-5">
            معدل النمو
          </p>

          <h2 className="text-[68px] leading-none font-black tracking-tight min-h-[70px] flex items-center justify-end">
            28.4%
          </h2>
        </div>

      </div>

      <p className="text-pink-100 text-xl text-right">
        ↑ 5.2% مقارنة بالشهر الماضي
      </p>

    </div>

    <div className="h-9 bg-white/90"></div>
  </div>

</div>

        

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mb-8">

          {/* Area */}
         <div className="bg-white rounded-3xl p-8 shadow-sm">

  <h2 className="text-2xl font-bold mb-8 text-right">
    الطلبات والمستخدمين الشهرية
  </h2>

  <ResponsiveContainer width="100%" height={320}>

    <AreaChart
      data={areaData}
      margin={{
        top: 10,
        right: 10,
        left: -20,
        bottom: 0,
      }}
    >

      <CartesianGrid
        strokeDasharray="4 4"
        stroke="#e5e7eb"
      />

      <XAxis
        dataKey="month"
        tick={{
          fontSize: 14,
          fill: "#737373",
        }}
        axisLine={false}
        tickLine={false}
      />

     <YAxis
  width={55}
  dx={-20}
  tick={{
    fontSize: 14,
    fill: "#737373",
  }}
  tickLine={false}
  axisLine={false}
  textAnchor="end"
/>
      <Tooltip />

      <Legend />

      <Area
  type="monotone"
  dataKey="orders"
  name="الطلبات"
  stroke="#22c55e"
  fill="#86efac"
  fillOpacity={0.7}
  strokeWidth={3}
/>

<Area
  type="monotone"
  dataKey="users"
  name="المستخدمين"
  stroke="#2563eb"
  fill="#93c5fd"
  fillOpacity={0.7}
  strokeWidth={3}
/>

    </AreaChart>

  </ResponsiveContainer>
</div>
             
          {/* Pie */}
<div className="bg-white rounded-3xl p-6 shadow-sm">
  <h2 className="text-2xl font-bold mb-6">
    توزيع الخدمات
  </h2>

 <ResponsiveContainer width="100%" height={330}>
    
    <PieChart
  margin={{
    top: 40,
    right: 80,
    left: 140,
    bottom: 40,
  }}
>
     <Pie
  data={pieData}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={120}
  labelLine={false}

label={({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  name,
}) => {

  const RADIAN = Math.PI / 180;

  const cos = Math.cos(-midAngle * RADIAN);
  const sin = Math.sin(-midAngle * RADIAN);

  const isLeftSide = cos < 0;

  const radius = outerRadius + 55;

  let x = cx + radius * cos;

  let y = cy + radius * sin;

  // كهرباء تنزل تحت
  if (name === "كهرباء") {
    y += 35;
    x += 30;
  }
  // دهانات تطلع فوق + تروح يمين
if (name === "دهانات") {
  y -= 35;
  x -= 30;
}
// سباكة شمال شوية وتحت
if (name === "سباكة") {
  x += 25;
  y += 20;
}
// تنظيف تروح يمين + فوق
if (name === "تنظيف") {
  y -= 30;
  x -= 40;
}
// تكييف تحت + يمين
if (name === "تكييف") {
  y += 20;
  x -= 25;
}

  return (
    <text
      x={x}
      y={y}
      fill="#22c55e"
      textAnchor={isLeftSide ? "end" : "start"}
      dominantBaseline="central"
      fontSize={15}
      fontWeight="bold"
    >
      {name} %{(percent * 100).toFixed(0)}
    </text>
  );
}}
>
  {pieData.map((entry, index) => (
    <Cell
      key={index}
      fill={COLORS[index % COLORS.length]}
    />
  ))}
</Pie>

      <Tooltip />

    </PieChart>

  </ResponsiveContainer>
</div>
        </div>

        {/* Bar Chart */}
       <div className="bg-white rounded-3xl p-6 shadow-sm mb-8">

  <h2 className="text-2xl font-bold mb-6 text-right">
    أداء الخدمات حسب الحالة
  </h2>

  <ResponsiveContainer width="100%" height={350}>

    <BarChart
      data={barData}
      barSize={55}
      margin={{
  top: 20,
  right: 20,
  left: 0,
  bottom: 35,
}}
    >

      <CartesianGrid
        strokeDasharray="4 4"
        stroke="#e5e7eb"
      />

      <XAxis
  dataKey="service"
  axisLine={false}
  tickLine={false}
  interval={0}
  tick={({ x, y, payload }) => {

    const words = payload.value.split(" ");

    return (
      <g
  transform={`
    translate(
      ${
        payload.value === "إصلاح سباكة"
          ? x - 55
          : payload.value === "تنظيف منزلي"
          ? x - 55
          : x
      },
      ${y - 5}
    )
  `}
>
        <text
          textAnchor="middle"
          fill="#737373"
          fontSize={14}
        >
          {words.map((word, index) => (
            <tspan
              key={index}
              x="0"
              dy={index === 0 ? 16 : 18}
            >
              {word}
            </tspan>
          ))}
        </text>
      </g>
    );
  }}
/>

      <YAxis
        dx={-20}
        tick={{
          fontSize: 14,
          fill: "#737373",
        }}
        axisLine={false}
        tickLine={false}
      />

      <Tooltip />

      <Legend
        wrapperStyle={{
          paddingTop: "20px",
        }}
      />

      <Bar
        dataKey="completed"
        name="مكتملة"
        fill="#4caf50"
        radius={[6, 6, 0, 0]}
      />

      <Bar
        dataKey="pending"
        name="معلقة"
        fill="#fbbf24"
        radius={[6, 6, 0, 0]}
      />

      <Bar
        dataKey="cancelled"
        name="ملغاة"
        fill="#ef4444"
        radius={[6, 6, 0, 0]}
      />

    </BarChart>

  </ResponsiveContainer>

</div>

          {/* النشاطات الأخيرة + أفضل مقدمي الخدمات */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

  {/* أفضل مقدمي الخدمات */}
  <div className="bg-white rounded-3xl p-7 shadow-sm">

    <div className="flex items-center gap-4 mb-8">

  <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
    <Star className="text-green-600" size={22} />
  </div>

  <h2 className="text-3xl font-black text-gray-800">
    أفضل مقدمي الخدمات
  </h2>

</div>

    <div className="space-y-5">

      {topProviders.map((provider) => (

        <div
          key={provider.id}
          className="border border-gray-100 rounded-3xl p-5 flex items-center justify-between hover:shadow-md transition"
        >

          {/* الصورة */}
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl shrink-0">
            👷
          </div>

          {/* البيانات */}
          <div className="flex-1 text-right px-5">

            <h3 className="font-black text-2xl text-gray-800">
              {provider.name}
            </h3>

            <p className="text-gray-500 text-lg mt-1">
              {provider.job}
            </p>

            <div className="flex items-center justify-start gap-3 mt-3">

              <span className="flex items-center gap-1 text-yellow-500 font-bold">
                ⭐ {provider.rating}
              </span>

              <span className="text-gray-300">
                •
              </span>

              <span className="text-gray-500">
                {provider.orders} طلب
              </span>

            </div>

          </div>

          {/* الترتيب والسعر */}
          <div className="text-left">

            <div className="bg-green-600 text-white text-sm font-black px-4 py-2 rounded-2xl inline-block mb-4">
              #{provider.rank}
            </div>

            <p className="text-green-600 font-black text-3xl">
              {provider.price} ج
            </p>

          </div>

        </div>

      ))}

    </div>
  </div>
     
      {/* النشاطات الأخيرة */}
  <div className="bg-white rounded-3xl p-7 shadow-sm">

    <div className="flex items-center gap-4 mb-8">

      <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
        <svg
  width="28"
  height="28"
  viewBox="0 0 64 64"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M6 34H20L28 18L40 50L48 34H58"
    stroke="#16a34a"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
      </div>

      <h2 className="text-3xl font-black text-gray-800">
        النشاطات الأخيرة
      </h2>

    </div>

    <div className="space-y-5">

      {latestActivities.map((activity, index) => (

        <div
          key={index}
          className="border border-gray-100 rounded-3xl p-5 flex items-start justify-between hover:shadow-md transition"
        >

          {/* الأيقونة */}
          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center shrink-0">

            {activity.type === "order" && (
              <ShoppingCart className="text-green-600" size={24} />
            )}

            {activity.type === "provider" && (
              <Users className="text-blue-600" size={24} />
            )}

            {activity.type === "rating" && (
              <Star className="text-yellow-500" size={24} />
            )}

          </div>

          {/* النص */}
          <div className="flex-1 text-right pr-5">

            <h3 className="font-black text-2xl text-gray-800 mb-2">
              {activity.title}
            </h3>

            <p className="text-gray-500 text-lg leading-8">
              {activity.description}
            </p>

            <span className="text-gray-400 text-base mt-3 inline-block">
              {activity.time}
            </span>

          </div>

        </div>

      ))}

    </div>
  </div>
    
</div>

        {/* Orders */}
<div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">

  {/* Header */}
  <div className="flex items-center justify-between mb-8">

    <h2 className="text-[34px] font-black text-gray-800">
      الطلبات الأخيرة
    </h2>

  </div>

  {/* Table */}
  <div className="overflow-x-auto">

    <table className="w-full border-separate border-spacing-y-0">

      {/* Head */}
      <thead>

        <tr className="bg-gray-50">

          <th className="py-5 px-6 text-right text-gray-700 text-xl font-bold rounded-tr-2xl">
            رقم الطلب
          </th>

          <th className="py-5 px-6 text-right text-gray-700 text-xl font-bold">
            العميل
          </th>

          <th className="py-5 px-6 text-right text-gray-700 text-xl font-bold">
            الخدمة
          </th>

          <th className="py-5 px-6 text-right text-gray-700 text-xl font-bold">
            مقدم الخدمة
          </th>

          <th className="py-5 px-6 text-right text-gray-700 text-xl font-bold">
            الحالة
          </th>

          <th className="py-5 px-6 text-right text-gray-700 text-xl font-bold rounded-tl-2xl">
            المبلغ
          </th>

        </tr>

      </thead>

      {/* Body */}
      <tbody>

        {data.latest_orders.map((order, index) => {

          const statusStyles = {
            completed:
              "bg-green-100 text-green-700",

            pending:
              "bg-yellow-100 text-yellow-700",

            scheduled:
              "bg-blue-100 text-blue-700",

            cancelled:
              "bg-red-100 text-red-700",
          };

          const statusText = {
            completed: "مكتمل",
            pending: "معلق",
            scheduled: "قيد التنفيذ",
            cancelled: "ملغي",
          };

          return (
            <tr
              key={order.id}
              className={`border-b border-gray-100 hover:bg-gray-50 transition ${
                index !== data.latest_orders.length - 1
                  ? "border-b"
                  : ""
              }`}
            >

              {/* رقم الطلب */}
              <td className="py-6 px-6 text-right text-[30px] font-bold text-gray-800">
                #ORD-{order.id}
              </td>

              {/* العميل */}
              <td className="py-6 px-6 text-right text-[28px] font-semibold text-gray-700">
                {order.client}
              </td>

              {/* الخدمة */}
              <td className="py-6 px-6 text-right text-[28px] font-semibold text-gray-700">
                {order.service}
              </td>

              {/* مقدم الخدمة */}
              <td className="py-6 px-6 text-right text-[28px] font-semibold text-gray-700">
                {order.provider}
              </td>

              {/* الحالة */}
              <td className="py-6 px-6 text-right">

                <span
                  className={`px-5 py-2 rounded-full text-lg font-bold ${
                    statusStyles[order.status]
                  }`}
                >
                  {statusText[order.status]}
                </span>

              </td>

              {/* السعر */}
              <td className="py-6 px-6 text-right text-[30px] font-black text-gray-800">
                {order.price} ج.م
              </td>

            </tr>
          );
        })}

      </tbody>

    </table>

  </div>

</div>


</div>

        
      </div>
    </div>
  );
}