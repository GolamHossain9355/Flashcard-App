import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function CardsForStudyDeckScreen({ currentDeck }) {
  //declaring a history variable to use when the user confirms to either restart deck or not
  const history = useHistory();

  //*declaring state to check if the user clicked flip
  const [hasFlipped, setHasFlipped] = useState(false);

  //*declaring state variable to show the next CurrentCard after the user clicks the next button
  const [currentlyRenderedCardNumber, setCurrentlyRenderedCardNumber] =
    useState(0);

  //handles the flip button click
  const handleFlipClick = () => {
    setHasFlipped(!hasFlipped);
  };

  //handles the next button click
  const handleNextClick = () => {
    /*
     *checks if there are more cards to render and if the user clicked flip or not.
     *If true, it increases the currentlyRenderedCardNumber to show next card and sets hasFlipped value to false
     */
    if (
      currentlyRenderedCardNumber < currentDeck.length - 1 &&
      hasFlipped === true
    ) {
      setCurrentlyRenderedCardNumber(currentlyRenderedCardNumber + 1);
      setHasFlipped(!hasFlipped);
    } else {
      //this event fires after the user clicks next on the last CurrentCard
      const confirm = window.confirm(
        "Restart cards? \n\n Click `cancel` to return to the home page"
      );
      /*
      if the user confirms than the page starts rendering from the 1st CurrentCard
      otherwise it pushes the user to the home page
      */
      if (confirm) {
        setCurrentlyRenderedCardNumber(0);
        setHasFlipped(!hasFlipped);
      } else history.push("/");
    }
  };

  //declaring a variable for the current card to render
  const CurrentCard = currentDeck[currentlyRenderedCardNumber];
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {currentlyRenderedCardNumber + 1} of {currentDeck.length}
          </h5>
          <p className="card-text">
            {hasFlipped ? CurrentCard.back : CurrentCard.front}
          </p>
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
