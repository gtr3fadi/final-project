import { useState } from "react";
import { useSignUp } from "./hook/useSignUp";
import { useThemeContext } from "./hook/useThemeContext";
import { projectStorage } from "../firebase/firebase";
export default function SignUp() {
  const { isLightTheme } = useThemeContext();

  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState(null);
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cofirmPasswordError, setCofirmPasswordError] = useState(null);
  // const [thumbnail, setThumbnail] = useState("");
  // const [thumbnailError, setThumbnailError] = useState(null);

  const { signUp, error, isPending } = useSignUp();

    const [imgURL, setImgURL] = useState("");


     const imgPath = projectStorage
       .ref(`/newuser`)
       .listAll()
       .then((res) => {
         console.log(res);
         res.items.forEach(async (itemRef) => {
           const url = await itemRef.getDownloadURL();
           console.log(url);
           setImgURL(url);
         });
       });

     console.log(imgURL);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFullNameError(null);
    setUserNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setCofirmPasswordError(null);
    // setThumbnailError(null);

    if (fullName.length < 3) {
      setFullNameError("Full name must be at least 3 characters");
      return;
    }
    if (userName.length < 3) {
      setUserNameError("User name must be at least 3 characters");
      return;
    }
    if (email.length < 9 || !email.includes("@") || !email.includes(".")) {
      setEmailError("Email must be valid / must be include @ and . ");
      return;
    }
    if (password.length < 6) {
      setCofirmPasswordError("Password must be at least 6 characters");
      return;
    }
    if (password.length > 20) {
      setCofirmPasswordError("Password must be less than 20 characters");
      return;
    }
    if (password !== confirmPassword) {
      setCofirmPasswordError("Password does not match");
      return;
    }
    // if (!thumbnail) {
    //   setThumbnailError("Please upload an image");
    //   return;
    // }

    signUp(email, password, userName, imgURL, fullName);
  };

  // const handelChangeFile = (e) => {
  //   e.preventDefault();
  //   setThumbnail(null);
  //   let selected = e.target.files[0];
  //   if (!selected) {
  //     setThumbnailError("Please select a file");
  //     return;
  //   }
  //   if (!selected.type.includes("image")) {
  //     setThumbnailError("Please select an image file");
  //     return;
  //   }
  //   if (selected.size > 1000000) {
  //     setThumbnailError("Please select a file less than 1mb");
  //     return;
  //   }
  //   setThumbnailError(null);
  //   setThumbnail(selected);
  // };
  // console.log(thumbnail);

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mt-2 rounded p-0 mx-auto shadow">
            <form
              noValidate
              onSubmit={handleSubmit}
              className={`${
                isLightTheme ? "bg-white text-dark" : "bg-dark text-light"
              } bg-opacity-75 bg-gradient  rounded p-3`}
            >
              <h1 className="h3 mb-3 font-weight-normal text-center">
                Sign Up
              </h1>
              <div className="form-group">
                <label htmlFor="FullName"> Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="FullName"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              {fullNameError && <p className="text-danger">{fullNameError}</p>}

              <div className="form-group">
                <label htmlFor="name">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              {userNameError && <p className="text-danger">{userNameError}</p>}
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {emailError && <p className="text-danger">{emailError}</p>}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {passwordError && <p className="text-danger">{passwordError}</p>}
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {cofirmPasswordError && (
                  <div className="alert alert-danger mt-2">
                    {cofirmPasswordError}
                  </div>
                )}
              </div>
              {/* <div className="form-group">
                <label htmlFor="thumbnail">Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handelChangeFile}
                  required
                />
                {thumbnailError && (
                  <div className="alert alert-danger">{thumbnailError}</div>
                )}
              </div> */}
              <div className="form-group mt-5 row">
                <button
                  className="btn col-10 col-sm-8 col-md-6   m-auto btn-lg btn-primary "
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Loading..." : "Sign Up"}
                </button>
              </div>

              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
