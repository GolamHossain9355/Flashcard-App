import { useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

import { listDecks } from "../../utils/api";

export default function DeleteDeckBTN({
  deckId,
  checkLocation = "",
  setAllDecks,
}) {
  const history = useHistory();

  const handleDeleteBTNClick = () => {
    const confirm = window.confirm(
      "Delete this Deck \n\n You will not be able to recover it."
    );

    async function loadDeleteBTN() {
      await deleteDeck(deckId);
      if (checkLocation.length > 0) {
        history.push("/");
      } else {
        setAllDecks({})
        const data = await listDecks();
        setAllDecks(data);
      }
    }
    if (confirm) loadDeleteBTN();
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
