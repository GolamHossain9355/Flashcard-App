import { useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

export default function DeleteDeckBTN({ deckId }) {
  const history = useHistory();

  const handleDeleteBTNClick = () => {
    const confirmClick = window.confirm(
      "Delete this Deck \n\n You will not be able to recover it."
    );

    if (confirmClick) {
      deleteDeck(deckId).then((resp) => history.go(0));
    }
  };

  return (
    <button
      type="button"
      className="btn btn-danger pr-4 pl-4"
      onClick={handleDeleteBTNClick}
    >
      Delete
    </button>
  );
}
