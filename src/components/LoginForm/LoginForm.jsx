import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { loginUser } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/global/selectors";
import styles from "./LoginForm.module.css";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters"),
});

export function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate("/dashboard", { replace: true });
    } catch {
      // The global App toaster and the auth error area handle backend feedback.
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <div className={styles.logoArea}>
          <svg
            className={styles.logoIcon}
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.6579 4.94514C22.1122 4.30829 19.5664 3.03458 17.6571 1.12402C15.7478 3.03458 13.202 4.30829 10.6562 4.94514C11.2927 10.6768 13.202 14.4979 17.6571 17.6822C22.1122 14.4979 24.6579 10.6768 24.6579 4.94514Z"
              fill="#FFC727"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.1116 28.6578L4.29126 7.6416V17.8313L18.2929 33.7526L22.1116 28.6578Z"
              fill="#FBFBFB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.0212 26.7476L31.6585 17.8316V8.27881L19.5662 22.2896L24.0212 26.7476Z"
              fill="#FBFBFB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.6577 29.9319V35.6636L31.6586 27.3845V21.6528L24.6577 29.9319Z"
              fill="#FBFBFB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.2921 29.9319L4.29126 21.6528V27.3845L11.2921 35.6636V29.9319Z"
              fill="#FBFBFB"
            />
          </svg>
          <h1 id="login-title" className={styles.logoText}>
            Money Guard
          </h1>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.field}>
            <span className={styles.icon} aria-hidden="true">
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <path
                  d="M18 0H2C0.9 0 0.01 0.9 0.01 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z"
                  fill="currentColor"
                  fillOpacity="0.4"
                />
              </svg>
            </span>
            <input
              className={styles.input}
              type="email"
              placeholder="E-mail"
              autoComplete="email"
              {...register("email")}
            />
          </label>
          {errors.email && (
            <p className={styles.fieldError}>{errors.email.message}</p>
          )}

          <label className={styles.field}>
            <span className={styles.icon} aria-hidden="true">
              <svg width="16" height="21" viewBox="0 0 16 21" fill="none">
                <path
                  d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM8 16C6.9 16 6 15.1 6 14C6 12.9 6.9 12 8 12C9.1 12 10 12.9 10 14C10 15.1 9.1 16 8 16ZM11.1 7H4.9V5C4.9 3.29 6.29 1.9 8 1.9C9.71 1.9 11.1 3.29 11.1 5V7Z"
                  fill="currentColor"
                  fillOpacity="0.4"
                />
              </svg>
            </span>
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              {...register("password")}
            />
          </label>
          {errors.password && (
            <p className={styles.fieldError}>{errors.password.message}</p>
          )}

          <div className={styles.actions}>
            <button
              className={styles.submitButton}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "LOADING..." : "LOG IN"}
            </button>
            <Link className={styles.secondaryLink} to="/register">
              REGISTER
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}