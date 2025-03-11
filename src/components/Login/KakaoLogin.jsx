import React from "react";

const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      console.error("Kakao SDK 로드 실패");
      return;
    }

    window.Kakao.Auth.login({
      scope: "profile_nickname, account_email",
      success: function (response) {
        console.log("카카오 로그인 성공:", response);

        // 카카오에서 받은 액세스 토큰
        const token = response.access_token;

        // 서버로 리디렉트
        const redirectUrl = `https://likelionfesival.shop/oauth2/authorization/kakao?token=${encodeURIComponent(token)}`;
        window.location.href = redirectUrl;
      },
      fail: function (error) {
        console.error("카카오 로그인 실패:", error);
      },
    });
  };

  return (
    <button className="socialLoginButton kakao" onClick={handleKakaoLogin}>
      <img src="/assets/kakao.png" alt="카카오 로그인" className="socialLogo" />
    </button>
  );
};

export default KakaoLoginButton;
