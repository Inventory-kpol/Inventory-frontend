import React, { useState, useEffect } from "react";
import Header from "../../components/header"; // 이미 구현된 헤더
import "../../styles/MyPage_Setting.css";
import profileImagePlaceholder from "../../assets/profile.png"; // 기본 프로필 이미지

const MyPageSetting = () => {
  const [originalData, setOriginalData] = useState({
    nickname: "",
  });

  const [userdata, setUserData] = useState({
    nickname: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false); // 정보 수정 모드 여부
  const [message, setMessage] = useState("");

  // 페이지 로딩 시 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/members/me");
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();

        setOriginalData({
          nickname: data.nickname,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = {};
    if (userdata.nickname.trim()) updatedFields.nickname = userdata.nickname;
    if (userdata.password.trim()) updatedFields.password = userdata.password;

    if (Object.keys(updatedFields).length === 0) {
      setMessage("변경할 정보를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("/api/members/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) throw new Error("Failed to update information");

      setMessage("정보가 성공적으로 수정되었습니다!");
      setOriginalData((prev) => ({
        ...prev,
        ...updatedFields,
      }));
      setUserData({ nickname: "", password: "" });
      setIsEditing(false); // 수정 모드 종료
    } catch (error) {
      console.error("Error updating information:", error);
      setMessage("정보 수정에 실패했습니다.");
    }
  };

  return (
    <div className="mypage-content">
      <Header />
      <div className="container">
        {/* 왼쪽: 프로필 이미지 */}
        <div className="profile-image-container">
          <img
            src={profileImagePlaceholder}
            alt="프로필"
            className="profile-image"
          />
          <button className="button">이미지 업로드</button>
        </div>

        {/* 오른쪽: 닉네임 및 정보 수정 */}
        <div className="profile-info-container">
          {!isEditing ? (
            <>
              <h2>{originalData.nickname}닉네임..</h2>
              <button
                id="edit-button"
                className="button"
                onClick={() => setIsEditing(true)} // 정보 수정 모드 활성화
              >
                정보 수정
              </button>
            </>
          ) : (
            /* 정보 수정 폼 */
            <form onSubmit={handleSubmit} className="form">
              <div className="input-group">
                <label htmlFor="nickname">새로운 닉네임</label>
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  value={userdata.nickname}
                  onChange={handleUserDataChange}
                  placeholder={originalData.nickname}
                  className="input"
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">새로운 비밀번호</label>
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
                저장하기
              </button>
              <button
                type="button"
                className="button cancel-button"
                onClick={() => setIsEditing(false)} // 수정 취소
              >
                취소하기
              </button>
            </form>
          )}
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default MyPageSetting;
