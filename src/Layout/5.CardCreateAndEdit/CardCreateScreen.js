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

  useEffect(() => {
    async function loadDeckToAddCardTo() {
      const data = await readDeck(deckId);
      setDeckToAddCardTo(data);
    }
    loadDeckToAddCardTo();
  }, []);

  const handleChange = ({ target }) => {
    setNewCardData({
      ...newCardData,
      [target.name]: target.value,
    });
  };

  const handleCardAddSubmit = (event) => {
    event.preventDefault();

    async function loadNewCardData() {
      await createCard(deckId, newCardData);
    }
    loadNewCardData();
    setNewCardData(initialCardData);
  };

  if (deckToAddCardTo.id) {
    let name = deckToAddCardTo.name;
    if (deckToAddCardTo.name.length === 0) {
      name = "No Deck Name";
    }

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

  return <LoaderAnimation />;
}
