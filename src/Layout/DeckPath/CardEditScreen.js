import { useState, useEffect } from "react";
import { Link, useRouteMatch, useParams, useHistory } from "react-router-dom";

import { readDeck, readCard, updateCard } from "../../utils/api";
import LoaderAnimation from "../LoaderAnimation";

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
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={url}>{currentDeck.name}</Link>
            </li>
            <li className="breadcrumb-item active">Edit Card {cardId}</li>
          </ol>
        </nav>
        <h1>Edit Card</h1>
        <form onSubmit={handleUpdatedCardSubmit}>
          <label htmlFor="front">Front</label>
          <br />
          <textarea
            type="textarea"
            id="front"
            name="front"
            placeholder="Front side of card"
            style={{ width: "100%", height: "65px" }}
            onChange={handleUpdatedChange}
            value={storedCardData.front}
          />
          <label htmlFor="back">Back</label>
          <br />
          <textarea
            type="textarea"
            id="back"
            name="back"
            placeholder="Back side of card"
            style={{ width: "100%", height: "65px" }}
            onChange={handleUpdatedChange}
            value={storedCardData.back}
          />
          <div className="d-flex mt-3">
            <Link
              to={`/decks/${deckId}`}
              className="btn btn-secondary pr-4 pl-4 mr-2"
            >
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary pr-4 pl-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
  return <LoaderAnimation />;
}
