import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const divSpace = `<DivSpace/>`;
const logo = "</>";

const Home = () => {
  return (
    <div>
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        transition={{ duration: 1 }}
        className="logo"
        style={{
          margin: "70px auto",
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
      </motion.div>
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
          color: "#1266f1",
        }}
      >
        {divSpace}
      </div>
    </div>
  );
};

export default Home;
