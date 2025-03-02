import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";

function SocialRedirect() {
  const location = useLocation();
  const provider = location.pathname.split("/").pop(); // "kakao", "google", "naver" 추출
  const code = new URL(window.location.href).searchParams.get("code"); // 현재 URL에서 code 추출
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    async function handleSocialLogin() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/member/login/${provider}?code=${code}`
        );
        const ACCESS_TOKEN = res.headers["authorization"];
        const REFRESH_TOKEN = res.headers["refresh-token"];

        setCookie("accessToken", ACCESS_TOKEN, { path: "/" });
        setCookie("refreshToken", REFRESH_TOKEN, { path: "/" });

        navigate("/", { replace: true }); // 로그인 완료 후 메인으로 이동
      } catch (error) {
        console.error(`${provider} login failed:`, error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }

    handleSocialLogin();
  }, [code, provider, setCookie, navigate]);

  return <div>{provider} 로그인 중입니다...</div>; // 사용자에게 로딩 메시지 표시
}

export default SocialRedirect;
