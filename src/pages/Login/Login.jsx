import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../../styles/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import KakaoLoginButton from "../../components/Login/KakaoLogin"; // 🔹 수정된 KakaoLogin import
import googleLogo from "../../assets/google.png";
import kakaoLogo from "../../assets/kakao.png";
import naverLogo from "../../assets/naver.png";

function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("아이디와 비밀번호를 입력해주세요.");
      return;
    }
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/member/login`, {
        email,
        password,
      });

      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        toast.success("로그인 성공!");
        navigate("/main");
      } else {
        toast.error("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 요청 오류:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const goToSignUp = () => {
    navigate("/SignUp");
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const redirectUrl = `https://likelionfesival.shop/oauth2/authorization/google?token=${encodeURIComponent(token)}`;
    window.location.href = redirectUrl;
  };

  return (
    <GoogleOAuthProvider clientId="869724397420-1h9flrvdu1k3sdgclu34nfn2d4f3r5fb.apps.googleusercontent.com">
      <div className="container">
        <ToastContainer />
        <div className="content-left">
          <div>
            <p>
              Inventory의 <br />
              회원이 아직인가요?
            </p>
          </div>
          <div>
            <button className="signUpButton" onClick={goToSignUp}>
              회원가입
            </button>
          </div>
        </div>
        <div className="vertical-line"></div>
        <div className="content-right">
          <div className="inputGroup">
            <label>
              이메일 <span style={{ color: "#be0000" }}> * </span>
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label>
              비밀번호 <span style={{ color: "#be0000" }}> * </span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>
          <div className="checkboxContainer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label>로그인 저장</label>
          </div>
          <button className="loginButton" onClick={handleLogin}>
            로그인
          </button>

          <div className="socialLoginContainer">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("구글 로그인 실패")}
              render={(props) => (
                <button className="socialLoginButton google" onClick={props.onClick}>
                  <img src={googleLogo} alt="구글" className="socialLogo" />
                </button>
              )}
            />
            
            <button
              className="socialLoginButton naver"
              onClick={() => window.location.href = `${process.env.REACT_APP_API}/api/member/login/naver`}
            >
              <img src={naverLogo} alt="네이버" className="socialLogo" /> 
            </button>

            <KakaoLoginButton /> {/* 🔹 올바른 Kakao 로그인 컴포넌트 적용 */}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
