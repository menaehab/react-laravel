import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setToken, setUser } = useStateContext();
    const [errors, setError] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                const { token, user } = data;
                setToken(token);
                setUser(user);
            })
            .catch((error) => {
                const response = error.response;
                if (response.status === 422) {
                    if (response.data.errors) {
                        setError(response.data.errors);
                        console.log(response.data.errors);
                    } else {
                        setError({
                            email: [response.data.message],
                        });
                    }
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
                    <h1 className="title">Login into your account</h1>
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
                    <button type="submit" className="btn btn-block">
                        Login
                    </button>
                    <p>
                        Not Registered? <Link to="/signup">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
