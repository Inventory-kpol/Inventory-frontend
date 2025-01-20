import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function KakaoRedirect() {
  const code = new URL(window.location.href).searchParams.get("code");
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    async function handleKakaoLogin() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/member/login/kakao?code=${code}`
        );
        const ACCESS_TOKEN = res.headers["authorization"];
        const REFRESH_TOKEN = res.headers["refresh-token"];

        setCookie("accessToken", ACCESS_TOKEN, { path: "/" });
        setCookie("refreshToken", REFRESH_TOKEN, { path: "/" });

        navigate("/", { replace: true });
      } catch (error) {
        console.error("Kakao login failed:", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }

    handleKakaoLogin();
  }, [code, setCookie, navigate]);

  return <div>로그인 중입니다...</div>;
}

export default KakaoRedirect;
