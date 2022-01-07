import { Link } from "react-router-dom";

export default function CardEditAndCreateForm({
  url,
  deckId,
  name,
  handleSubmit,
  handleChange,
  cardData,
}) {
  let doneOrCancelText = "";
  let saveOrSubmitText = "";
  if (url.split().includes(`/decks/${deckId}/cards/new`)) {
    doneOrCancelText = "Done";
    saveOrSubmitText = "Save";
  } else {
    doneOrCancelText = "Cancel";
    saveOrSubmitText = "Submit";
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="front">Front</label>
        <br />
        <textarea
          type="textarea"
          id="front"
          name="front"
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
