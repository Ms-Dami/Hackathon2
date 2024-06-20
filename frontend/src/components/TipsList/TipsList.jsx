import "./TipsList.scss";
import React from "react";

function TipsList({ tips }) {
  const tipDate = new Date(tips.date);
  const formattedTimestamp = tipDate.toLocaleDateString("en-US");

  return (
    <div className="tips-list">
      {tips.map((tip) => (
        <div key={tip.id} className="tips-list__card">
          <h3>[ {tip.term} ]</h3>
          <p className="tips-list__category">{tip.category}</p>
          <p>{tip.description}</p>
          <span className="tips-list__by">by</span>
          <span className="tips-list__username"> {tip.username}</span>{" "}
          <span className="tips-list__by">on</span>
          <span className="tips-list"> {formattedTimestamp}</span>
        </div>
      ))}
    </div>
  );
}

export default TipsList;
