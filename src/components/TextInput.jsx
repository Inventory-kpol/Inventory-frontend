import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 720px;
  ${(props) =>
    props.height &&
    `
        height: ${props.height}px;
    `}
  padding: 16px;
  font-size: 16px;
  line-height: 10px;
  flex: 1;
  margin-top: 35px;
  font-size: 16px;
  border-color: rgb(0, 0, 0);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.96);
  color: rgb(0, 0, 0);
  outline: none;
`;

function TextInput(props) {
  const { height, value, onChange } = props;

  return <StyledTextarea height={height} value={value} onChange={onChange} />;
}

export default TextInput;
