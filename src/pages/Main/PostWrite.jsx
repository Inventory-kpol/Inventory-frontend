import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import axios from "axios"; // axios imports
import "../../styles/PostWrite.css"; // 스타일 파일 import

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 720px;
  & > * {
    :not(:last-child) {
    }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  line-height: 1.5;
  padding: 8px;
  box-sizing: border-box;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

function PostWritePage(props) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(""); // 글 제목을 위한 state
  const [content, setContent] = useState(""); // 글 내용을 위한 state
  const [tags, setTags] = useState([]); // 글 태그를 위한 state
  const [tagInput, setTagInput] = useState(""); // 태그 입력 필드 state
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (titleRef.current && contentRef.current) {
        titleRef.current.style.height = "auto";
        titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
        contentRef.current.style.height = "auto";
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [title, content]);

  useEffect(() => {
    if (titleRef.current && contentRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
      contentRef.current.style.height = "auto";
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [title, content]);

  // 태그 추가 함수
  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const tag = tagInput.trim();
      const invalidCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;

      if (invalidCharPattern.test(tag)) {
        alert("태그에는 특수 문자를 포함할 수 없습니다.");
      } else if (tag && !tags.includes(tag)) {
        setTags([...tags, tag]);
      }
      setTagInput(""); // 입력 필드 초기화
      e.preventDefault();
    }
  };

  // 태그 입력 필드에서 키 다운 이벤트 처리 함수
  const handleTagInputKeyDown = (e) => {
    if (e.key === "Backspace" && tagInput === "") {
      handleRemoveTag(tags.length - 1);
    }
  };

  // 태그 삭제 함수
  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handlePostSubmit = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      setIsLoading(true); // 로딩 상태 시작

      await axios.post(
        "/api/board", // 글 작성 API 호출
        { title, content, tags }, // 제목과 내용을 body에 담아서 전송
        {
          headers: {
            // JWT 토큰을 헤더에 담아서 전송
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("글이 성공적으로 작성되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("글 작성 실패:", error);
      alert("글 작성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <Wrapper>
      <Container>
        {/* 제목 입력 */}
        <TextArea
          ref={titleRef}
          maxLength={100}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="제목을 입력하세요"
          rows={1}
          className="textarea"
        />

        {/* 내용 입력 */}
        <TextArea
          ref={contentRef}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="내용을 입력하세요"
          rows={10}
          className="textarea"
        />

        {/* 태그 입력 */}
        <TagsContainer className="tags-container">
          {tags.map((tag, index) => (
            <div className="tag" key={index}>
              <span className="tagSpan">{tag}</span>
              <span className="delete" onClick={() => handleRemoveTag(index)}>
                ×
              </span>
            </div>
          ))}
          <input
            type="text"
            value={tagInput}
            placeholder="태그를 입력하고 Enter를 누르세요"
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              handleAddTag(e);
              handleTagInputKeyDown(e);
            }}
          />
        </TagsContainer>

        {/* 글 작성 버튼 */}
        <Button
          title="글 작성하기"
          onClick={handlePostSubmit}
          disabled={isLoading}
        />
      </Container>
    </Wrapper>
  );
}

export default PostWritePage;
