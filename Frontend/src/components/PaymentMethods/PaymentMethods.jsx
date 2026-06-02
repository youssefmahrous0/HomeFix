import { useEffect, useState } from "react";
import axios from "axios";
import AddCardModal from "./AddCardModal";

export default function PaymentMethods() {
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCards();
  }, []);

  // 📥 تحميل الكروت
  const fetchCards = async () => {
    try {
      setLoading(true);

      const res = await axios.get("https://homefix-production-0bc9.up.railway.app/cards", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setCards(res.data);
    } catch (err) {
      console.log(err);
      alert("فشل تحميل البطاقات");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ فتح مودال الحذف
  const deleteCard = (id) => {
    setDeleteId(id);
  };

  // ✅ تأكيد الحذف
  const confirmDelete = async () => {
    try {
      await axios.delete(`https://homefix-production-0bc9.up.railway.app/cards/${deleteId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setCards((prev) => prev.filter((c) => c.id !== deleteId));
      setDeleteId(null);

    } catch {
      alert("فشل الحذف");
    }
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] p-10" dir="rtl">

      {/* العنوان */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">طرق الدفع</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:scale-105 transition"
        >
          + إضافة بطاقة جديدة
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-center text-gray-500">جارٍ تحميل البطاقات...</p>
      ) : cards.length === 0 ? (
        <p className="text-center text-gray-500">لا يوجد بطاقات حتى الآن</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">

          {cards.map((card) => (
            <div
              key={card.id}
              className="relative bg-[#F3F4F6] rounded-2xl p-6 shadow-md w-full max-w-[420px]"
            >

              {/* الخط الأخضر */}
              <div className="absolute top-0 left-0 w-full h-2 bg-green-600 rounded-t-2xl"></div>

              {/* حذف */}
              <button
                onClick={() => deleteCard(card.id)}
                className="absolute top-4 left-4 hover:scale-110 transition"
              >
                <svg width="22" height="22" fill="none" stroke="#ef4444" strokeWidth="1.7">
                  <path d="M3 6h18" />
                  <path d="M8 6V4h8v2" />
                  <rect x="5" y="6" width="14" height="14" rx="2" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                </svg>
              </button>

              {/* أعلى الكارت */}
              <div className="flex justify-between items-start mt-4">

                <div className="flex items-center gap-2">

                  <div className="bg-[#1E293B] w-12 h-12 rounded-xl flex items-center justify-center">
                    <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">بطاقة ائتمان</p>
                    <p className="text-lg font-semibold capitalize">
                      {card.type}
                    </p>
                  </div>

                </div>

              </div>

              {/* الرقم */}
              <div className="mt-10 mb-8">
                <p className="text-xl tracking-[0.3em] text-gray-800 text-center">
                  •••• •••• •••• {card.last4}
                </p>
              </div>

              {/* تحت */}
              <div className="flex justify-between items-end">

                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">تاريخ الانتهاء</p>
                  <p className="text-sm font-medium">{card.expiry}</p>
                </div>

                <button className="border px-4 py-1 rounded-lg text-sm bg-white shadow-sm hover:bg-gray-100">
                  جعله افتراضي
                </button>

              </div>

            </div>
          ))}

          {/* إضافة */}
          <div
            onClick={() => setShowModal(true)}
            className="border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-10 cursor-pointer text-gray-500 hover:bg-gray-100 transition"
          >
            <div className="text-3xl mb-2">+</div>
            <p>إضافة بطاقة جديدة</p>
          </div>

        </div>
      )}

      {/* الأمان */}
      <div className="mt-10 bg-blue-100 p-6 rounded-xl shadow-sm">
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-2 mb-2">
            <span>🔒</span>
            <p className="font-semibold text-lg">معلومات آمنة ومحمية</p>
          </div>
          <p className="text-sm">
            جميع معلومات الدفع محمية ولا يتم تخزين بيانات البطاقة الكاملة.
          </p>
        </div>
      </div>

      {/* مودال إضافة */}
      {showModal && (
        <AddCardModal
          onClose={() => setShowModal(false)}
          refreshCards={fetchCards}
        />
      )}

      {/* مودال حذف */}
      {deleteId && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setDeleteId(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-xl w-[350px] text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4">
              متأكد من حذف البطاقة؟
            </h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                حذف
              </button>

              <button
                onClick={() => setDeleteId(null)}
                className="px-6 py-2 border rounded-lg"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}