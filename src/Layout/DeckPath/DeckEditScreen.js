import { useState, useEffect } from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";

import { readDeck, updateDeck } from "../../utils/api";
import LoaderAnimation from "../LoaderAnimation";

export default function DeckEditScreen() {
  const { url } = useRouteMatch();
  const { deckId } = useParams();

  const [toEditFormData, setToEditFormData] = useState({});

  useEffect(() => {
    async function loadDeckDataToEdit() {
      const dataToEdit = await readDeck(deckId);
      setToEditFormData({
        id: dataToEdit.id,
        name: dataToEdit.name,
        description: dataToEdit.description,
        cards: dataToEdit.cards,
      });
    }
    loadDeckDataToEdit();
  }, []);

  const handleEditedChange = ({ target }) => {
    setToEditFormData({
      ...toEditFormData,
      [target.name]: target.value,
    });
  };

  const handleEditedSubmitClick = (event) => {
    event.preventDefault();
    async function loadEditedDeck() {
      await updateDeck(toEditFormData);
    }
    loadEditedDeck();
  };

  if (toEditFormData.id) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">
              <Link to={url}>{toEditFormData.name}</Link>
            </li>
            <li className="breadcrumb-item active">Edit Deck</li>
          </ol>
        </nav>
        <h1>Edit Deck</h1>
        <form onSubmit={handleEditedSubmitClick}>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Deck Name"
            style={{ width: "100%", marginBottom: ".6rem" }}
            onChange={handleEditedChange}
            value={toEditFormData.name}
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
            onChange={handleEditedChange}
            value={toEditFormData.description}
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
