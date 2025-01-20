import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    flex: 1;
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 8px;
    border: 1px solid #3e16d1;
    background-color: black;
    color: white;
    cursor: pointer;
    margin-top: 32px;
    margin-bottom: 32px;
`;

function Button(props) {
  const { title, onClick } = props;

  return <StyledButton onClick={onClick}>{title || "button"}</StyledButton>;
}

export default Button;