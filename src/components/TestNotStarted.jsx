import React from "react";

export default function TextNotStarted() {
  return (
    <div style={{ padding: "0 10%" }}>
      <br />
      <div>
        <h3 style={{'fontSize':'2rem'}}>Quiz has not started yet.</h3>
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
        <div>Slot for the Quiz</div>
        <div style={{ textAlign: "right" }}>
          15th August 2021
          <br />
          3:00 PM to 4:00 PM
        </div>
      </div>
      <br />
      <br />
      <p style={{'color':'#f1faee', 'textAlign':'center', 'opacity':'0.6','margin':'0'}}>If you're on time and the slot isn't open, try refreshing the page.</p>
      <p style={{'color':'#f1faee', 'textAlign':'center'}}>Haven't registered? <a style={{'textDecoration':'none', 'color':'#06d6a0'}} href="/register">Register now</a></p>
    </div>
  );
}
