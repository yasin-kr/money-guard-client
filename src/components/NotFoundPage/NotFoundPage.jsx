import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export function NotFoundPage() {
  return (
    <main className={css.wrapper}>
      <section className={css.content}>
        <p className={css.code}>404</p>
        <h1 className={css.title}>Page not found</h1>
        <p className={css.text}>The page you are looking for does not exist.</p>
        <Link className={css.link} to="/dashboard/home">
          Go home
        </Link>
      </section>
    </main>
  );
}
