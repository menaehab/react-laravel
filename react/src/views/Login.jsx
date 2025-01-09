import { Link } from "react-router-dom";
function Login() {
    const onSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login into your account</h1>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                    />
                    <input
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
