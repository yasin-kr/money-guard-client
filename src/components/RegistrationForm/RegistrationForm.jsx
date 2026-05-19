import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar-with-style-item";
import * as yup from "yup";
import { registerUser } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/global/selectors";
import css from "./RegistrationForm.module.css";

const registrationSchema = yup.object({
  username: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

function getProgressPassword(password, confirmPassword) {
  if (!confirmPassword || !password.startsWith(confirmPassword)) {
    return "";
  }

  return confirmPassword;
}

export function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    mode: "onTouched",
  });

  const password = useWatch({ control, name: "password", defaultValue: "" });
  const confirmPassword = useWatch({
    control,
    name: "confirmPassword",
    defaultValue: "",
  });
  const progressPassword = getProgressPassword(password, confirmPassword);
  const passwordsMatch = Boolean(confirmPassword) && password === confirmPassword;

  const onFormSubmit = async ({ username, email, password }) => {
    try {
      await dispatch(registerUser({ username, email, password })).unwrap();
      navigate("/dashboard", { replace: true });
    } catch {
      // Global error toast is handled in App.
    }
  };

  return (
    <div className={css.registerFormContainer}>
      <form
        className={css.registerForm}
        onSubmit={handleSubmit(onFormSubmit)}
        noValidate
      >
        <div className={css.inputContainer}>
          <input
            className={css.inputField}
            placeholder="Name"
            type="text"
            autoComplete="username"
            {...register("username")}
          />
          {errors.username && (
            <p className={css.errorMessage}>{errors.username.message}</p>
          )}
        </div>

        <div className={css.inputContainer}>
          <input
            className={css.inputField}
            placeholder="Email"
            type="email"
            autoComplete="email"
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
            autoComplete="new-password"
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
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className={css.errorMessage}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <PasswordStrengthBar
          className={css.passwordStrengthBar}
          password={progressPassword}
          minLength={1}
          barColors={[
            "rgba(255, 255, 255, 0.2)",
            "#ff868d",
            "#ffc727",
            "#ffc727",
            passwordsMatch ? "#24cca7" : "#ffc727",
          ]}
          scoreWords={["", "", "", "", ""]}
          shortScoreWord=""
          styleItem={{
            height: 4,
            borderRadius: 2,
          }}
          wrapStyle={{
            margin: 0,
            width: "100%",
          }}
          scoreWordStyle={{
            display: "none",
          }}
        />

        <div className={css.buttonContainer}>
          <button
            className={css.registerButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "LOADING..." : "REGISTER"}
          </button>
          <Link className={css.loginLink} to="/login">
            LOG IN
          </Link>
        </div>
      </form>
    </div>
  );
}
