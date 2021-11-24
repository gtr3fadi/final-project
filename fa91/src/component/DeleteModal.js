
import { motion } from 'framer-motion';
import { projectFirestore } from '../firebase/firebase';
import { useState, useEffect } from 'react';


export default function DeleteModal({ setDeleteModal, id }) {
   const [isLoading, setIsLoading] = useState(false);

    const handelClick = async (id) => {
        setIsLoading(true);
         
        await projectFirestore.collection("projects").doc(id).delete();
        setIsLoading(false);
        setDeleteModal(false);
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
          className="bg-white rounded shadow-lg p-2 m-2"
          style={{
            width: "400px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5 className="text-center">
            Are you sure you want to delete this project?
          </h5>
          <hr className="my-2 w-100" />
          <div className="d-flex justify-content-between mt-2">
            <button
              onClick={() => { handelClick(id)}}
              className="btn btn-danger mx-2"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setDeleteModal(false);
              }}
              className="btn btn-secondary mx-2"
            >
              No
                      </button>
                      {isLoading && <div className="spinner-border text-primary" role="status"> </div>}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
          