import { Link } from "react-router-dom";

//created a form componant to use in deck create/edit screens
export default function FormForDeckCreateAndEdit({
  handleSubmit,
  handleChange,
  formData,
}) {
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Deck Name"
          required={true}
          style={{ width: "100%", marginBottom: ".6rem" }}
          onChange={handleChange}
          value={formData.name}
        />
        <br />
        <label htmlFor="description ">Description </label>
        <br />
        <textarea
          type="textarea"
          id="description"
          name="description"
          required={true}
          placeholder="Brief description of the deck"
          style={{ width: "100%", height: "150px" }}
          onChange={handleChange}
          value={formData.description}
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
