import { useState } from "react";
import { users } from "../../data";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import { useUser } from "../../contexts/user-context";
import "./style.css";
import { Navigate } from "react-router-dom";

function Login() {
  const [selectedUser, setSelectedUser] = useState("");

  const {
    state: { user },
    dispatch,
  } = useUser();

  if (user) {
    return <Navigate replace to="/leads" />;
  }

  const handleChange = (event) => {
    event.persist();
    setSelectedUser(event.target.value);
  };

  const login = () => {
    if (selectedUser !== "") {
      dispatch({ type: "login", payload: selectedUser });
    }
  };

  return (
    <Layout>
      <div className="content">
        <div>
          <label>User</label>
        </div>
        <select value={selectedUser} onChange={handleChange}>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.name}>{user.name}</option>
          ))}
        </select>
        <Button onClick={login}>Login</Button>
      </div>
    </Layout>
  );
}

export default Login;
