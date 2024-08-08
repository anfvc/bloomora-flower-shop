import { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import "./Login.css";
import { UserContext } from "../../context/userContext";
import { useTranslation } from "react-i18next";
import { useAlert } from "../../context/alertContext";

function Login({ openRegister, closeModals }) {
  const { showAlert } = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const { t, i18n } = useTranslation();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showAlert("Missing Credentials", "warning");
      return;
    }

    try {
      const settings = {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/JSON",
        },
        credentials: "include",
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
        showAlert(`${userData.msg}`, "success");
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
        <h2>{t("sign_in.header")}</h2>
        <form onSubmit={handleSubmit}>
          <label>{t("sign_in.email")}</label>
          <input
            type="email"
            value={email}
            placeholder="abcd@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>{t("sign_in.password")}</label>
          <div className="passwordContainer">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="abcD&12345"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="togglePasswordIcon"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <p>
            {t("sign_in.noAccount")},{" "}
            <a href="#" className="loginToRegister" onClick={openRegister}>
              {t("sign_in.register")}
            </a>
          </p>
          <button type="submit" className="loginButton">
            {t("sign_in.noAccountLogin")}
          </button>
        </form>
        <button className="closeLoginButton" onClick={closeModals}>
          {t("sign_in.close")}
        </button>
      </div>
    </div>
  );
}

export default Login;
