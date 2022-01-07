import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";

import { readDeck } from "../../../utils/api";
import ListAllCardsForDeck from "./ListAllCardsForDeck";
import LoaderAnimation from "../../LoaderAnimation";
import DeleteDeckBTN from "../../Home/DeleteDeckBTN"

export default function ViewDeckScreen() {
  const { deckId } = useParams();
  const {url} = useRouteMatch()
  const history = useHistory()
  
  const [currentDeck, setCurrentDeck] = useState({});
  const id = currentDeck.id;
  
  useEffect(() => {
    setCurrentDeck({});
    async function loadCurrentDeck() {
      const deckData = await readDeck(deckId);
      setCurrentDeck(deckData);
    }
    loadCurrentDeck();
  }, []);



  if (id) {
    const cards = currentDeck.cards;
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">{currentDeck.name}</li>
          </ol>
        </nav>
        <h1>{currentDeck.name}</h1>
        <p>{currentDeck.description}</p>
        <div className="d-flex justify-content-between">
          <div>
            <Link
              to={`/decks/${id}/edit`}
              className="btn btn-secondary pr-4 pl-4 mr-2"
            >
              Edit
            </Link>
            <Link
              to={`/decks/${id}/study`}
              className="btn btn-primary pr-4 pl-4 mr-2"
            >
              Study
            </Link>
            <Link
              to={`/decks/${id}/cards/new`}
              className="btn btn-primary pr-4 pl-4"
            >
              Add Cards
            </Link>
          </div>
          <DeleteDeckBTN deckId={deckId} checkLocation={"viewDeckScreen"}/>
        </div>
        <br />
        <ListAllCardsForDeck cards={cards} setCurrentDeck={setCurrentDeck} deckId={deckId}/>
      </div>
    );
  }
  return <LoaderAnimation />
}
