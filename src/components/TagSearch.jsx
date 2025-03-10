import React, { useState, useEffect } from "react";
import "../styles/Board.css";

const TagSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentTags, setRecentTags] = useState([]);
  const [isComposing, setIsComposing] = useState(false); // 한글 입력 중인지 상태 저장

  // localStorage에서 최근 검색어 불러오기
  useEffect(() => {
    const storedTags = JSON.parse(localStorage.getItem("recentTags")) || [];
    console.log("Loaded recent tags:", storedTags);
    setRecentTags(storedTags);
  }, []);

  // 태그 검색 시 Enter 키 입력하면 최근 검색어에 추가
  const handleSearch = (e) => {
    if (e.key === "Enter" && !isComposing && searchTerm.trim() !== "") {
      const normalizedSearchTerm = searchTerm.trim();

      setRecentTags((prevTags) => {
        const updatedTags = [
          normalizedSearchTerm,
          ...prevTags.filter(tag => tag.trim() !== normalizedSearchTerm)
        ].slice(0, 5); // 최신 5개 유지

        console.log("Updated recent tags:", updatedTags);
        localStorage.setItem("recentTags", JSON.stringify(updatedTags));
        return updatedTags;
      });

      setSearchTerm("");
    }
  };

  return (
    <div className="tag-sidebar">
      <input
        type="text"
        placeholder="Search tags..."
        className="tag-search"
        value={searchTerm}
        onChange={(e) => {
          console.log("Current input:", e.target.value);
          setSearchTerm(e.target.value);
        }}
        onKeyDown={handleSearch}
        onCompositionStart={() => setIsComposing(true)} // 한글 입력 시작
        onCompositionEnd={() => setIsComposing(false)} // 한글 입력 끝
      />
      <div className="tag-list">
        {recentTags.length > 0 && <p className="tag-header">최근 검색어</p>}
        {recentTags.map((tag, index) => (
          <div key={index} className="tag-item">{tag}</div>
        ))}
      </div>
    </div>
  );
};

export default TagSearch;
