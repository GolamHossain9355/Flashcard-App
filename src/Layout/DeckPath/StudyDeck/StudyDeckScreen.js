import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

import Cards from "./Cards";
import LoaderAnimation from "../../LoaderAnimation";

export default function StudyDeckScreen({ currentDeck }) {
  const { url } = useRouteMatch();
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
  return <LoaderAnimation />
}
