import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header";
import "../../styles/MyPage_Setting.css";
import { useNavigate } from "react-router-dom"; // useNavigate import

{
  /*회원 정보 수정 페이지입니다.*/
}

const MyPage_Setting = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate
  const [user, setUser] = useState();

  return (
    <div>
      <Header />
      <div className="mypage-content">
        <div className="profile-section">
          <img src="/default-profile.png" className="profile-image" />
          {/* 프로필 수정 버튼 */}
          <button>이미지 업로드</button>
        </div>
        <div>
          <p>이름</p>
          <button>이름 수정</button>
        </div>

        <div>
          <p>닉네임</p>
          <button>닉네임 수정</button>
        </div>
        <div>
          <p>비밀번호</p>
          <button>비밀번호 수정</button>
        </div>
      </div>
    </div>
  );
};

export default MyPage_Setting;
