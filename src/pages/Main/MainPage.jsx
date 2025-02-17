import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../../components/List/PostList";
import "../../styles/MainPage.css"; // CSS 파일 임포트

function MainPage() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // 데이터 가져오는 함수
        const fetchRankingData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/ranking");
                const data = await response.json();
                setPosts(data);  // 받아온 랭킹 데이터로 업데이트
            } catch (error) {
                console.log("데이터를 가져오는 데 오류가 발생했습니다:", error);
            }
        };

        // 컴포넌트가 마운트될 때 데이터를 처음 한 번 가져옵니다.
        fetchRankingData();

        // 주기적으로 데이터 갱신 (5초)
        const interval = setInterval(fetchRankingData, 5000);

        // 컴포넌트가 언마운트될 때 interval 클리어
        return () => clearInterval(interval);
    }, []);  // 처음 렌더링될 때만 실행되도록 빈 배열 전달

    return (
        <div className="main-wrapper">
            {/* Header */}
            <header className="main-header">
                <h1 className="main-title" >Inventories</h1>
                <div className="search-container">
                    <input type="text" placeholder="Search" className="search-input" />
                    <button className="search-button">Search</button>
                </div>
            </header>

            {/* Post List */}
            <section className="post-list-section">
                <div className="gap">
                    <PostList
                        posts={posts}
                        onClickItem={(item) => {
                            navigate(`/post/${item.id}`);
                        }}
                    />
                </div>
            </section>
        </div>
    );
}

export default MainPage;
