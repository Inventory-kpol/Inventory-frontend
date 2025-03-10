import React, { useState, useEffect, useParams } from "react";
import { useNavigate, Link } from "react-router-dom"; // useNavigate import
import axios from "axios";
import Header from "../../components/header";
import "../../styles/MyPage.css";

const MyPage = () => {
  const [viewMode, setViewMode] = useState("written"); // 현재 보기 모드, 3개의 보기모드가 있다.
  const [posts, setPosts] = useState([]); // 탭별 데이터
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        /*
        const token = localStorage.getItem("token"); // JWT 토큰 가져오기
        if (!token) {
          console.error("로그인 토큰이 없습니다.");
          return;
        } */

        let response; // API 응답 데이터
        if (viewMode === "written") {
          // 작성글 목록 조회 API 호출
          response = await axios.get("/api/members/me/boards", {
            /* headers: { Authorization: `Bearer ${token}` }, */
          });
        } else if (viewMode === "liked") {
          // 좋아요 목록 조회 API 호출
          response = await axios.get("/api/members/me/liked-boards", {
            /* headers: { Authorization: `Bearer ${token}` }, */
          });
        } else {
          setPosts([]); // 댓글 단 포스트 등 다른 경우 처리
          return;
        }

        setPosts(response.data); // API 응답 데이터를 상태로 저장
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, [viewMode]); // viewMode가 변경될 때마다 실행

  return (
    <div>
      <Header />
      <div className="mypage-content">
        <div className="Main-container">
          {/* 탭 버튼 세개 */}
          <div className="tab-buttons">
            <button
              className={viewMode === "written" ? "active" : ""}
              onClick={() => setViewMode("written")}
            >
              작성한 포스트
            </button>
            <button
              className={viewMode === "liked" ? "active" : ""}
              onClick={() => setViewMode("liked")}
            >
              좋아한 포스트
            </button>
            <button
              className={viewMode === "commented" ? "active" : ""}
              onClick={() => setViewMode("commented")}
            >
              댓글 단 포스트
            </button>
          </div>
          {/* 카드 리스트 */}
          <div className="post-list">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="post-card"
                  onClick={() => navigate(`/post/${post.id}`)}
                  style={{ cursor: "pointer" }} // 클릭 가능한 스타일 추가
                >
                  <h3>{post.title}</h3>
                  <p>{post.content.substring(0, 50)}...</p>
                  <div className="post-meta">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>{post.comments.length}개의 댓글</span>
                    <span>좋아요 수 : {post.likeCount}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>포스트가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
