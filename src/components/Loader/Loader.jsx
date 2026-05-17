import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { selectIsLoading } from "../../redux/global/selectors";

// Core - Loader
// Kullanilacak Redux selector: selectIsLoading from redux/global/selectors.
// Page ekipleri ayri global loader yazmayacak; async action'lar bu loader'i tetikler.
export function Loader() {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div aria-label="Loading">
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
