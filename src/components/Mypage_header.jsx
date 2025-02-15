import React from "react";
import { Link } from "react-router-dom"; 

function Header() {
  return (
    <header style={header_styles.header}>
      <h1 style = {header_styles.title}>
      <Link style = {header_styles.link}>Inventories</Link>
      </h1>
      <span style = {header_styles.username}>
      <Link style = {header_styles.link}>username</Link>
      </span>
    </header>
  );
}

const header_styles = {
  header: {
    display: "flex",
    /*justifyContent: "space-between", 만약 사이 뛰울거면*/
    alignItems: "center",
    padding: "0px 20px 10px 20px",
    borderBottom : "2px solid #111111",
  },
  title:{
  fontSize: "30px",
  marginRight: "30px",
  fontWeight : "normal",
  },
  username:{
    fontSize: "18px",

  },
  link: {
    textDecoration: "none",
    color : "#000000"
  },
};


export default Header ;