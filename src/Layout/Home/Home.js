import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import DeleteDeckBTN from "./DeleteDeckBTN";
import LoaderAnimation from "../LoaderAnimation";
import { listDecks } from "../../utils/api";

export default function Home() {
  const [allDecks, setAllDecks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function loadDecks() {
      const data = await listDecks();
      setAllDecks(data);
      setHasLoaded(!hasLoaded);
    }
    loadDecks();
  }, []);

  if (hasLoaded && allDecks.length === 0) {
    return (
      <div>
        <Link to="/decks/new" className="btn btn-secondary pr-4 pl-4 mb-2">
          Create Deck
        </Link>
        <h1>Please Add a Deck</h1>
      </div>
    );
  }

  if (allDecks.length > 0) {
    return (
      <div>
        <div>
          <Link to="/decks/new" className="btn btn-secondary pr-4 pl-4 mb-2">
            Create Deck
          </Link>
        </div>
        {allDecks.map((deck, index) => (
          <div key={index} className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">{deck.name}</h5>
                <p className="card-title">{deck.cards.length} cards</p>
              </div>
              <p className="card-text">{deck.description}</p>
              <div className="d-flex justify-content-between">
                <div>
                  <Link
                    to={`/decks/${deck.id}`}
                    className="btn btn-secondary pr-4 pl-4 mr-2"
                  >
                    View
                  </Link>
                  <Link
                    to={`/decks/${deck.id}/study`}
                    className="btn btn-primary pr-4 pl-4"
                  >
                    Study
                  </Link>
                </div>
                <DeleteDeckBTN
                  DeleteIndex={index}
                  allDecks={allDecks}
                  deckId={deck.id}
                />
              </div>
            </div>
          </div>
        ))}
        <br />
      </div>
    );
  }
  return <LoaderAnimation />;
}
