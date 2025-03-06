import React, { useState, useEffect } from "react";
import "../styles/Board.css";

const TagSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentTags, setRecentTags] = useState([]);

  // localStorage에서 최근 검색어 불러오기
  useEffect(() => {
    const storedTags = JSON.parse(localStorage.getItem("recentTags")) || [];
    setRecentTags(storedTags);
  }, []);

  // 태그 검색 시 Enter 키 입력하면 최근 검색어에 추가
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      const updatedTags = [searchTerm, ...recentTags.filter(tag => tag !== searchTerm)].slice(0, 5); // 최신 5개 유지
      setRecentTags(updatedTags);
      localStorage.setItem("recentTags", JSON.stringify(updatedTags)); 
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
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch} // onKeyPress → onKeyDown 변경
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
