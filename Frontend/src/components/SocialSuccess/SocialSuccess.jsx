import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SocialSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
      window.location.reload();
    } else {
      navigate("/login");
    }
  }, []);

  return <div>Logging in...</div>;
}