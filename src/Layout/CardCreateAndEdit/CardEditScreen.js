import { useState, useEffect } from "react";
import { useRouteMatch, useParams, useHistory } from "react-router-dom";

import { readDeck, readCard, updateCard } from "../../utils/api";
import LoaderAnimation from "../ComonFiles/LoaderAnimation";
import FormForCardCreateAndEdit from "./FormForCardCreateAndEdit";

export default function CardEditScreen() {
  const { url } = useRouteMatch();
  const { cardId, deckId } = useParams();
  const history = useHistory();

  const [currentDeck, setCurrentDeck] = useState({});
  const [storedCardData, setStoredCardData] = useState({});

  //*getting the deck data to add the card to
  useEffect(() => {
    async function loadCurrentDeck() {
      const data = await readDeck(deckId);
      setCurrentDeck(data);
    }
    loadCurrentDeck();
  }, [deckId]);

  //*getting the card from the deck to edit
  useEffect(() => {
    async function loadStoredCardData() {
      const data = await readCard(cardId);
      setStoredCardData(data);
    }
    loadStoredCardData();
  }, [cardId]);

  //*getting the new edited card data from the user 
  const handleUpdatedChange = ({ target }) => {
    setStoredCardData({
      ...storedCardData,
      [target.name]: target.value,
    });
  };

  /*
  *updating the card with the new data after the user clicks submit
  *and taking the user to the deck screen
  */
  const handleUpdatedCardSubmit = (event) => {
    event.preventDefault();
    async function loadUpdatedCard() {
      await updateCard(storedCardData);
      history.push(`/decks/${deckId}`);
    }
    loadUpdatedCard();
  };

  //an if check to see if the Deck and the Card information has returned or not
  if (currentDeck.id && storedCardData.id) {
    return (
      <FormForCardCreateAndEdit
        url={url}
        deckId={deckId}
        name={currentDeck.name}
        handleSubmit={handleUpdatedCardSubmit}
        handleChange={handleUpdatedChange}
        cardData={storedCardData}
        cardId= {cardId}
      />
    );
  }
  //loading animation before api call returns value for the old deck data
  return <LoaderAnimation />;
}
