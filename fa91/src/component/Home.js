import React, { useEffect, useState } from "react";

const divSpace = `<DivSpace/>`
const logo="</>"


const Home = () => {

  return (
    <div>
      <div
        className="logo"
        style={{
          margin: "0px auto",
          marginTop: "70px",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "100px",
          fontStyle: "italic",
          color: "black",
          textAlign: "center",
          border: "2px solid black",
        }}
      >
        {logo}
      </div>
      <div
        className="logoName"
        style={{
          margin: "0px auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "70px",
          fontStyle: "italic",
          textAlign: "center",
          color : "#1266f1",
        }}
      >
        {divSpace}
      </div>
    </div>
  );
};

export default Home;
