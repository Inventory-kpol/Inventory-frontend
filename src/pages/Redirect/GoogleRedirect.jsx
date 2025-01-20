import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function GoogleRedirect() {
  const code = new URL(window.location.href).searchParams.get("code"); // 현재 URL에서 코드 추출
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    async function handleGoogleLogin() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/member/login/google?code=${code}`
        );
        const ACCESS_TOKEN = res.headers["authorization"];
        const REFRESH_TOKEN = res.headers["refresh-token"];

        setCookie("accessToken", ACCESS_TOKEN, { path: "/" });
        setCookie("refreshToken", REFRESH_TOKEN, { path: "/" });

        navigate("/", { replace: true }); // 로그인 완료 시 메인으로 이동
      } catch (error) {
        console.error("Google login failed:", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }

    handleGoogleLogin();
  }, [code, setCookie, navigate]);

  return <div>로그인 중입니다...</div>; // 사용자에게 로딩 상태 표시
}

export default GoogleRedirect;
