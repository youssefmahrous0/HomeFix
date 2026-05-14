import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");

  // =========================
  // ⏱️ TIME AGO
  // =========================
  function timeAgo(dateString) {
    if (!dateString) return "الآن";

    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now - past) / 1000);

    if (diff < 60) return "الآن";
    if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
    if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
    return `منذ ${Math.floor(diff / 86400)} يوم`;
  }

  // =========================
  // 📡 FETCH
  // =========================
  useEffect(() => {
    axios
      .get("http://localhost:5000/notifications", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => setNotifications(res.data))
      .catch((err) => console.log(err));
  }, []);

  // =========================
  // 🔥 SOCKET REALTIME
  // =========================
  useEffect(() => {
    const socket = io("http://localhost:5000");

    const userId = localStorage.getItem("user_id");
    socket.emit("join", { user_id: userId });

    socket.on("new_notification", (data) => {
      setNotifications((prev) => [
        {
          ...data,
          id: Date.now(),
          is_read: false,
          time: new Date().toISOString(),
        },
        ...prev,
      ]);
    });

    return () => socket.disconnect();
  }, []);

  // =========================
  // ✔ MARK READ
  // =========================
  const markRead = async (id) => {
    await axios.put(
      `http://localhost:5000/notifications/read/${id}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  // =========================
  // ❌ DELETE
  // =========================
  const deleteNotif = async (id) => {
    await axios.delete(`http://localhost:5000/notifications/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // =========================
  // 🔍 FILTER
  // =========================
  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.is_read;
    if (filter === "read") return n.is_read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  // =========================
  // 🎨 ICONS
  // =========================
  function getIcon(type) {
    const base =
      "w-10 h-10 flex items-center justify-center rounded-full shrink-0";

    switch (type) {
      case "booking":
        return (
          <div className={`${base} bg-green-100 text-green-600`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="9" strokeWidth="2" />
              <path strokeWidth="2" d="M9 12l2 2 4-4" />
            </svg>
          </div>
        );

      case "rating":
        return (
          <div className={`${base} bg-yellow-100 text-yellow-500`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeWidth="2" d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7z" />
            </svg>
          </div>
        );

      case "cancel":
        return (
          <div className={`${base} bg-red-100 text-red-500`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="9" strokeWidth="2" />
              <path strokeWidth="2" d="M9 9l6 6M15 9l-6 6" />
            </svg>
          </div>
        );

      default:
        return (
          <div className={`${base} bg-blue-100 text-blue-500`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01" />
            </svg>
          </div>
        );
    }
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">

      {/* HEADER */}
     <div className="max-w-7xl mx-auto mb-6 text-right">

  <h2 className="text-2xl font-bold">
    الإشعارات
  </h2>

  <p className="text-gray-500 mt-1">
    لديك {unreadCount} إشعار غير مقروء
  </p>

</div>

      {/* FILTER */}
      <div className="max-w-7xl mx-auto flex-row-reverse gap-2 mb-6 justify-end">
        {["all", "unread", "read"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              filter === f
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {f === "all" && `الكل (${notifications.length})`}
            {f === "unread" && `غير مقروء (${unreadCount})`}
            {f === "read" && `مقروء`}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="max-w-7xl mx-auto space-y-4">

        {filtered.map((n) => (
          <div
            key={n.id}
            className={`p-5 rounded-xl flex justify-between items-start transition-all duration-300
            ${!n.is_read
              ? "bg-green-50 border border-gray-200 border-l-4 border-l-green-500 shadow-sm"
              : "bg-white border border-gray-200 hover:shadow-md"}
            `}
          >

            {/* RIGHT */}
            <div className="flex gap-4">

              {getIcon(n.type)}

              <div>
                <h3 className="font-bold text-gray-800">
                  {n.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {n.message}
                </p>

                <div className="flex gap-2 mt-3">

                  {!n.is_read && (
                    <button
                      onClick={() => markRead(n.id)}
                      className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    >
                     ✓ تحديد كمقروء 
                    </button>
                  )}

                  <button
                    onClick={() => deleteNotif(n.id)}
                    className="px-3 py-1 text-sm text-red-500 border border-red-300 rounded hover:bg-red-50"
                  >
                    حذف 🗑
                  </button>

                </div>
              </div>
            </div>

            {/* LEFT TIME */}
            <div className="text-sm text-gray-400 whitespace-nowrap">
              {timeAgo(n.time)}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}