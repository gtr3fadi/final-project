import React, { useState } from "react";
import AvatarUploadModal from "../AvatarUploadModal";

const fileInputType = ".jpg, .jpeg, .png, .gif";

const aceptedFileTypes = ["image/jpeg", "image/png", "image/gif"];

const isValidFileType = (file) => {
  return aceptedFileTypes.includes(file.type);
};

const AvatarUploadImage = () => {
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState(null);

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    if (isValidFileType(file)) {
      setImg(file);
      setShowModal(true);
    } else {
      alert("Invalid file type. Only " + fileInputType + " are allowed.", 4000);
    }
  };

  return (
    <>
      <label
        style={{
          position: "absolute",
          bottom: "0",
          left: "20px",
          width: "20%",
          height: "20%",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.7)",
          zIndex: 0,
          cursor: "pointer",
        }}
        className="d-flex justify-content-center align-items-center"
        title="Upload new image"
      >
        <i className="fa fa-camera text-dark fs-4" aria-hidden="true"></i>
        <input
          type="file"
          id="avatar"
          name="avatar"
          className="d-none"
          accept={fileInputType}
          onChange={fileChangeHandler}
        />
      </label>
      {showModal && <AvatarUploadModal img={img} setShowModal={setShowModal} />}
    </>
  );
};

export default AvatarUploadImage;
