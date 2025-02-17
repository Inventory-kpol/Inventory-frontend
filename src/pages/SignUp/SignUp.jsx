import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../../styles/Login.css";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

function SignUp() {
  const [step, setStep] = useState(1); // 현재 단계
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleNextStep = () => {
    // 첫 번째 페이지 유효성 검사
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

    // 이메일 유효성 검사 추가
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("올바른 이메일 주소를 입력해주세요.");
      return;
    }

    setStep(2); // 유효성 검사 통과 후, 두 번째 단계로 넘어감
};


  const handleSignUp = async () => {
    // 모든 입력 데이터 유효성 검사
    if (!nickname.trim()) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }
  
    try {
      // 회원가입 API 요청
      const response = await axios.post("/api/user/signUp", {
        email,
        password,
        username,
        nickname,
      });
  
      // 서버 응답 확인
      if (response.data.success) {
        toast.success("회원가입 완료!");
        navigate("/login"); // 로그인 페이지로 리다이렉트
      } else {
        toast.error(response.data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 요청 오류:", error);
      toast.error("회원가입 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

//   const config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: "/api/user/signUp",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: {
//       username: username,
//       password: password,
//       nickname: nickname,
//       comment: comment,
//     },
//   };

//   // 서버 요청
//   api
//     .request(config)
//     .then((response) => {
//       if (response.status === 200 || response.status === 201) {
//         toast.success("회원가입 성공!");
//         navigate("/login");
//       }
//     })
//     .catch((error) => {
//       if (
//         error.response &&
//         error.response.data.message === "Username already exists"
//       ) {
//         toast.error("이미 존재하는 아이디입니다.");
//       } else {
//         toast.error("서버 연결에 실패했습니다.");
//       }
//     });
// };

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
