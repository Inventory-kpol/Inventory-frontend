import "../../styles/MyPage.css"; // CSS 파일 임포트
import React from "react";
import Header from "../../components/Mypage_header"; // Header 파일 
import  { useRef, useEffect, useState } from "react";
import axios from "axios";

 
const MyPage = () => {
  const inputRef = useRef();

  useEffect(() => {
    //console.log(inputRef);
    inputRef.current.focus(); //포커스를 잡아줍니다. 
  }, []);
  
  const login = () => {
    alert(`환영합니다 ${inputRef.current.value}!`);
    inputRef.current.focus();
  };

  return (
    <div>
      <Header />
      <input ref = {inputRef} type = "text" placeholder = "username" />
      <button onClick={login}>로그인</button>
      

        <div className = "container">
          <div className = "left-container">
            지금까지 쓴글이 들어갈것임.
          </div>
          <div className = "right-container">
            개인정보 
          </div>
        </div>
    
      
    </div>
  );
};

export default MyPage;


/*
1.usestate로 상태를 관리한다.
  posts 라는 사애를 만들어서 API에서 가져온 데이터를 저장한다

2. useEffect로 API 호출
  컴포넌트가 처음 렌더링 될때 한번만 실행하도록 useEffect를 사용한다
  이때 axios.get을 사용하고 이를 통해 데이터를 가져온다. 

3. 데이터 렌더링
  post.map()을 사용해 가져온 데이터를 가드 형태로 렌더링한다
*/
