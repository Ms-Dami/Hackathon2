import { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import TipUpload from "./components/UploadForm/UploadForm";
import TipsList from "./components/TipsList/TipsList";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tips, setTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch(API_URL + "/tips");
        if (!response.ok) {
          throw new Error("Failed to fetch tips");
        }
        const data = await response.json();
        setTips(data);
        setFilteredTips(data); // Initially set to all tips
      } catch (error) {
        console.error("Error fetching tips:", error);
      }
    };

    fetchTips();
  }, []);

  // Filter tips based on category
  useEffect(() => {
    if (categoryFilter === "all") {
      setFilteredTips(tips);
    } else {
      const filtered = tips.filter((tip) => tip.category === categoryFilter);
      setFilteredTips(filtered);
    }
  }, [categoryFilter, tips]);

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
  };

  const addNewTip = (newTip) => {
    setTips([...tips, newTip]);
  };

  return (
    <>
      <div className="app">
        <h1>Coding Tips Dictionary</h1>
        <TipUpload />
        <div className="filter-buttons">
          <button onClick={() => handleCategoryChange("all")}>All</button>
          <button onClick={() => handleCategoryChange("jargon")}>Jargon</button>
          <button onClick={() => handleCategoryChange("must-knows")}>
            Must-Knows
          </button>
          <button onClick={() => handleCategoryChange("building-skills")}>
            Building Skills
          </button>
          <TipsList tips={filteredTips} />
        </div>
      </div>
    </>
  );
}

export default App;
