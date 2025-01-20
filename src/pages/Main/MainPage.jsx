import React from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../../components/List/PostList";
import data from "../../data.json";
import "../../styles/MainPage.css"; // CSS 파일 임포트

function MainPage() {
    const navigate = useNavigate();

    return (
        <div className="main-wrapper">
            {/* Header */}
            <header className="main-header">
                <h1 className="main-title">Inventories</h1>
                <div className="search-container">
                    <input type="text" placeholder="Search" className="search-input" />
                    <button className="search-button">Search</button>
                </div>
            </header>

            {/* Trending & Likes Section */}
            <section className="rows">
                <div className="content-left">
                    <div className = "columns">
                        <button className="trend-button">Trending</button>
                        <button className="trend-button">Trending</button> 
                        <button className="trend-button">Trending</button>  
                    </div> 
                </div>
                <div className="content-right">
                    <button className="like-button">Likes</button>
                </div>
            </section>

            {/* Tags Section */}
            <section className="tags-section">
                <button className="tag-button">백엔드</button>
                <button className="tag-button">프론트엔드</button>
                <button className="tag-button">인공지능</button>
                <button className="tag-button">게임</button>
                <button className="tag-button">데이터베이스</button>
            </section>

            {/* Post List */}
            <section className="post-list-section">
                <div className="gap">
                <PostList
                    posts={data}
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
