import { useState } from "react";
import { useHistory } from "react-router-dom";

import { createDeck } from "../../../utils/api";
import FormForDeckCreateAndEdit from "./FormForDeckCreateAndEdit";

export default function DeckCreateScreen() {
  const history = useHistory();
  const initialDeckData = {
    name: "",
    description: "",
  };

  const [newDeckData, setNewDeckData] = useState(initialDeckData);
  const handleNewDataChange = ({ target }) => {
    setNewDeckData({
      ...newDeckData,
      [target.name]: target.value,
    });
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    async function creatingDeck() {
      const data = await createDeck(newDeckData);
      history.push(`/decks/${data.id}`);
    }
    creatingDeck();
  };

  return (
    <FormForDeckCreateAndEdit
      handleSubmit={handleSubmitClick}
      handleChange={handleNewDataChange}
      formData={newDeckData}
    />
  );
}
