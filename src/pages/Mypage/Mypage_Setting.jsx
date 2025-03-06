import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header";
import "../../styles/MyPage_Setting.css";
import { useNavigate } from "react-router-dom"; // useNavigate import

{
  /*회원 정보 수정 페이지입니다.*/
}

{/*회원 정보 수정 페이지입니다.*/}

const MyPageSetting = () => {
 const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate
 const [userdata, setUserData] = useState({
  nickname: "",
  password: "",
});

 const [message, setMessage] = useState(""); // 성공/실패 메시지 

 const handleUserDataChange = (e) =>{
  const { name, value } = e.target;
  setUserData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

 const handleSubmit = async (e) => {
  e.preventDefault(); // 기본 폼 제출 동작 방지

  try{
    const response = await fetch("/api/members/me",{
      method: "PUT", // HTTP PUT 메서드 사용 (데이터 수정 요청)
      headers: {
        "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 명시
      },
      body: JSON.stringify(userdata), // formData 객체를 JSON 문자열로 변환하여 전송
    });

    if (!response.ok) {
      throw new Error("Failed to update information"); // 요청 실패 시 에러 발생
    }

    const data = await response.json(); // 서버 응답 데이터를 JSON으로 파싱
    console.log(data); // 응답 데이터 확인 (디버깅용)
    setMessage("정보가 성공적으로 수정되었습니다!"); // 성공 메시지 설정
  } catch (error) {
    console.error("Error updating information:", error); // 에러 로그 출력
    setMessage("정보 수정에 실패했습니다."); // 실패 메시지 설정
  }
};


return (
  <div className = "mypage-content">
    <Header />
  <div className="container">
    <h1>개인 정보 수정</h1>
    <form onSubmit={handleSubmit} className="form">
      <div className="input-group">
        <label htmlFor="nickname">닉네임</label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          value={userdata.nickname }
          onChange={handleUserDataChange}
          placeholder="새로운 닉네임 입력"
          className="input"
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          name="password"
          type="password"
          value={userdata.password}
          onChange={handleUserDataChange}
          placeholder="새로운 비밀번호 입력"
          className="input"
        />
      </div>

      <button type="submit" className="button">
        정보 수정하기
      </button>
    </form>

    {message && <p className="message">{message}</p>}
  </div>
  </div>
);
}
export default MyPageSetting;
