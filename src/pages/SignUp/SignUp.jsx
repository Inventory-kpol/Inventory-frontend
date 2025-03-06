import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../../styles/Login.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function SignUp() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error("모두 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    const numericOnlyRegex = /^[0-9]+$/;
    if (numericOnlyRegex.test(username)) {
      toast.error("아이디는 숫자로만 이루어질 수 없습니다.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("올바른 이메일 주소를 입력해주세요.");
      return;
    }

    setStep(2);
  };

  const handleSignUp = async () => {
    if (!nickname.trim()) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/member/signup`, {
        email,
        password,
        username,
        nickname,
      });

      if (response.data.success) {
        toast.success("회원가입 완료!");
        navigate("/login");
      } else {
        toast.error(response.data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 요청 오류:", error);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("회원가입 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="content-left">
        <div>
          <p>
            환영합니다, <br />
            <b>Inventory</b> 회원이 <br />
            되어볼까요?
          </p>
        </div>
      </div>
      <div className="vertical-line"></div>
      <div className="content-right">
        {step === 1 ? (
          <>
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
            <div className="inputGroup">
              <label>
                비밀번호 재입력 <span style={{ color: "#be0000" }}> * </span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
              />
            </div>
            <button onClick={handleNextStep} className="loginButton">
              다음
            </button>
          </>
        ) : (
          <>
            <div className="inputGroup">
              <label>
                이름 <span style={{ color: "#be0000" }}> * </span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
              />
            </div>
            <div className="inputGroup">
              <label>
                닉네임 <span style={{ color: "#be0000" }}> * </span>
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="input"
              />
            </div>
            <button onClick={handleSignUp} className="loginButton">
              회원가입 완료
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SignUp;
