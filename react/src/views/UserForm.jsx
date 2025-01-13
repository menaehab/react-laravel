import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function UserForm() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState([]);
    const { setNotification } = useStateContext(); // Get setNotification function from context
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get("/users/" + id)
                .then(({ data }) => {
                    setUser(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        }, [id]);
    }

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        if (user.id) {
            axiosClient
                .put("/users/" + user.id, user)
                .then(() => {
                    setNotification("User updated successfully"); // Set notification
                    navigate("/users");
                })
                .catch((error) => setError(error.response.data.errors));
        } else {
            axiosClient
                .post("/users", user)
                .then(() => {
                    setNotification("User created successfully"); // Set notification
                    navigate("/users");
                })
                .catch((error) => setError(error.response.data.errors));
        }
    };

    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>Create User</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && Object.keys(errors).length > 0 && (
                    <div className="alert alert-danger">
                        {Object.values(errors).map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            onChange={(e) =>
                                setUser({ ...user, name: e.target.value })
                            }
                            value={user.name}
                            type="text"
                            placeholder="Enter Name"
                        />
                        <input
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                            value={user.email}
                            type="email"
                            placeholder="Enter Email"
                        />
                        <input
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                            type="password"
                            placeholder="Enter password"
                        />
                        <input
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password_confirmation: e.target.value,
                                })
                            }
                            type="password"
                            placeholder="Enter password confirmation"
                        />
                        <button className="btn">Submit</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default UserForm;
