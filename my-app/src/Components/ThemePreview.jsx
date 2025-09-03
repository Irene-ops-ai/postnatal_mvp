import React from "react";
import "../Styles/ThemePreview.css";

export default function ThemePreview() {
  return (
    <div className="theme-preview-container">
      <div className="theme-box gold">Gold</div>
      <div className="theme-box pink">Pink</div>
      <div className="theme-box black">Black</div>
    </div>
  );
}
