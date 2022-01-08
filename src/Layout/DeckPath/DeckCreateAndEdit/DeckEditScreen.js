import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { readDeck, updateDeck } from "../../../utils/api";
import LoaderAnimation from "../../LoaderAnimation";
import FormForDeckCreateAndEdit from "./FormForDeckCreateAndEdit";

export default function DeckEditScreen() {
  const history = useHistory()
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
      history.push(`/decks/${deckId}`)
    }
    loadEditedDeck();
  };

  if (toEditFormData.id) {
    return <FormForDeckCreateAndEdit 
    handleSubmit={handleEditedSubmitClick}
    handleChange={handleEditedChange}
    formData={toEditFormData}
    />
  }

  return <LoaderAnimation />;
}
