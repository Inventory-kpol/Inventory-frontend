import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Mypage_header";
import "../../styles/MyPage.css";

import { useNavigate } from "react-router-dom"; // useNavigate import



const MyPage = () => {
  const [viewMode, setViewMode] = useState("written"); // 현재 보기 모드, 3개의 보기모드가 있다. 
  const [posts, setPosts] = useState([]); // 탭별 데이터 
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  /*
  // 더미 데이터 (댓글 단 포스트)
  const dummyPosts = [
    {
      userId: 1,
      nickname: "짱구야",
      title: "Velog 글 작성법",
      content: "Velog에서 글 작성하는 방법...",
      createdAt: "2025-03-01T12:00:00Z",
      likeCount: 136,
      comments: [{ id: 1 }, { id: 2 }, { id: 3 }],
    },
    {
      userId: 2,
      nickname: "철수",
      title: "React 시작하기",
      content: "React 프로젝트를 시작하는 방법...",
      createdAt: "2025-02-28T10:30:00Z",
      likeCount: 45,
      comments: [{ id: 1 }],
    },
  ];
  
  const dummyCommentedPosts = [
    {
      userId: 1,
      nickname: "짱구야",
      title: "댓글 단 글 제목",
      content:
        "이것은 댓글을 단 게시글입니다. 댓글을 달아보니 재미있네요!",
      createdAt: "2025-03-02T15:00:00Z",
      likeCount: 20,
      comments: [{ id: 1 }, { id: 2 }],
    },
  ];

  // 보기 모드에 따라 데이터 필터링
  useEffect(() => {
    if (viewMode === "written") {
      setPosts(dummyPosts.filter((post) => post.userId === 1)); // 작성한 포스트 필터링
    } else if (viewMode === "liked") {
      setPosts(dummyPosts); // 좋아한 포스트 예시로 전체 출력
    } else if (viewMode === "commented") {
      setPosts(dummyCommentedPosts); // 댓글 단 포스트
    }
  }, [viewMode]);
  */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT 토큰 가져오기

        if(!token)
        {console.error("로그인 토큰이 없습니다.");
          return ;
        }
        let response;
        if(viewMode === "written"){
          response = await axios.get("/api/members/me/boards", {
            headers: {Authorization: `Bearer ${token}`},

          });
          setPosts(response.data);
        }

        else {
          setPosts([]);
        }
      }catch(error){
        console.error("데이터 가져오기 실패:",error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [viewMode]);

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
                <div key={post.id} className="post-card" onClick = {() => navigate(`/post/${post.id}`)} >
                  <h3>{post.title}</h3>    
                  <p>{post.content.substring(0, 50)}...</p> {/* 내용 일부만 표시 */}
                  <div className="post-meta">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span> {/* 작성일 */}
                    <span>{post.comments.length}개의 댓글</span> {/* 댓글 수 */}
                    <span>좋아요 수 : {post.likeCount}</span> {/* 좋아요 수 */}
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