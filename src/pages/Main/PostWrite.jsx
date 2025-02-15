import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

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
    margin-bottom: 16px;
}
}
`;

//postwritepage 컴포넌트는 두개의 state를 가지고 있습니다.
//하나는 글의 제목을 위한 state이고, 다른 하나는 글의 내용을 위한 state입니다.
//두개의 state 모두 useState hook을 이용하여 선언했습니다.
function PostWritePage(props) {
const navigate = useNavigate();

const [title, setTitle] = useState("");
const [content, setContent] = useState("");

return (
<Wrapper>
    <Container>
//실제 화면에 나타나는 부분은 textInput 컴포넌트를 사용하여 글의 제목과 내용을 각각 입력받을 수 있도록 구현했습니다. 
        <TextInput
            height={20}
            value={title}
            onChange={(event) => {
                setTitle(event.target.value);
            }}
        />

        <TextInput
            height={480}
            value={content}
            onChange={(event) => {
                setContent(event.target.value);
            }}
        />
//화면 하단에는 버튼 컴포넌트를 사용해서 글 작성하기를 넣었습니다.
        <Button
            title="글 작성하기"
            onClick={() => {
                navigate("/");
            }}
        />
    </Container>
</Wrapper>
);
}

export default PostWritePage;