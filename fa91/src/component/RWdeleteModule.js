import { useState } from "react";
import { motion } from "framer-motion";
import { useThemeContext } from "./hook/useThemeContext";

export default function RWdeleteModule({
  id,
  setRWdelete,
  doc,
  work,
  updateDocumentField,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { isLightTheme } = useThemeContext();
  const handelClick = async () => {
    setIsLoading(true);
    await updateDocumentField(id, {
      recentWork: doc.recentWork.filter((w) => w.id !== work.id),
    });
    setIsLoading(false);
    setRWdelete(false);
  };

  return (
    <div
      className=" position-fixed top-0 left-0 bottom-0 right-0   p-1 "
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "9999",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "10 0%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="bg-light rounded shadow-lg p-2 m-2"
          style={{
            width: "400px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5 className="text-center text-dark">
            Are you sure you want to delete this recent work?
          </h5>
          <hr className="my-2 w-100" />
          <div className="d-flex justify-content-between mt-2">
            <button onClick={handelClick} className="btn btn-danger mx-2">
              Yes
            </button>
            <button
              onClick={() => {
                setRWdelete(false);
              }}
              className="btn btn-secondary mx-2"
            >
              No
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
