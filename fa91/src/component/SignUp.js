import { useState } from "react"
import { useSignUp } from "./hook/useSignUp"




export default function SignUp() {
    const [userName,setUserName]=useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {signUp , error , isPending} = useSignUp()

    const handleSubmit = (e) => {
        e.preventDefault()
        signUp(email,password ,userName)
    }


    return (
        <div>
            <h1>Sign Up</h1>
            <form className="form" onSubmit={handleSubmit}    >
            <label htmlFor="userName">User Name</label>
            <input type="text" id="userName" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                {!isPending && <button className="btn"   >Sign Up</button>}
                {isPending && <button className="btn" disabled>Loading...</button>}
                {error && <p>{error}</p>}

            </form>

            



            
        </div>
    )
}
