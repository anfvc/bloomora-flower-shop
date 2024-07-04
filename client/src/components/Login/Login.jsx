import  { useState, useContext } from "react";
import "./Login.css";
import { UserContext } from "../../context/userContext";

function Login({ openRegister, closeModals }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsLoggedIn } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Missing credentials");
      return;
    }

    try {
      const settings = {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/JSON",
        },
      };

      const response = await fetch(
        `http://localhost:5100/api/auth/login`,
        settings
      );

      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        setUser(userData);
        setIsLoggedIn(true)
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert("Please let me sleep.")
    }
    
  };

  return (
    <div className="loginModal">
      <div className="loginContainer">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="abcd@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="abcD&12345"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p>
            If you don't have an account,{" "}
            <a href="#" className="loginToRegister" onClick={openRegister}>
              Register
            </a>
          </p>
          <button type="submit" className="loginButton">
            Login
          </button>
        </form>
        <button className="closeLoginButton" onClick={closeModals}>
          X
        </button>
      </div>
    </div>
  );
}

export default Login;
