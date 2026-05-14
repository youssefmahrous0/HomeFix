import React from "react";
import Select from "react-select";

export default function ServiceProviderHeroSearch({
search,
setSearch,
governorate,
setGovernorate
}) {

const governorates = [
{ value: "", label: "جميع المناطق" },
{ value: "القاهرة", label: "القاهرة" },
{ value: "الجيزة", label: "الجيزة" },
{ value: "الإسكندرية", label: "الإسكندرية" },
{ value: "الدقهلية", label: "الدقهلية" },
{ value: "البحر الأحمر", label: "البحر الأحمر" },
{ value: "البحيرة", label: "البحيرة" },
{ value: "الفيوم", label: "الفيوم" },
{ value: "الغربية", label: "الغربية" },
{ value: "الإسماعيلية", label: "الإسماعيلية" },
{ value: "المنوفية", label: "المنوفية" },
{ value: "المنيا", label: "المنيا" },
{ value: "القليوبية", label: "القليوبية" },
{ value: "الوادي الجديد", label: "الوادي الجديد" },
{ value: "السويس", label: "السويس" },
{ value: "اسوان", label: "اسوان" },
{ value: "اسيوط", label: "اسيوط" },
{ value: "بني سويف", label: "بني سويف" },
{ value: "بورسعيد", label: "بورسعيد" },
{ value: "دمياط", label: "دمياط" },
{ value: "الشرقية", label: "الشرقية" },
{ value: "جنوب سيناء", label: "جنوب سيناء" },
{ value: "كفر الشيخ", label: "كفر الشيخ" },
{ value: "مطروح", label: "مطروح" },
{ value: "الأقصر", label: "الأقصر" },
{ value: "قنا", label: "قنا" },
{ value: "شمال سيناء", label: "شمال سيناء" },
{ value: "سوهاج", label: "سوهاج" },
];

return (
<section className="bg-green-600 border-t border-gray-200 mt-16 pt-24 pb-14">

<div className="container mx-auto text-center">

<h1 className="text-3xl font-semibold text-white mb-2">
اختر أفضل فني كهرباء
</h1>

<p className="text-gray-200 mb-6">
فنيون معتمدون ومحترفون • تقييمات حقيقية • خدمة سريعة
</p>

<form className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-row-reverse gap-4 items-center">

<button className="bg-green-600 text-white px-6 py-2 rounded-lg">
بحث
</button>

<div className="w-56">
<Select
options={governorates}
value={governorates.find(g=>g.value===governorate)}
onChange={(e)=>setGovernorate(e.value)}
placeholder="جميع المناطق"
/>
</div>

<input
type="text"
value={search}
onChange={(e)=>setSearch(e.target.value)}
placeholder="ابحث بالاسم أو المهارة..."
className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
/>

</form>

</div>

</section>
);
}