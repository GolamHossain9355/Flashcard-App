import { useState, useEffect } from "react";
import { Link, useRouteMatch, useParams, useHistory } from "react-router-dom";

import { readDeck, readCard, updateCard } from "../../utils/api";
import LoaderAnimation from "../LoaderAnimation";
import CardEditAndCreateForm from "./CardEditAndCreateForm";

export default function CardEditScreen() {
  const { url } = useRouteMatch();
  const { cardId } = useParams();
  const { deckId } = useParams();
  const history = useHistory();

  const [currentDeck, setCurrentDeck] = useState({});
  const [storedCardData, setStoredCardData] = useState({});

  useEffect(() => {
    async function loadCurrentDeck() {
      const data = await readDeck(deckId);
      setCurrentDeck(data);
    }
    loadCurrentDeck();
  }, []);

  useEffect(() => {
    async function loadStoredCardData() {
      const data = await readCard(cardId);
      setStoredCardData(data);
    }
    loadStoredCardData();
  }, []);

  const handleUpdatedChange = ({ target }) => {
    setStoredCardData({
      ...storedCardData,
      [target.name]: target.value,
    });
  };

  const handleUpdatedCardSubmit = (event) => {
    event.preventDefault();
    async function loadUpdatedCard() {
      await updateCard(storedCardData);
      history.push(`/decks/${deckId}`);
    }
    loadUpdatedCard();
  };

  if (currentDeck.id && storedCardData.id) {
    return (
      <CardEditAndCreateForm
        url={url}
        deckId={deckId}
        name={currentDeck.name}
        handleSubmit={handleUpdatedCardSubmit}
        handleChange={handleUpdatedChange}
        cardData={storedCardData}
      />
    );
  }
  return <LoaderAnimation />;
}
