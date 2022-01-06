import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { createDeck } from "../../utils/api";

export default function DeckCreateScreen() {
  const history = useHistory();
  const initialDeckFormData = {
    name: "",
    description: "",
  };

  const [deckFormData, setDeckFormData] = useState(initialDeckFormData);
  const handleChange = ({ target }) => {
    setDeckFormData({
      ...deckFormData,
      [target.name]: target.value,
    });
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    async function creatingDeck() {
      const data = await createDeck(deckFormData);
      history.push(`/decks/${data.id}`);
    }
    creatingDeck();
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmitClick}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Deck Name"
          style={{ width: "100%", marginBottom: ".6rem" }}
          onChange={handleChange}
          value={deckFormData.name}
        />
        <br />
        <label htmlFor="description ">Description </label>
        <br />
        <textarea
          type="textarea"
          id="description"
          name="description"
          placeholder="Brief description of the deck"
          style={{ width: "100%", height: "150px" }}
          onChange={handleChange}
          value={deckFormData.description}
        />
        <div className="d-flex mt-3">
          <Link to="/" className="btn btn-secondary pr-4 pl-4 mr-2">
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
