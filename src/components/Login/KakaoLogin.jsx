import styled from "styled-components";
import kakaoImage from "../assets/kakao.png"; 

function KakaoLogin() {
  const KAKAO_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <a href={KAKAO_URI}>
      <KakaoLoginBtn src={kakaoImage} alt="kakaologin"></KakaoLoginBtn>
    </a>
  );
}

const KakaoLoginBtn = styled.img`
  width: 50px;
  height: 50px;
`;

export default KakaoLogin;
