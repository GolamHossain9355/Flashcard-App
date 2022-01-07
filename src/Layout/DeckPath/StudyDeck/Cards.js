import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Cards({ currentDeck }) {
  const history = useHistory();

  const [hasFlipped, setHasFlipped] = useState(false);
  const [deckCardNumber, setDeckNumber] = useState(0);

  const handleFlipClick = () => {
    setHasFlipped(!hasFlipped);
  };


  const handleNextClick = () => {
    if (deckCardNumber < currentDeck.length - 1 && hasFlipped === true) {
      setDeckNumber(deckCardNumber + 1);
      setHasFlipped(!hasFlipped);
    }
    if (deckCardNumber > 2 && hasFlipped === true) {
      if (
        window.confirm(
          "Restart cards? \n\n Click `cancel` to return to the home page"
        )
      ) {
        setDeckNumber(0);
        setHasFlipped(!hasFlipped);
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
          <p className="card-text">{hasFlipped ? card.back : card.front}</p>
          {hasFlipped ? (
            <button
              type="button"
              className="btn btn-primary pr-4 pl-4 mr-2"
              onClick={handleNextClick}
            >
              Next
            </button>
          ) : (
            ""
          )}
          <button
            type="button"
            name="hasFlipped"
            className="btn btn-secondary pr-4 pl-4"
            onClick={handleFlipClick}
          >
            Flip
          </button>
        </div>
      </div>
    </div>
  );
}
