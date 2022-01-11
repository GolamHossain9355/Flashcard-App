import { useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

import { listDecks } from "../../utils/api";

export default function DeleteDeckBTN({
  deckId,
  checkLocation = "",
  setAllDecks,
}) {
  const history = useHistory();

  //handles the delete button confirm warning
  const handleDeleteBTNClick = () => {
    const confirm = window.confirm(
      "Delete this Deck \n\n You will not be able to recover it."
    );

    async function loadDeleteBTN() {
      await deleteDeck(deckId);
      /*
       *used this delete button on multiple pages. this basically checks
       *if the user is deleting the deck from the Home or the ViewDeckScreen
       *inside deckPath folder
       */
      if (checkLocation.length > 0) {
        history.push("/");
      } else {
        // * re-rendering the page with the new deleted deck data
        setAllDecks({});
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
