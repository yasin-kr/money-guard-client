import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { selectIsLoading } from "../../redux/global/selectors";
import css from "./Loader.module.css";

// Core - Loader
// Kullanilacak Redux selector: selectIsLoading from redux/global/selectors.
// Page ekipleri ayri global loader yazmayacak; async action'lar bu loader'i tetikler.
export function Loader({ force = false }) {
  const isLoading = useSelector(selectIsLoading);

  if (!force && !isLoading) {
    return null;
  }

  return (
    <div className={css.overlay} aria-label="Loading">
      <ThreeDots
        visible
        height="48"
        width="48"
        color="#734aef"
        radius="9"
      />
    </div>
  );
}
