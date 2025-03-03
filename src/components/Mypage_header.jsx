import React from "react";
import { Link } from "react-router-dom";
import profileImage from "../assets/profile.png"; 

function Header() {
  return (
    <header style={header_styles.header}>
      {/* 왼쪽: 제목과 사용자 이름 */}
      <div style={header_styles.leftSection}>
        <h1 style={header_styles.title}>
          <Link to="/main" style={header_styles.link}>
            ToyProject2
          </Link>
        </h1>
        <span style={header_styles.username}>
          <Link to="/mypage" style={header_styles.link}>
            username
          </Link>
        </span>
      </div>

      {/* 오른쪽: 글 작성 버튼과 사용자 이미지 */}
      <div style={header_styles.rightSection}>
        <button style={header_styles.button}>
          <Link to="/post-write" style={header_styles.linkButton}>
            글 작성
          </Link>
        </button>
        <img
          src={profileImage} // 기본 프로필 이미지 경로
          alt="프로필"
          style={header_styles.profileImage}
        />
      </div>
    </header>
  );
}

const header_styles = {
  header: {
    position: "fixed", // 상단 고정
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between", // 양쪽 정렬
    alignItems: "center",
    padding: "10px 20px",
    borderBottom: "2px solid #000000",
    backgroundColor: "#ffffff", // 배경색 추가
    zIndex: 1000, // 다른 요소 위에 표시되도록 설정
   
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "normal",
    marginRight: "15px", // 제목과 사용자 이름 간 간격
  },
  username: {
    fontSize: "16px",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px", // 버튼과 이미지 간 간격
  },
  button: {
    padding: "5px 10px",
    backgroundColor: "#F2F1F1", // 파란색 배경
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  linkButton: {
    textDecoration: "none",
    color: "#000000", // 버튼 내부 텍스트 색상 (흰색)
  },
  link: {
    textDecoration: "none",
    color: "#000000", // 일반 텍스트 색상 (검정)
  },
  profileImage: {
    width: "36px", // 프로필 이미지 크기
    height: "36px",
    borderRadius: "50%", // 원형으로 표시
  },
};

export default Header;
