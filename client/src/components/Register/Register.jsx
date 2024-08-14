import { useContext, useState, useNavigate } from "react";
import { UserContext } from "../../context/userContext";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";
import { useAlert } from "../../context/alertContext";

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
  const { showAlert } = useAlert();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirm(!showConfirm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      // alert("Missing credentials.");
      showAlert("Missing Credentials. Please check", "warning");
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
        `${import.meta.env.VITE_API}/auth/register`,
        settings
      );

      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        setUser(userData);
        closeModals();
        showAlert("Registration successful. Please login to shop!.", "success");

        document.querySelector("details[open]").removeAttribute("open");
      } else {
        const error = await response.json();
        console.log(error.msg);
        showAlert(error.msg, "warning");
      }
    } catch (error) {
      console.log(error.message);
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
            />
          </div>
          <div className="lastName">
            <label>{t("register.lastName")}</label>
            <input
              type="text"
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="email">
            <label>{t("register.email")}</label>
            <input
              type="text"
              value={email}
              placeholder="abcd@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password">
            <label>{t("register.password")}</label>
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

          <div className="confirmPass">
            <label>{t("register.confirmPass")}</label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              placeholder="abcD&12345"
              onChange={(e) => setConfirmPassword(e.target.value)}
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
