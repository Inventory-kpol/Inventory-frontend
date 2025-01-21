import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import
import "../../styles/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState(""); // 상태 초기화
  const [password, setPassword] = useState(""); 
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleLogin = () => {
    // 유효성 검사
    if (!email || !password) {
      toast.error("아이디와 비밀번호를 입력해주세요.");
      return;
    }

  navigate("/main");
    // 로그인 처리 로직
    console.log("Logging in with", { email, password, rememberMe });

    // 예시로 로그인 성공 메시지 사용
    toast.success("로그인 성공!");
  };

  const goToSignUp = () => {
    // 회원가입 페이지로 이동
    navigate("/SignUp"); // 'signUp' 경로로 이동
  };

  const handleSocialLogin = (provider) => {
    const socialLoginUrls = {
      kakao: `${process.env.REACT_APP_API}/api/member/login/kakao`,
      google: `${process.env.REACT_APP_API}/api/member/login/google`,
      naver: `${process.env.REACT_APP_API}/api/member/login/naver`,
    };

    window.location.href = socialLoginUrls[provider];
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
          <button
            className="signUpButton"
            onClick={goToSignUp}
          >
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
          <p>소셜 로그인</p>
          <button
            className="socialLoginButton kakao"
            onClick={() => handleSocialLogin("kakao")}
          >
            카카오로 로그인
          </button>
          <button
            className="socialLoginButton google"
            onClick={() => handleSocialLogin("google")}
          >
            구글로 로그인
          </button>
          <button
            className="socialLoginButton naver"
            onClick={() => handleSocialLogin("naver")}
          >
            네이버로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
