import React from "react";
import "../style/components/loader.scss";

export default function Spinner() {
  return (
    <div className="loader-wrapper">
      <span className="loader"></span>
    </div>
  );
}
