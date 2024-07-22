import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import "./Register.css";

function Register({ openLogin, closeModals }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Missing credentials.");
      return;
    }

    try {
      const settings = {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, email, password, confirmPassword }),
        headers: {
          "Content-Type": "application/JSON",
        },
      };

      const response = await fetch(
        `http://localhost:5100/api/auth/register`,
        settings
      );

      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        setUser(userData);
        closeModals();
        document.querySelector('details[open]').removeAttribute('open'); 
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error){
      alert(error.message)
    }
  };

 

  return (
    <div className="registerModal">
      <div className="registerContainer">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            placeholder="Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
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
            type= "password"
            value={password}
            placeholder="abcD&12345"
            onChange={(e) => setPassword(e.target.value)}
            required
            
          />
          
            <label>Confirm password</label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="abcD&12345"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <p>
            Already have an account?{" "}
            <a href="#" className="registerToLogin" onClick={openLogin}>
              Login
            </a>
          </p>
          <button type="submit" className="registerButton">
            Register
          </button>
        </form>
        <button className="closeRegisterButton" onClick={closeModals}>
          X
        </button>
      </div>
    </div>
  );
}

export default Register;
