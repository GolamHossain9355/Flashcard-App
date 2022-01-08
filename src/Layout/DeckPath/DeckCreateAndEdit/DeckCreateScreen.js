import { useState } from "react";
import { useHistory } from "react-router-dom";

import { createDeck } from "../../../utils/api";
import FormForDeckCreateAndEdit from "./FormForDeckCreateAndEdit";

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
    <FormForDeckCreateAndEdit
      handleSubmit={handleSubmitClick}
      handleChange={handleChange}
      formData={deckFormData}
    />
  );
}
