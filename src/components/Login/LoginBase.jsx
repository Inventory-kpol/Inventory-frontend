import { Outlet } from "react-router-dom"

import "../../styles/Layout.css"

export default function LoginBase({children = <Outlet></Outlet>}) {
    return (
      <div>
        <div className="login-container">
          {children}
        </div>
      </div>
    );
  }