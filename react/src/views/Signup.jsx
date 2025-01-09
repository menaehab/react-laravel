import { Link } from "react-router-dom";
function Signup() {
    const onSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Create new account</h1>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                    />
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
                    <input
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
