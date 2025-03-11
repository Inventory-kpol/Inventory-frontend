import React from "react";
import { KakaoOAuthProvider, KakaoLogin } from "react-kakao-login-sdk"; // 올바른 라이브러리 사용

const KakaoOAuthLogin = () => {
  const handleSuccess = (response) => {
    const token = response.response.access_token; // 카카오 로그인에서 반환하는 access_token
    const redirectUrl = `https://likelionfesival.shop/oauth2/authorization/kakao?token=${encodeURIComponent(token)}`;

    window.location.href = redirectUrl; // 로그인 후 리디렉트
  };

  return (
    <KakaoOAuthProvider clientId="70fd8fe4103c55ed977392dcf5f03836"> 
      <KakaoLogin
        onSuccess={handleSuccess}
        onFail={() => {
          console.error("카카오 로그인 실패");
        }}
        onLogout={() => console.log("카카오 로그아웃")}
        render={(props) => (
          <button className="kakao-login-btn" onClick={props.onClick}>
            카카오 로그인
          </button>
        )}
      />
    </KakaoOAuthProvider>
  );
};

export default KakaoOAuthLogin;
