import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import DeleteDeckBTN from "./DeleteDeckBTN";
import LoaderAnimation from "../LoaderAnimation";
import { listDecks } from "../../utils/api";

export default function Home() {
  //state variables for rendering all of the decks
  const [allDecks, setAllDecks] = useState([]);

  //state variable that checks if the page has loaded or not
  const [hasLoaded, setHasLoaded] = useState(false);

  //getting all decks information
  useEffect(() => {
    async function loadDecks() {
      const data = await listDecks();
      setAllDecks(data);
      setHasLoaded(!hasLoaded);
    }
    loadDecks();
  }, []);

  /*
   *created a warning to let the users create a deck if there are none added using the
   *hasloaded and allDecks states
   */
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

  //*checks if the api call for decks information from listDecks has returned or not
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
                <DeleteDeckBTN deckId={deck.id} setAllDecks={setAllDecks} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  //loading animation before page renders
  return <LoaderAnimation />;
}
