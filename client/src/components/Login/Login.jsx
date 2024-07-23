import { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import "./Login.css";
import { UserContext } from "../../context/userContext";

function Login({ openRegister, closeModals }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state
  const { setUser, setIsLoggedIn } = useContext(UserContext);

  const togglePasswordVisibility = () => { // New function
    setShowPassword(!showPassword);
  };

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
        credentials: "include"
      };

      const response = await fetch(
        `${import.meta.env.VITE_API}/auth/login`,
        settings
      );

      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        setUser(userData);
        setIsLoggedIn(true);
        closeModals();
        document.querySelector("details[open]").removeAttribute("open");
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error.message); 
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
          <div className="passwordContainer">
            <input
              type={showPassword ? "text" : "password"} 
              value={password}
              placeholder="abcD&12345"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="togglePasswordIcon"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} 
            </span>
          </div>
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
