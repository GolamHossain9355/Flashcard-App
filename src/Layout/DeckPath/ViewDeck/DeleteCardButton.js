import { deleteCard } from "../../../utils/api";
import { useHistory } from "react-router-dom";

import { readDeck } from "../../../utils/api";

export default function DeleteCardButton({ cardId, setCurrentDeck, deckId }) {
  const handleDeleteCardClick = () => {
    async function loadDeleteCard() {
      setCurrentDeck({});
      await deleteCard(cardId);
      const deckData = await readDeck(deckId);
      setCurrentDeck(deckData);
    }

    const confirm = window.confirm(
      "Delete this card? \n\n You will not be able to recover it."
    );

    if (confirm) {
      loadDeleteCard();
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
