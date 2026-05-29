import toast from "react-hot-toast";

export const requireAuth = (navigate) => {

  const token = localStorage.getItem("token");

  if (!token) {

    toast.error("يرجى تسجيل الدخول أولاً", {
      duration: 1500,
      style: {
        direction: "rtl",
        fontFamily: "Cairo",
      },
    });

    setTimeout(() => {
      navigate("/login");
    }, 1500);

    return false;
  }

  return true;
};