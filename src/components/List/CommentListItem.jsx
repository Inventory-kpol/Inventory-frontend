import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid #3e16d1;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    width: 890px;
    background: black;
`;

const ContentText = styled.p`
    font-size: 16px;
    color: white;
`;

//CommentListItem 컴포넌트는 프롭스로 커멘트 객체 하나만 사용한다.
//comment 객체는 사용자가 작성한 댓글 내용이 들어있다.
//이를 스타일드 컴포넌트를 통해 만든 contentText라는 컴포넌트를 이용해서 화면에 표시한다.
//글은 클릭이 가능했지만, 댓글은 별도의 클릭기능이 없기 때문에 온클릭이벤트를 따로 처리해주지 않았습니다
function CommentListItem(props) {
  const { comment } = props;

  return (
    <Wrapper>
      <ContentText>{comment.content}</ContentText>
    </Wrapper>
  );
}

export default CommentListItem;
