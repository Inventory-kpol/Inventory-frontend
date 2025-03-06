import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import
import "../../styles/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import googleLogo from "../../assets/google.png";
import kakaoLogo from "../../assets/kakao.png";
import naverLogo from "../../assets/naver.png";

function Login() {
  const [email, setEmail] = useState(""); // 상태 초기화
  const [password, setPassword] = useState(""); 
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleLogin = async () => {
    // 유효성 검사
    if (!email || !password) {
      toast.error("아이디와 비밀번호를 입력해주세요.");
      return;
    }
  
    try {
      // 로그인 API 요청
      const response = await axios.post(`${process.env.REACT_APP_API}/api/member/login`, {
        email,
        password,
      });
  
      // 서버 응답 확인
      if (response.data.accessToken) {
        // 토큰 저장
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
  
        // 로그인 성공 메시지 & 페이지 이동
        toast.success("로그인 성공!");
        navigate("/main");
      } else {
        toast.error("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 요청 오류:", error);
  
      // 서버에서 제공하는 에러 메시지 표시
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const goToSignUp = () => {
    // 회원가입 페이지로 이동
    navigate("/SignUp");
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `${process.env.REACT_APP_API}/api/member/login/${provider}`;
  };

  return (
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
          <button
            className="socialLoginButton google"
            onClick={() => handleSocialLogin("google")}
          >
            <img src={googleLogo} alt="구글" className="socialLogo" /> 
          </button>
          <button
            className="socialLoginButton naver"
            onClick={() => handleSocialLogin("naver")}
          >
            <img src={naverLogo} alt="네이버" className="socialLogo" /> 
          </button>
          <button
            className="socialLoginButton kakao"
            onClick={() => handleSocialLogin("kakao")}
          >
            <img src={kakaoLogo} alt="카카오" className="socialLogo" /> 
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
