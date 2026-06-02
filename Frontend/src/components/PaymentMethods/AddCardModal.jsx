import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useState } from "react";
import axios from "axios";

export default function AddCardModal({ onClose, refreshCards }) {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    setErrorMsg("");

    if (!stripe || !elements) return;

    if (!name.trim()) {
      setErrorMsg("اكتب اسم حامل البطاقة");
      return;
    }

    setLoading(true);

    try {
      const cardElement = elements.getElement(CardNumberElement);

      const { paymentMethod, error } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: { name },
        });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      await axios.post(
        "homefix-production-0bc9.up.railway.app/cards",
        {
          payment_method_id: paymentMethod.id,
        },
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      // ✅ success
      refreshCards();
      onClose();

    } catch (err) {
      console.log(err);
      setErrorMsg("حدث خطأ أثناء إضافة البطاقة");
    }

    setLoading(false);
  };

  const inputStyle = {
    style: {
      base: {
        fontSize: "16px",
        color: "#374151",
        "::placeholder": { color: "#9CA3AF" },
      },
      invalid: { color: "#EF4444" },
    },
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">

      <div className="bg-white rounded-2xl p-6 w-[420px] shadow-2xl relative">

        {/* close */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-400 hover:text-black text-xl"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-center mb-6">
          إضافة بطاقة جديدة
        </h3>

        <div className="space-y-4 text-right">

          {/* رقم البطاقة */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              رقم البطاقة
            </label>

            <div className="bg-gray-100 px-3 h-[45px] rounded-lg flex items-center">
              <div className="w-full">
                <CardNumberElement options={inputStyle} />
              </div>
            </div>
          </div>

          {/* الاسم */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              اسم حامل البطاقة
            </label>

            <input
              type="text"
              placeholder="الاسم كما هو مكتوب على البطاقة"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* expiry + cvv */}
          <div className="flex gap-3">

            <div className="flex-1">
              <label className="block mb-1 text-sm text-gray-600">
                تاريخ الانتهاء
              </label>

              <div className="bg-gray-100 p-3 rounded-lg">
                <CardExpiryElement options={inputStyle} />
              </div>
            </div>

            <div className="flex-1">
              <label className="block mb-1 text-sm text-gray-600">
                CVV
              </label>

              <div className="bg-gray-100 p-3 rounded-lg">
                <CardCvcElement options={inputStyle} />
              </div>
            </div>

          </div>

          {/* error */}
          {errorMsg && (
            <p className="text-red-500 text-sm text-center">
              {errorMsg}
            </p>
          )}

          {/* buttons */}
          <div className="flex justify-between mt-6">

            <button
              onClick={onClose}
              className="px-6 py-2 border rounded-lg hover:bg-gray-100"
            >
              إلغاء
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50 hover:bg-green-700 transition"
            >
              {loading ? "جاري..." : "إضافة البطاقة"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}