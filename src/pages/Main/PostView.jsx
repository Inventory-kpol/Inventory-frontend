import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../../components/List/CommentList";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import data from "../../data.json";

const Wrapper = styled.div`
    width: 100%;
    height: 100vh; /* 화면 전체 높이를 기준으로 */
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto; /
    padding: 16px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 890px;
  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

const PostContainer = styled.div`
  padding: 8px 16px;
  border: 1px solid #3e16d1;
  border-radius: 8px;
`;

const TitleText = styled.p`
  font-size: 28px;
  font-weight: 500;
  color: white;
`;

const ContentText = styled.p`
  font-size: 20px;
  line-height: 32px;
  white-space: pre-wrap;
  color: white;
`;

const CommentLabel = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: white;
  margin-top: 32px;
  margin-bottom: 12px;
`;

function PostViewPage(props) {
  const navigate = useNavigate();
  const { postId } = useParams();

  const post = data.find((item) => {
    return item.id == postId;
  });

  const [comments, setComments] = useState(post.comments || []);
  const [comment, setComment] = useState("");

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        content: comment,
      };

      setComments([...comments, newComment]);
      setComment("");
    }
  };

  return (
    <Wrapper>
      <Container>
        <Button
          title="뒤로 가기"
          onClick={() => {
            navigate("/main");
          }}
        />
        <PostContainer>
          <TitleText>{post.title}</TitleText>
          <ContentText>{post.content}</ContentText>
        </PostContainer>

        <CommentLabel>댓글</CommentLabel>
        <CommentList comments={comments} />

        <TextInput
          height={40}
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
        <Button title="댓글 작성하기" onClick={handleAddComment} />
      </Container>
    </Wrapper>
  );
}

export default PostViewPage;
