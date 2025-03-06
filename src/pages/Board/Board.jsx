import React from "react";
import Written from "../../components/Written";
import TagSearch from "../../components/TagSearch";
import "../../styles/Board.css";

const Board = () => {
  const blogs = [
    {
      title: "개발자 칼럼 이야기",
      description: "안녕하세요. 제가 개발을 시작해봤는데 이 이야기가 참 재밌을 것 같네요.",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "리액트 기초 다지기",
      description: "리액트는 정말 강력한 라이브러리입니다. JSX가 매우 중요합니다!",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "백엔드 개발자가 되는 길",
      description: "Spring Boot와 Node.js 중에서 어떤 것을 선택해야 할까요?",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "프론트엔드 개발자가 되는 길",
      description: "React와 Angular 중에서 어떤 것을 선택해야 할까요?",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Android 개발자 되는 길",
      description: "Kotlin 하나부터 열까지 배워가기",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "인공지능 개발자가 되는 길",
      description: "머신 러닝을 알면 딥러닝은 쉽다",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="board-container">
      <div className="blog-list-container">
        <div className="blog-list">
          {blogs.map((blog, index) => (
            <Written key={index} {...blog} />
          ))}
        </div>
       
      </div>
      <TagSearch />
      
    </div>
  );
};

export default Board;
