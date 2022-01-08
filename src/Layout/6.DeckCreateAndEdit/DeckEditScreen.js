import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { readDeck, updateDeck } from "../../utils/api";
import LoaderAnimation from "../1.ComonFiles/LoaderAnimation";
import FormForDeckCreateAndEdit from "./FormForDeckCreateAndEdit";

export default function DeckEditScreen() {
  const history = useHistory();
  const { deckId } = useParams();

  const [oldDeckDataToEdit, setOldDeckDataToEdit] = useState({});

  useEffect(() => {
    async function loadDeckDataToEdit() {
      const dataToEdit = await readDeck(deckId);
      setOldDeckDataToEdit({
        id: dataToEdit.id,
        name: dataToEdit.name,
        description: dataToEdit.description,
        cards: dataToEdit.cards,
      });
    }
    loadDeckDataToEdit();
  }, []);

  const handleEditedChange = ({ target }) => {
    setOldDeckDataToEdit({
      ...oldDeckDataToEdit,
      [target.name]: target.value,
    });
  };

  const handleEditedSubmitClick = (event) => {
    event.preventDefault();
    async function loadEditedDeck() {
      await updateDeck(oldDeckDataToEdit);
      history.push(`/decks/${deckId}`);
    }
    loadEditedDeck();
  };

  if (oldDeckDataToEdit.id) {
    return (
      <FormForDeckCreateAndEdit
        handleSubmit={handleEditedSubmitClick}
        handleChange={handleEditedChange}
        formData={oldDeckDataToEdit}
      />
    );
  }

  return <LoaderAnimation />;
}
