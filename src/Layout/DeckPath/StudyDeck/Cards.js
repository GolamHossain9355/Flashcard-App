import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Cards({ currentDeck }) {
  const history = useHistory();
  const initialFlipState = false;

  const [flipState, setFlipState] = useState(initialFlipState);
  const [deckCardNumber, setDeckNumber] = useState(0);

  const handleButtonClick = () => {
    if (deckCardNumber < currentDeck.length - 1 && flipState === true) {
      setDeckNumber(deckCardNumber + 1);
      setFlipState(!flipState);
    } else {
      setFlipState(!flipState);
    }
    if (deckCardNumber === currentDeck.length - 1 && flipState === true) {
      if (
        window.confirm(
          "Restart cards? \n\n Click `cancel` to return to the home page"
        )
      ) {
        setDeckNumber(0);
        setFlipState(!flipState);
      } else history.push("/");
    }
  };

  const card = currentDeck[deckCardNumber];
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {deckCardNumber + 1} of {currentDeck.length}
          </h5>
          <p className="card-text">{flipState ? card.back : card.front}</p>
          <button
            type="button"
            name="hasFlipped"
            className="btn btn-secondary pr-4 pl-4"
            onClick={handleButtonClick}
          >
            Flip
          </button>
          {flipState ? (
            <button
              type="button"
              className="btn btn-primary pr-4 pl-4 ml-2"
              onClick={handleButtonClick}
            >
              Next
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
