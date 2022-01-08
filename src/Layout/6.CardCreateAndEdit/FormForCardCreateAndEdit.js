import { Link } from "react-router-dom";

//Created a form compopant to use in card create/edit screens
export default function FormForCardEditAndCreate({
  url,
  deckId,
  name,
  handleSubmit,
  handleChange,
  cardData,
  cardId
}) {
  /*
   *Declaring text variables that will change depending on weather
   *the user is in the card edit or create screen (line 20 and 68-75)
   */
  let doneOrCancelText = "";
  let saveOrSubmitText = "";
  let addOrEditCardText = ""
  let cardEditOrCreateHeaderText = ""

  if (url.split().includes(`/decks/${deckId}/cards/new`)) {
    doneOrCancelText = "Done";
    saveOrSubmitText = "Save";
    addOrEditCardText = "Add Card"
    cardEditOrCreateHeaderText = `${name}: Add Card`
  } else {
    doneOrCancelText = "Cancel";
    saveOrSubmitText = "Submit";
    addOrEditCardText = `Edit Card ${cardId}`
    cardEditOrCreateHeaderText = "Edit Card"
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
          <li className="breadcrumb-item active">{addOrEditCardText}</li>
        </ol>
      </nav>
      <h1>{cardEditOrCreateHeaderText}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="front">Front</label>
        <br />
        <textarea
          type="textarea"
          id="front"
          name="front"
          required={true}
          placeholder="Front side of card"
          style={{ width: "100%", height: "65px" }}
          onChange={handleChange}
          value={cardData.front}
        />
        <label htmlFor="back">Back</label>
        <br />
        <textarea
          type="textarea"
          id="back"
          name="back"
          required={true}
          placeholder="Back side of card"
          style={{ width: "100%", height: "65px" }}
          onChange={handleChange}
          value={cardData.back}
        />
        <div className="d-flex mt-3">
          <Link
            to={`/decks/${deckId}`}
            className="btn btn-secondary pr-4 pl-4 mr-2"
          >
            {doneOrCancelText}
          </Link>
          <button type="submit" className="btn btn-primary pr-4 pl-4">
            {saveOrSubmitText}
          </button>
        </div>
      </form>
    </div>
  );
}
