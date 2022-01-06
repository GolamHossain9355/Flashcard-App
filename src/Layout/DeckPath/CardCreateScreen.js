import { useState, useEffect } from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";

import { readDeck, createCard } from "../../utils/api";
import LoaderAnimation from "../LoaderAnimation";

export default function CardCreateScreen() {
  const { url } = useRouteMatch();
  const { deckId } = useParams();
  const initialCardData = {
    front: "",
    back: "",
    deckId,
  };

  const [newCardData, setNewCardData] = useState(initialCardData);
  const [deckToAddCardTo, setDeckToAddCardTo] = useState({});

  useEffect(() => {
    async function loadDeckToAddCardTo() {
      const data = await readDeck(deckId);
      setDeckToAddCardTo(data);
    }
    loadDeckToAddCardTo();
  }, []);

  const handleChange = ({ target }) => {
    setNewCardData({
      ...newCardData,
      [target.name]: target.value,
    });
  };

  const handleCardAddSubmit = (event) => {
    event.preventDefault();

    async function loadNewCardData() {
      await createCard(deckId, newCardData);
    }
    loadNewCardData();
    setNewCardData(initialCardData);
  };

  if (deckToAddCardTo.id) {
    let name = deckToAddCardTo.name;
    if (deckToAddCardTo.name.length === 0) {
      name = "No Deck Name";
    }

    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={url}>{name}</Link>
            </li>
            <li className="breadcrumb-item active">Add Card</li>
          </ol>
        </nav>
        <h1>{name}: Add Card</h1>
        <form onSubmit={handleCardAddSubmit}>
          <label htmlFor="front">Front</label>
          <br />
          <textarea
            type="textarea"
            id="front"
            name="front"
            placeholder="Front side of card"
            style={{ width: "100%", height: "65px" }}
            onChange={handleChange}
            value={newCardData.front}
          />
          <label htmlFor="back">Back</label>
          <br />
          <textarea
            type="textarea"
            id="back"
            name="back"
            placeholder="Back side of card"
            style={{ width: "100%", height: "65px" }}
            onChange={handleChange}
            value={newCardData.back}
          />
          <div className="d-flex mt-3">
            <Link
              to={`/decks/${deckId}`}
              className="btn btn-secondary pr-4 pl-4 mr-2"
            >
              Done
            </Link>
            <button type="submit" className="btn btn-primary pr-4 pl-4">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }

  return <LoaderAnimation />;
}
