import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Mypage_header";
import "../../styles/MyPage.css";
import { useNavigate } from "react-router-dom"; // useNavigate import
const MyPage = () => {
  const [posts, setPosts] = useState([]); // 왼쪽 컨테이너에 표시할 데이터
  const [viewMode, setViewMode] = useState("profile"); // 현재 보기 모드 (profile, written, liked, commented)
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate
  // 더미 데이터

  const dummyCommentedPosts = [
    { id: 3, title: "댓글 단 글 1", content: "이것은 댓글을 단 게시글입니다." },
    { id: 4, title: "댓글 단 글 2", content: "이것은 두 번째 댓글을 단 게시글입니다." },
  ];

  // 보기 모드에 따라 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (viewMode === "written") {
          // 작성한 글 API 호출
          response = await axios.get("/api/members/me/boards");
        } else if (viewMode === "liked") {
          // 좋아요 누른 글 API 호출
          response = await axios.get("/api/members/me/liked-boards");
        } else if (viewMode === "commented") {
          // 댓글 단 글은 더미 데이터 사용
          setPosts(dummyCommentedPosts);
          return;
        } else {
          setPosts([]); // 프로필 모드일 때는 빈 화면
          return;
        }
        setPosts(response.data); // API 응답 데이터를 상태에 저장
      } catch (error) {
        console.error(`Error fetching ${viewMode} data:`, error);
      }
    };

    fetchData();
  }, [viewMode]); // viewMode가 변경될 때마다 실행

  return (
    <div>
      <Header />
      <div className="container">
        {/* 왼쪽 컨테이너 */}
        <div className="left-container">
          {viewMode === "profile" ? (
            <p>프로필 정보를 선택하세요.</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            ))
          ) : (
            <p>데이터가 없습니다.</p>
          )}
        </div>

        {/* 오른쪽 컨테이너 */}
        <div className="right-container">
          <div className="profile-section">
            <img
              src="/default-profile.png"
          
              className="profile-image"
            />
            <p> </p>
          {/* 프로필 수정 버튼 */}
            <button onClick={() => navigate("/profile/edit")}>프로필 수정</button>
          </div>
          <div className="stats-section">
            {/* 버튼들 */}
            <button onClick={() => setViewMode("written")}>작성한 글</button>
            <button onClick={() => setViewMode("liked")}>좋아요 누른 글</button>
            <button onClick={() => setViewMode("commented")}>댓글 단 글</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
