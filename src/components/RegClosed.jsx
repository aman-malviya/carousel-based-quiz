import React from "react";

export default function TextNotStarted(props) {
  return (
    <div style={{ padding: "0 10%" }}>
      <br />
      <div>
        <h3 style={{'fontSize':'2rem'}}>{props.info}</h3>
      </div>
      <div
        style={{
          display: "grid",
          "grid-template-columns": "1fr 2fr",
          border: "2px solid rgba(69, 123, 157,0.7)",
          padding: "10px 20px",
          borderRadius: "8px",
          color: "#f1faee",
        }}
      >
        <div>Quiz will take place on</div>
        <div style={{ textAlign: "right" }}>
          15th of August
          <br />
          2021
        </div>
      </div>
      <br />
      <br />
      <div className="text-center"><a style={{'color':'#eee', 'textDecoration':'none', 'backgroundColor':'#06d6a0', 'padding':'10px', 'borderRadius':'8px'}} href="/">Head over to the Quiz</a></div>
    </div>
  );
}
