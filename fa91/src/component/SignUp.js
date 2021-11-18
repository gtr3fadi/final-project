import { useState } from "react"
import { useSignUp } from "./hook/useSignUp"




export default function SignUp() {
    const [userName, setUserName] = useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [cofirmPasswordError, setCofirmPasswordError] = useState(null)
    const [thumbnail, setThumbnail] = useState("")
    const [thumbnailError, setThumbnailError] = useState(null)

    const {signUp , error , isPending} = useSignUp()

    const handleSubmit = (e) => {
        e.preventDefault()
        signUp(email,password,userName,thumbnail,fullName)
        
    }

    const handelChangeFile = (e) => {
        e.preventDefault()
        setThumbnail(null)
        let selected = e.target.files[0]
        if (!selected) {
            setThumbnailError("Please select a file")
            return
        }
        if (!selected.type.includes("image")) {
            setThumbnailError("Please select an image file")
            return
        }
        if (selected.size > 1000000) {
            setThumbnailError("Please select a file less than 1mb")
            return
        }
        setThumbnailError(null)
        setThumbnail(selected)
    }

   

            



    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={handleSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                            <div className="form-group">
                                <label htmlFor="FullName" > Full Name</label>
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
                            <div className="form-group">
                                <label htmlFor="thumbnail">Profile Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={handelChangeFile}
                                    required
                                />
                                {thumbnailError && <div className="alert alert-danger">{thumbnailError}</div>}
                            </div>
                            <div className="form-group mt-5">
                                <button
                                className="btn  w-25 m-auto btn-lg btn-primary btn-block"
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

    )
}




            



            
       
