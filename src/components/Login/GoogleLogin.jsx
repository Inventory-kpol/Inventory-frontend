import React, { useRef } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleLogin = () => {
  const linkRef = useRef(null);

  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const redirectUrl = `https://likelionfesival.shop/oauth2/authorization/google?token=${encodeURIComponent(token)}`;

    if (linkRef.current) {
      linkRef.current.href = redirectUrl;
      linkRef.current.click();
    }
  };

  return (
    <GoogleOAuthProvider clientId="869724397420-1h9flrvdu1k3sdgclu34nfn2d4f3r5fb.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("로그인 실패");
        }}
      />
      <a ref={linkRef} style={{ display: 'none' }}></a>
    </GoogleOAuthProvider>
  );
};

export default GoogleLogin;