import React from "react";

export default function ServiceProviderFilters({ filters, setFilters }) {

return (
<div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-5">
<h3 className="font-semibold text-lg mb-5">الفلاتر</h3>

{/* rating */}
<div className="mb-6">
<p className="font-medium mb-2">الحد الأدنى للتقييم</p>

<div className="flex flex-col gap-2">

{[4.5,4,3.5,3,0].map(rate => (
<label key={rate} className="flex items-center gap-2 cursor-pointer">
<input
type="radio"
name="rating"
checked={filters.rating === rate}
onChange={()=>setFilters({...filters, rating:rate})}
/>
<span>
{rate === 0 ? "جميع التقييمات" : `أكثر ${rate} ⭐`}
</span>
</label>
))}

</div>
</div>

<div className="h-px bg-gray-100 my-5"></div>

{/* available */}
<div className="mb-6">
<label className="flex items-center gap-2 cursor-pointer">
<input
type="checkbox"
checked={filters.available}
onChange={(e)=>setFilters({...filters, available:e.target.checked})}
/>
<span>متاح الآن فقط</span>
</label>
</div>

<div className="h-px bg-gray-100 my-5"></div>

{/* price */}
<div className="mb-6">
<p className="font-medium mb-2">نطاق السعر</p>

<input
type="range"
min="0"
max="200"
value={filters.price}
onChange={(e)=>setFilters({...filters, price:e.target.value})}
className="w-full"
/>

<div className="flex justify-between text-sm text-gray-500">
<span>0 جنيه</span>
<span>{filters.price} جنيه</span>
</div>
</div>

<div className="h-px bg-gray-100 my-5"></div>

{/* governorate */}
<div className="mb-6">
<p className="font-medium mb-2">المحافظة</p>

<select
className="w-full border rounded-lg p-2"
value={filters.governorate}
onChange={(e)=>setFilters({...filters, governorate:e.target.value})}
>
<option value="">جميع المناطق</option>
<option>القاهرة</option>
<option>الجيزة</option>
<option>الإسكندرية</option>
<option>الشرقية</option>
<option>الغربية</option>
<option>الدقهلية</option>
<option>البحيرة</option>
<option>المنوفية</option>
<option>المنيا</option>
<option>الفيوم</option>
<option>السويس</option>
<option>الاسماعيلية</option>
<option>البحر الأحمر</option>
<option>الوادي الجديد</option>
<option>السويس</option>
<option>اسوان</option>
<option>اسيوط</option>
<option>بني سويف</option>
<option>بورسعيد</option>  
<option>دمياط</option>
<option>الشرقية</option>
<option>جنوب سيناء</option> 
<option>كفر الشيخ</option>
<option>مطروح</option>
<option>الأقصر</option>
<option>قنا</option>
<option>شمال سيناء</option>
<option>سوهاج</option>
</select>

</div>

{/* box */}
<div className="bg-green-50 p-3 rounded-lg text-sm text-green-700">
فنيون معتمدون  
<br/>
جميع الفنيين مدربون ومراجعون
</div>

<div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700 mt-3">
استجابة سريعة  
<br/>
متوسط وقت الوصول أقل من ساعة
</div>

</div>
)
}