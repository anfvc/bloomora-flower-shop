import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";

function Register({ openLogin, closeModals }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { t, i18n } = useTranslation();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirm(!showConfirm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Missing credentials.");
      return;
    }

    try {
      const settings = {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }),
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
        document.querySelector("details[open]").removeAttribute("open");
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="registerModal">
      <div className="registerContainer">
        <h2>{t("register.header")}</h2>
        <form onSubmit={handleSubmit}>
          <div className="firstName">
            <label>{t("register.firstName")}</label>
            <input
              type="text"
              value={firstName}
              placeholder="Name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="lastName">
            <label>{t("register.lastName")}</label>
            <input
              type="text"
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="email">
            <label>{t("register.email")}</label>
            <input
              type="email"
              value={email}
              placeholder="abcd@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="password">
            <label>{t("register.password")}</label>
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

          <div className="confirmPass">
            <label>{t("register.confirmPass")}</label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              placeholder="abcD&12345"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="togglePasswordIcon"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <p>
            {t("register.alreadyAcc")}{" "}
            <a href="#" className="registerToLogin" onClick={openLogin}>
              {t("register.alreadyAccLogin")}
            </a>
          </p>
          <button type="submit" className="registerButton">
            {t("register.header")}
          </button>
        </form>
        <button className="closeRegisterButton" onClick={closeModals}>
          {t("register.close")}
        </button>
      </div>
    </div>
  );
}

export default Register;
