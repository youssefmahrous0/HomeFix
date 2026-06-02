import React, {
  useEffect,
  useState
} from "react";

import {
  Search,
  Filter,
  Star,
  ThumbsDown,
  Eye,
  Trash2
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";

const API_URL =
  "https://homefix-production-0bc9.up.railway.app/admin/reviews";

export default function AdminReviews() {

  const [reviews, setReviews] =
    useState([]);

  const [stats, setStats] =
    useState({});

  const [search, setSearch] =
    useState("");

  const [ratingFilter, setRatingFilter] =
    useState("");

  const [loading, setLoading] =
    useState(true);

 const [selectedReview, setSelectedReview] =
  useState(null);

  // =====================================================
  // FETCH
  // =====================================================

  const fetchReviews = async () => {

    try {

      const res = await fetch(API_URL);

      const data = await res.json();

      setReviews(data.reviews || []);

      setStats({
        total_reviews:
          data.total_reviews,

        average_rating:
          data.average_rating,

        five_star_reviews:
          data.five_star_reviews,

        negative_reviews:
          data.negative_reviews,
      });

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchReviews();

  }, []);

  // =====================================================
  // DELETE REVIEW
  // =====================================================

  const deleteReview = async (id) => {

    if (
      !window.confirm(
        "هل تريد حذف التقييم؟"
      )
    ) return;

    try {

      await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE"
        }
      );

      fetchReviews();

    } catch (err) {

      console.log(err);

    }

  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredReviews =
    reviews.filter((review) => {

      const matchesSearch =

        review.customer
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        review.provider
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        review.order_number
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesRating =

        ratingFilter === ""
          ? true
          : review.rating ==
            ratingFilter;

      return (
        matchesSearch &&
        matchesRating
      );

    });

  const today =
    new Date().toLocaleDateString(
      "ar-EG",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  
  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="min-h-screen bg-[#F5F5F5] flex">

      <AdminSidebar />

      <div className="flex-1">

        {/* DATE */}

        <div className="bg-white border-b border-gray-200 px-8 py-6">

          <p className="text-right text-gray-500 text-lg font-medium">
            {today}
          </p>

        </div>

        <div className="p-8">

          {/* HEADER */}

          <div className="mb-8 text-right">

            <h1 className="text-[56px] font-black text-[#111827] mb-2">
              إدارة التقييمات
            </h1>

            <p className="text-[#6B7280] text-2xl">
              عرض ومراجعة تقييمات العملاء
            </p>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-4 gap-6 mb-8">

            {/* TOTAL */}

            <div className="bg-white rounded-[24px] p-6 shadow-sm flex items-center justify-between">

              <div className="text-right">

                <p className="text-gray-500 text-lg mb-2">
                  إجمالي التقييمات
                </p>

                <h3 className="text-5xl font-black text-[#111827]">
                  {
                    stats.total_reviews || 0
                  }
                </h3>

              </div>

              <div className="w-16 h-16 rounded-full bg-[#00B140] flex items-center justify-center">

                <Star
                  color="white"
                  size={28}
                />

              </div>

            </div>

            {/* AVERAGE */}

            <div className="bg-white rounded-[24px] p-6 shadow-sm flex items-center justify-between">

              <div className="text-right">

                <p className="text-gray-500 text-lg mb-2">
                  متوسط التقييم
                </p>

                <h3 className="text-5xl font-black text-yellow-500 flex items-center gap-2">
                  ⭐ {
                    stats.average_rating || 0
                  }
                </h3>

              </div>

              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">

                <Star
                  color="#EAB308"
                  size={28}
                />

              </div>

            </div>

            {/* FIVE STAR */}

            <div className="bg-white rounded-[24px] p-6 shadow-sm flex items-center justify-between">

              <div className="text-right">

                <p className="text-gray-500 text-lg mb-2">
                  تقييمات 5 نجوم
                </p>

                <h3 className="text-5xl font-black text-[#00B140]">
                  {
                    stats.five_star_reviews || 0
                  }
                </h3>

              </div>

              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">

                <ThumbsDown
                  color="#00B140"
                  size={28}
                />

              </div>

            </div>

            {/* NEGATIVE */}

            <div className="bg-white rounded-[24px] p-6 shadow-sm flex items-center justify-between">

              <div className="text-right">

                <p className="text-gray-500 text-lg mb-2">
                  تقييمات سلبية
                </p>

                <h3 className="text-5xl font-black text-red-500">
                  {
                    stats.negative_reviews || 0
                  }
                </h3>

              </div>

              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">

                <ThumbsDown
                  color="#EF4444"
                  size={28}
                />

              </div>

            </div>

          </div>

          {/* FILTERS */}

          <div className="bg-white rounded-[30px] shadow-sm p-6 mb-8">

            <div className="flex items-center gap-4">

              {/* SEARCH */}

              <div className="flex-1 relative">

                <input
                  type="text"
                  placeholder="
                    البحث باسم العميل، مقدم الخدمة أو رقم الطلب...
                  "
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-[64px]
                    rounded-2xl
                    bg-[#F5F5F5]
                    pr-5
                    pl-16
                    text-lg
                    outline-none
                  "
                />

                <Search
                  className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                  "
                  size={28}
                  color="#9CA3AF"
                />

              </div>

                
                {/* FILTER */}

              <div className="h-[64px] min-w-[170px] rounded-2xl bg-[#F5F5F5] px-5 flex items-center gap-3">

                <select
                  value={ratingFilter}
                  onChange={(e) =>
                    setRatingFilter(
                      e.target.value
                    )
                  }
                  className="bg-transparent outline-none text-lg w-full"
                >

                  <option value="">
                    الكل
                  </option>

                  <option value="5">
                    5 نجوم
                  </option>

                  <option value="4">
                    4 نجوم
                  </option>

                  <option value="3">
                    3 نجوم
                  </option>

                  <option value="2">
                    2 نجوم
                  </option>

                  <option value="1">
                    1 نجمة
                  </option>

                </select>

              </div>

              {/* TYPE */}

              <div className="h-[64px] min-w-[220px] rounded-2xl bg-[#F5F5F5] px-5 flex items-center gap-3">

                <Filter
                  size={20}
                  color="#9CA3AF"
                />

                <select
                  className="bg-transparent outline-none text-lg w-full"
                >

                  <option>
                    كل التقييمات
                  </option>

                </select>

              </div>
              

            </div>

          </div>

          {/* REVIEWS */}

<div className="space-y-6">

  {filteredReviews.map((review) => (

    <div
      key={review.id}
      className={`
        bg-white
        rounded-[26px]
        p-7
        shadow-sm
        border
        transition-all

        ${
          review.rating <= 2
            ? "border-red-300"
            : "border-[#E5E7EB]"
        }
      `}
    >

      {/* HEADER */}

      <div className="flex items-start justify-between">

        {/* RIGHT */}

        <div className="text-right">

          <div className="
            flex
            items-center
            justify-end
            gap-2
            mb-1
          ">

            {
              review.rating <= 2 && (

                <span
                  className="
                    bg-red-500
                    text-white
                    text-xs
                    font-bold
                    px-3
                    py-1
                    rounded-full
                  "
                >
                  سيء جدًا
                </span>

              )
            }

            <h3
              className="
                text-[32px]
                leading-none
                font-black
                text-[#111827]
              "
            >
              {review.customer}
            </h3>

          </div>

          <p
            className="
              text-[#6B7280]
              text-lg
            "
          >
            قيّم {review.provider}
          </p>

        </div>

        {/* LEFT */}

<div className="flex items-start gap-4">

  {/* STARS + DATE */}

  <div className="flex flex-col items-start">

    {/* STARS */}

    <div className="flex items-center gap-[2px]">

      {
        [...Array(5)].map((_, i) => (

          <Star
            key={i}
            size={16}
            strokeWidth={1.8}
            fill={
              i < review.rating
                ? "#FACC15"
                : "white"
            }
            color={
              i < review.rating
                ? "#FACC15"
                : "#D1D5DB"
            }
          />

        ))
      }

    </div>

    {/* DATE */}

    <p
      className="
        text-[#9CA3AF]
        text-[13px]
        font-medium
        mt-[2px]
      "
    >
      {review.date}
    </p>

  </div>

  {/* BUTTONS */}

  <div className="flex flex-col gap-2">

    <button
  onClick={() =>
    setSelectedReview(review)
  }
  className="
    h-[38px]
    px-5
    rounded-xl
    border
    border-[#D1D5DB]
    bg-white
    text-[14px]
    font-bold
    text-[#374151]
    hover:bg-gray-50
    transition-all
  "
>
  عرض التفاصيل
</button>

    {
      review.rating <= 2 && (

        <button
          onClick={() =>
            deleteReview(review.id)
          }
          className="
            h-[38px]
            px-5
            rounded-xl
            bg-red-500
            text-white
            text-[14px]
            font-bold
            hover:bg-red-600
            transition-all
          "
        >
          حذف التقييم
        </button>

      )
    }

  </div>

</div>

      </div>

      

      {/* COMMENT */}

      <div
        className="
          mt-6
          bg-[#F9FAFB]
          rounded-2xl
          px-6
          py-5
          text-left
        "
      >

        <p
          className="
            text-[#374151]
            text-lg
            leading-8
          "
        >
          {review.comment}
        </p>

      </div>

      {/* FOOTER */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-start
          gap-4
          text-[#6B7280]
          text-base
          flex-wrap
        "
      >

        <span>
          👍 {review.helpful_count} شخص وجدوا هذا مفيدًا
        </span>

        <span>•</span>

        <span>
          رقم الطلب:
          {" "}
          {review.order_number}
        </span>

        <span>•</span>

        <span>
          الخدمة:
          {" "}
          {review.service}
        </span>

      </div>

    </div>

  ))}

         </div>

        </div>

      </div>
      
      {/* REVIEW MODAL */}

{
  selectedReview && (

    <div
      className="
        fixed
        inset-0
        bg-black/40
        z-50
        flex
        items-center
        justify-center
      "
    >

      <div
        className="
          bg-white
          w-full
          max-w-[700px]
          rounded-[30px]
          p-8
          relative
        "
      >

        {/* CLOSE */}

        <button
          onClick={() =>
            setSelectedReview(null)
          }
          className="
            absolute
            left-6
            top-6
            text-3xl
            text-gray-400
          "
        >
          ×
        </button>

        {/* TITLE */}

        <h2
          className="
            text-4xl
            font-black
            mb-8
            text-right
          "
        >
          تفاصيل التقييم
        </h2>

        {/* USER */}

        <div className="mb-6 text-right">

          <h3 className="text-2xl font-bold mb-2">
            {selectedReview.customer}
          </h3>

          <p className="text-gray-500">
            قيّم
            {" "}
            {selectedReview.provider}
          </p>

        </div>

        {/* STARS */}

        <div className="
          flex
          justify-end
          gap-1
          mb-6
        ">

          {
            [...Array(5)].map((_, i) => (

              <Star
                key={i}
                size={24}
                fill={
                  i <
                  selectedReview.rating
                    ? "#FACC15"
                    : "none"
                }
                color={
                  i <
                  selectedReview.rating
                    ? "#FACC15"
                    : "#D1D5DB"
                }
              />

            ))
          }

        </div>

        {/* COMMENT */}

        <div
          className="
            bg-[#F9FAFB]
            rounded-2xl
            p-6
            text-right
            mb-6
          "
        >

          <p
            className="
              text-lg
              leading-9
              text-gray-700
            "
          >
            {selectedReview.comment}
          </p>

        </div>

        {/* INFO */}

        <div className="
          grid
          grid-cols-2
          gap-6
          text-right
        ">

          <div>

            <p className="text-gray-500 mb-1">
              رقم الطلب
            </p>

            <h4 className="font-bold text-xl">
              {
                selectedReview.order_number
              }
            </h4>

          </div>

          <div>

            <p className="text-gray-500 mb-1">
              الخدمة
            </p>

            <h4 className="font-bold text-xl">
              {
                selectedReview.service
              }
            </h4>

          </div>

          <div>

            <p className="text-gray-500 mb-1">
              التاريخ
            </p>

            <h4 className="font-bold text-xl">
              {
                selectedReview.date
              }
            </h4>

          </div>

          <div>

            <p className="text-gray-500 mb-1">
              عدد الإعجابات
            </p>

            <h4 className="font-bold text-xl">
              👍 {
                selectedReview.helpful_count
              }
            </h4>

          </div>

        </div>

      </div>

    </div>

  )
}
      

    </div>

  );

}