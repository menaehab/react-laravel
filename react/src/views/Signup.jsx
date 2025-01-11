import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const { setToken, setUser } = useStateContext();
    const [errors, setError] = useState(null);
    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                const { token, user } = data;
                setToken(token);
                setUser(user);
            })
            .catch((error) => {
                const response = error.response;
                if (response.status === 422) {
                    setError(response.data.errors);
                    console.log(response.data.errors);
                }
            });
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                {errors && (
                    <div className="alert alert-danger">
                        {Object.values(errors).map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </div>
                )}
                <form onSubmit={onSubmit}>
                    <h1 className="title">Create new account</h1>
                    <input
                        ref={nameRef}
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                    />
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                    />
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Confirm your password"
                        name="password_confirmation"
                    />
                    <button type="submit" className="btn btn-block">
                        sign up
                    </button>
                    <p>
                        Have account? <Link to="/login">Login in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
