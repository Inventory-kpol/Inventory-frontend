import styled from "styled-components";
import googleImage from "../assets/google.png"; 

function GoogleLogin() {
  const GOOGLE_URI = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20openid&response_type=code&redirect_uri=${REDIRECT_URI}&client_id=${REST_API_KEY}`;

  return (
    <a href={GOOGLE_URI }>
      <GoggleLoginBtn src={googleImage} alt="googlelogin"></GoggleLoginBtn>
    </a>
  );
}

const GoggleLoginBtn = styled.img`
  width: 50px;
  height: 50px;
`;

export default GoogleLogin;