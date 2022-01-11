import { useState } from "react";
import { useHistory } from "react-router-dom";

import { createDeck } from "../../utils/api";
import FormForDeckCreateAndEdit from "./FormForDeckCreateAndEdit";

export default function DeckCreateScreen() {
  const history = useHistory();
  const initialDeckData = {
    name: "",
    description: "",
  };

  //creating the new deck data
  const [newDeckData, setNewDeckData] = useState(initialDeckData);
  const handleNewDataChange = ({ target }) => {
    setNewDeckData({
      ...newDeckData,
      [target.name]: target.value,
    });
  };

  /*
  *creating a new deck with the new data after the user 
  *clicks submit on the deck create screen, than taking the user
  *to the deck screen
  */
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
