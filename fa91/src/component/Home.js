import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const divSpace = `<DivSpace/>`;
const logo = "</>";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
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
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
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
      </motion.div>
    </div>
  );
};

export default Home;
