import { Link, useRouteMatch } from "react-router-dom";

import DeleteCardButton from "./DeleteCardButton";

export default function ListAllCardsForDecks({
  cards,
  setCurrentDeck,
  deckId,
}) {
  //edit button url to use in links
  const { url } = useRouteMatch();

  //*declaring dynamic word variables for adding cards warning (line 56)
  let cardOrCardsText = "card";
  let isOrAreText = "is";

  if (cards.length > 1) {
    cardOrCardsText += "s";
    isOrAreText = "are";
  }

  //*added a cards needed warning
  if (cards.length === 0) {
    return <h5 className="text-danger">No Cards Added Yet</h5>;
  }

  return (
    <div>
      <h1>Cards</h1>
      {cards.map((card, index) => (
        <div key={index}>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <p className="card-text col-6">{card.front}</p>
                <p className="card-text col-6">{card.back}</p>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <Link
                  to={`${url}/cards/${card.id}/edit`}
                  className="btn btn-secondary pr-4 pl-4 mr-2"
                >
                  Edit
                </Link>
                <DeleteCardButton
                  cardId={card.id}
                  deckId={deckId}
                  setCurrentDeck={setCurrentDeck}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      //*added warning to add more cards to be able to study
      {cards.length < 3 ? (
        <p className="text-warning bg-dark mt-4">
          You need at least 3 cards to study. There {isOrAreText} {cards.length}{" "}
          {cardOrCardsText} in this deck.
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}
