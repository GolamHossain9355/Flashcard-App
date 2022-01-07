import React, { useEffect, useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";

import Cards from "./Cards";
import LoaderAnimation from "../../LoaderAnimation";
import { readDeck } from "../../../utils/api";

export default function StudyDeckScreen({ deckId }) {
  const { url } = useRouteMatch();

  const [currentDeck, setCurrentDeck] = useState({});

  useEffect(() => {
    setCurrentDeck({});
    async function loadDeck() {
      const data = await readDeck(deckId);
      setCurrentDeck(data);
    }
    loadDeck();
  }, []);

  if (currentDeck.id) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={url}>{currentDeck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>{currentDeck.name}: Study</h1>
        {currentDeck.cards.length > 2 ? (
          <Cards currentDeck={currentDeck.cards} />
        ) : (
          <div>
            <h2>Not enough cards.</h2>
            <p>
              You need at least 3 cards to study. There are{" "}
              {currentDeck.cards.length} cards in this deck.
            </p>
            <Link
              to={`/decks/${currentDeck.id}/cards/new`}
              className="btn btn-primary pr-4 pl-4"
            >
              Add Cards
            </Link>
          </div>
        )}
      </div>
    );
  }
  return <LoaderAnimation />;
}
