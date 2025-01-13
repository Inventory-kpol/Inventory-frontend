import { Outlet } from "react-router-dom"

import "../../src/styles/Layout.css"

export default function LoginBase({children = <Outlet></Outlet>}) {
    return (
      <div className="background-image">
        <div className="login-container">
          {children}
        </div>
      </div>
    );
  }