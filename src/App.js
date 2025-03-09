import { Route, Routes } from "react-router-dom";

import SocialRedirect from "./pages/Redirect/SocialRedirect";

import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import LoginBase from "./components/Login/LoginBase";

import MainPage from "./pages/Main/MainPage";
import PostWritePage from "./pages/Main/PostWrite";
import PostViewPage from "./pages/Main/PostView";

import Board from "./pages/Board/Board"
import Column from "./pages/Column/Column";

import MyPage from "./pages/Mypage/Mypage";

export default function App() {
  return (
    <Routes>
      {/* 로그인 관련 경로 */}
      <Route element={<LoginBase />}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login/:provider" element={<SocialRedirect />} />
      </Route>
      
      {/* 메인 페이지 및 게시글 관련 경로 */}
      <Route path="/main" element={<MainPage />} />
      <Route path="/post-write" element={<PostWritePage />} />
      <Route path="/post/:postId" element={<PostViewPage />} />

      {/* 보드 페이지 관련 경로 */}
      <Route path="/board" element={<Board />} />
      <Route path="/column" element={<Column />} />

       {/* 마이페이지 관련 경로 */}
       <Route path="/mypage" element={<MyPage />} />

      {/* 잘못된 경로 처리 */}
      <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
    </Routes>
  );
}
