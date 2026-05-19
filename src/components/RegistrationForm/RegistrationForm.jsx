// Kisi 1 - RegistrationForm
// Kullanilacak Redux operation: registerUser from redux/auth/operations.
// Kullanilacak Redux selector: selectAuthError gerekirse redux/auth/selectors.
// Form: react-hook-form + Yup; alanlar name, email, password, confirmPassword.

// ek olarak indirdiğim kütüphaneler: react-hook-form, yup, @hookform/resolvers

import { registerUser } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import css from "./RegistrationForm.module.css";

// Form doğrulama kuralları
const registrationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Kullanıcı adı zorunludur")
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır"),
  email: yup
    .string()
    .required("Email zorunludur")
    .email("Geçerli bir email adresi giriniz"),
  password: yup
    .string()
    .required("Lütfen bir şifre giriniz")
    .min(6, "Şifreniz en az 6 karakter olmalıdır")
    .max(12, "Şifreniz en fazla 12 karakter olabilir"),
  confirmPassword: yup
    .string()
    .required("Lütfen şifrenizi doğrulayınız")
    .oneOf([yup.ref("password"), null], "Şifreler birbirleriyle eşleşmiyor"),
});

export function RegistrationForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    mode: "onTouched",
  });

  // şifre doğrulama için bar kontrolü
  const confirmPassword = useWatch({
    control,
    name: "confirmPassword",
    defaultValue: "",
  });
  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });
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
        <div className={css.inputContainer}>
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
