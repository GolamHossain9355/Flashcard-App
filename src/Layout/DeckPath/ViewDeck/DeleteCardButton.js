import { deleteCard } from "../../../utils/api";

import { readDeck } from "../../../utils/api";

export default function DeleteCardButton({ cardId, setCurrentDeck, deckId }) {
  /*
   *handles the delete click event and then re-renders
   *the state variable to show the new information
   */
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
