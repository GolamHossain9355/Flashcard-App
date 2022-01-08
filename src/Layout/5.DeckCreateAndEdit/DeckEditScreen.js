import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { readDeck, updateDeck } from "../../utils/api";
import LoaderAnimation from "../1.ComonFiles/LoaderAnimation";
import FormForDeckCreateAndEdit from "./FormForDeckCreateAndEdit";

export default function DeckEditScreen() {
  const history = useHistory();
  const { deckId } = useParams();

  const [oldDeckDataToEdit, setOldDeckDataToEdit] = useState({});

  //*getting the old deck data from the api
  useEffect(() => {
    async function loadDeckDataToEdit() {
      const dataToEdit = await readDeck(deckId);
      setOldDeckDataToEdit(dataToEdit);
    }
    loadDeckDataToEdit();
  }, []);

  //*putting the new data in
  const handleEditedChange = ({ target }) => {
    setOldDeckDataToEdit({
      ...oldDeckDataToEdit,
      [target.name]: target.value,
    });
  };

  //*updating the deck after the user clicks submit than taking the user to the deck screen
  const handleEditedSubmitClick = (event) => {
    event.preventDefault();
    async function loadEditedDeck() {
      await updateDeck(oldDeckDataToEdit);
      history.push(`/decks/${deckId}`);
    }
    loadEditedDeck();
  };

  //adding an if check to see if the api call has returned or not
  if (oldDeckDataToEdit.id) {
    return (
      <FormForDeckCreateAndEdit
        handleSubmit={handleEditedSubmitClick}
        handleChange={handleEditedChange}
        formData={oldDeckDataToEdit}
        location="edit"
      />
    );
  }

  //loading animation before api call returns value for the old deck data
  return <LoaderAnimation />;
}
