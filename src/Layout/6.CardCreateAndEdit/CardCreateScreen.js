import { useState, useEffect } from "react";
import { useRouteMatch, useParams } from "react-router-dom";

import { readDeck, createCard } from "../../utils/api";
import LoaderAnimation from "../1.ComonFiles/LoaderAnimation";
import FormForCardCreateAndEdit from "./FormForCardCreateAndEdit";

export default function CardCreateScreen() {
  const { url } = useRouteMatch();
  const { deckId } = useParams();
  const initialCardData = {
    front: "",
    back: "",
    deckId,
  };

  const [newCardData, setNewCardData] = useState(initialCardData);
  const [deckToAddCardTo, setDeckToAddCardTo] = useState({});

  //*getting the deck data to add the card to
  useEffect(() => {
    async function loadDeckToAddCardTo() {
      const data = await readDeck(deckId);
      setDeckToAddCardTo(data);
    }
    loadDeckToAddCardTo();
  }, [deckId]);

  //getting the new card data from the user
  const handleChange = ({ target }) => {
    setNewCardData({
      ...newCardData,
      [target.name]: target.value,
    });
  };

  //*adding the new card data to the deck after the user clicks save button
  const handleCardAddSubmit = (event) => {
    event.preventDefault();

    async function loadNewCardData() {
      await createCard(deckId, newCardData);
      setNewCardData(initialCardData);
    }
    loadNewCardData();
  };

  //an if check to see if the deck information has returned or not
  if (deckToAddCardTo.id) {
    let name = deckToAddCardTo.name;

    return (
      <FormForCardCreateAndEdit
        url={url}
        deckId={deckId}
        name={name}
        handleSubmit={handleCardAddSubmit}
        handleChange={handleChange}
        cardData={newCardData}
      />
    );
  }

  //loading animation before api call returns value for the old deck data
  return <LoaderAnimation />;
}
