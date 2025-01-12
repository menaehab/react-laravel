import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getUsers();
    }, []);
    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                console.log(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    return <div>Users</div>;
}

export default Users;
