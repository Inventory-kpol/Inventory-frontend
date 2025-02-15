import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    fontsize: 15px;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid #3e16d1;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    background: black;
    :hover {
        background-color: #3e16d1;
        width: 890px;
    }
`;

const TitleText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;

//타이틀 텍스트를 이용해서 프롭스로 받은 포스트객체에 들어있는 타이틀 문자열을 표시해줍니다.
function PostListItem(props) {
  const { post, onClick } = props;

  return (
    <Wrapper onClick={onClick}>
      <TitleText>{post.title}</TitleText>
    </Wrapper>
  );
}

export default PostListItem;