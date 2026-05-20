// Kisi 1 - RegistrationForm
// Kullanilacak Redux operation: registerUser from redux/auth/operations.
// Kullanilacak Redux selector: selectAuthError gerekirse redux/auth/selectors.
// Form: react-hook-form + Yup; alanlar name, email, password, confirmPassword.

// ek olarak indirdiğim kütüphaneler: react-hook-form, yup, @hookform/resolvers

import { registerUser } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { FaUser, FaRegEnvelope, FaLock } from "react-icons/fa";
import logo from "../../../public/favicon.svg"
import css from "./RegistrationForm.module.css";

// Form doğrulama kuralları
const registrationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Username is required")
    .min(3, "The username must be at least 3 characters long."),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address."),
  password: yup
    .string()
    .required("Please enter a password.")
    .min(6, "Your password must be at least 6 characters long.")
    .max(12, "Your password can be a maximum of 12 characters."),
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password"), null], "The passwords don't match."),
});

export function RegistrationForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    mode: "onTouched",
  });

  // şifre doğrulama için bar kontrolü
  const confirmPassword = watch("confirmPassword", "");
  const password = watch("password", "");
  const getProgressWidth = () => {
    if (!confirmPassword) return "0%";
    if (password === confirmPassword) return "100%";
    if (password.startsWith(confirmPassword)) {
      const percentage = (confirmPassword.length / password.length) * 100;
      return `${percentage}%`;
    }
    return "0%";
  };
  const onFormSubmit = ({ name, email, password }) => {
    dispatch(registerUser({ username: name, email, password }));
  };

  return (
    <div className={css.registerFormContainer}>
      <form className={css.registerForm} onSubmit={handleSubmit(onFormSubmit)}>

        <div className={css.logoContainer}>
          <img src={logo} alt="Money Guard Logo" className={css.logoImg} />
          <h1 className={css.logoTitle}>Money Guard</h1>
        </div>

        <div className={css.inputContainer}>
          <FaUser className={css.inputIcon} />
          <input
            className={css.inputField}
            placeholder="Name"
            type="text"
            {...register("name")}
          />
          {errors.name && (
            <p className={css.errorMessage}>{errors.name.message}</p>
          )}
        </div>

        <div className={css.inputContainer}>
          <FaRegEnvelope className={css.inputIcon} />
          <input
            className={css.inputField}
            placeholder="Email"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className={css.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <div className={css.inputContainer}>
          <FaLock className={css.inputIcon} />
          <input
            className={css.inputField}
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className={css.errorMessage}>{errors.password.message}</p>
          )}
        </div>

        <div className={css.inputContainer}>
          <FaLock className={css.inputIcon} />
          <input
            className={css.inputField}
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className={css.errorMessage}>{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className={css.passwordStrengthBar}>
          <div
            className={css.passwordStrengthFill}
            style={{ width: getProgressWidth() }}
          ></div>
        </div>

        <div className={css.buttonContainer}>
          <button className={css.registerButton} type="submit">
            REGISTER
          </button>
          <Link className={css.loginLink} to="/login">
            LOG IN
          </Link>
        </div>
      </form>
    </div>
  );
}
