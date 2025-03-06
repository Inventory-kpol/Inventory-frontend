import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profileImage from "../assets/profile.png"; 

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 토글 메뉴 상태
  const [nickname, setNickname] = useState(""); 

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // 현재 상태를 반전
  };

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const response = await fetch("/api/member/page/nickname"); // API 엔드포인트
        if (!response.ok) {
          throw new Error("Failed to fetch nickname");
        }
        const data = await response.json();
        setNickname(data.nickname); // 서버에서 받은 닉네임 설정
      } catch (error) {
        console.error("Error fetching nickname:", error);
      }
    };

    fetchNickname();
  }, []); // 빈 배열로 설정해 컴포넌트 마운트 시 한 번만 실행


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
          {nickname || "연결 안되면 이렇게 됌"} {/* 닉네임 표시 */}
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
          onClick = {toggleMenu}
        />
          {/* 토글 메뉴 */}
          {isMenuOpen && (
            <div style={header_styles.menu}>
              <Link to="/mypage" style={header_styles.menuItem}>
                마이페이지
              </Link>
              <Link to="/mypageSetting" style={header_styles.menuItem}>
                정보 수정
              </Link>
            </div>
          )}
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
  menu: {
    position: "absolute", // 부모 요소 기준으로 위치 설정
    top: "50px", // 프로필 이미지 아래에 위치
    right: 0,
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // 그림자 효과 추가
    display: "flex",
    flexDirection: "column", // 세로 정렬 (밑으로 정렬)
  },
  menuItem: {
    padding: "10px",
    textDecoration: "none",
    color: "#000000", // 링크 색상 (검정)
    fontSize : '14px',
    
   
  }
};

export default Header;
