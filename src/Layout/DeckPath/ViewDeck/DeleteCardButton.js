import { deleteCard } from "../../../utils/api";
import { useHistory } from "react-router-dom";

export default function DeleteCardButton({ cardId }) {
  const history = useHistory();

  const handleDeleteCardClick = () => {
    async function loadDeleteCard() {
      await deleteCard(cardId);
    }

    const confirm = window.confirm(
      "Delete this card? \n\n You will not be able to recover it."
    );

    if (confirm) {
      loadDeleteCard();
      history.go(0);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-danger pr-3 pl-3"
      onClick={handleDeleteCardClick}
    >
      Delete
    </button>
  );
}
