import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const [providers, setProviders] = useState([]);
  const navigate = useNavigate();
  
  const handleRemove = async (providerId) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🧠 احذف من السيرفر
  await fetch("http://127.0.0.1:5000/favorite/toggle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.id,
      provider_id: providerId,
    }),
  });

  // ⚡ احذف من الواجهة فورًا
  setProviders(prev =>
    prev.filter(p => p.id !== providerId)
  );
};


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .get(`homefix-production-0bc9.up.railway.app/favorites/${user.id}`)
      .then((res) => {
        setProviders(res.data.providers);
      });
  }, []);

  return (
    <div className="p-6">

      {/* 🧾 Title */}
      <h2 className="text-2xl font-bold text-right mb-6">
        المفضلة
      </h2>

      {/* 🟢 Cards */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {providers.map((p) => (
    <div
      key={p.id}
      className="bg-white rounded-2xl p-6 text-center relative shadow-md"
    >
      {/* ❤️ Heart */}
      <div
  onClick={() => handleRemove(p.id)}
  className="absolute top-4 left-4 bg-white shadow w-10 h-10 flex items-center justify-center rounded-full text-red-500 cursor-pointer"
>
  ❤️
</div>

      {/* 🔧 Icon */}
      <div className="w-16 h-16 mx-auto bg-green-600 rounded-xl flex items-center justify-center text-white text-xl mb-4">
        🔧
      </div>

      {/* 🧾 Name */}
      <h3 className="font-bold text-lg">{p.name}</h3>

      {/* 💼 Job */}
      <p className="text-gray-500 text-sm mb-3">{p.job}</p>

      {/* ⭐ Rating */}
      <p className="text-sm text-gray-500">
       ⭐ {p.rating}  • {p.orders} تقييم
      </p>

      {/* 💰 Price Title */}
      <p className="text-gray-400 text-sm mt-4">السعر</p>

      {/* 💰 Price */}
      <p className="text-green-600 font-bold text-lg">
        ج.م {p.price}
      </p>

      {/* 🔘 Button */}
      <button
        onClick={() => navigate(`/booking/${p.id}`)}
        className="mt-5 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        احجز الآن
      </button>
    </div>
  ))}
</div>

      {/* ❌ لو مفيش بيانات */}
      {providers.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          لا يوجد مفضلة بعد
        </p>
      )}

    </div>
  );
}