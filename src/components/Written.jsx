import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Board.css"

const Written = ({ title, description, image }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/blog/${title}`)
    }

  return (
    <div className="blog-card"  onClick={handleClick}>
      <img src={image} alt={title} className="blog-image" />
      <div className="blog-content">
        <h2 className="blog-title">{title}</h2>
        <p className="blog-description">{description}</p>
      </div>
    </div>
  );
};

export default Written;