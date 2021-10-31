import React, { useState } from "react";


const LogIn = () => {

    const [instialestate, setInitialState] = useState({
        email: "",
        password: "",
        error: ""
    });

    const [state, setState] = useState(instialestate);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (state.email === " " || state.password === " ") {
            setState({
                ...state,
                error: "Please enter all fields"
            });
        } else {        
            setState({
                ...state,
                error: ""
            });
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form noValidate onSubmit={handleSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" value={state.email} onChange={handleChange} placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={state.password} onChange={handleChange} placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-lg btn-primary btn-block">Sign in</button>
                        <p className="text-center mt-3">Don't have an account? <a href="/register">Sign up</a></p>
                        <p className="text-center">{state.error}</p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;