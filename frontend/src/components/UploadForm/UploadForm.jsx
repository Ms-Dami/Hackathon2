import "./UploadForm.scss";
import { useState } from "react";
import axios from "axios";

const TipUpload = () => {
  const [category, setCategory] = useState("");
  const [term, setTerm] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const newTip = {
      category,
      term,
      description,
      username,
    };

    try {
      await axios.post("/tips", newTip);
      setCategory("");
      setTerm("");
      setDescription("");
      setUsername("");
      setIsSubmitting(false);
    } catch (error) {
      setError("Failed to submit tip. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="tip-upload">
      <h2>Submit a New Tip</h2>
      <form onSubmit={handleSubmit} className="tip-upload__form">
        <div className="tip-upload__form-group">
          <label htmlFor="tips">Choose a tip:</label>
          <select name="tips" id="tips">
            <option value="jargon">Jargon</option>
            <option value="must knows">Must Knows</option>
            <option value="building skills">Building Skills</option>
          </select>
        </div>
        <div className="tip-upload__form-group">
          <label htmlFor="term">Term</label>
          <input
            type="text"
            id="term"
            value={term}
            onChange={handleTermChange}
            placeholder="Enter term"
            required
          />
        </div>
        <div className="tip-upload__form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Add a description"
            required
          ></textarea>
        </div>
        <div className="tip-upload__form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <button
          type="submit"
          className="tip-upload__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Tip"}
        </button>
        {error && <p className="tip-upload__error">{error}</p>}
      </form>
    </div>
  );
};

export default TipUpload;
