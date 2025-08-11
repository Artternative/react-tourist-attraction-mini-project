import React from "react";

const TripCard = React.memo(({ trip, onTagClick }) => {
  return (
    <div className="post-card">
      <img
        className="main-img"
        src={trip.photos[0]}
        alt="main"
        loading="lazy"
      />
      <div className="post-content">
        <a
          className="post-title"
          href={trip.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {trip.title}
        </a>
        <div className="post-desc">{trip.description.slice(0, 70)}...</div>
        <div className="post-info">
          <a href={trip.url} target="_blank" rel="noopener noreferrer">
            อ่านต่อ
          </a>
        </div>
        <div className="post-category">
          หมวด:{" "}
          {trip.tags.map((tag) => (
            <span key={tag} className="tag" onClick={() => onTagClick(tag)}>
              {tag}
            </span>
          ))}
        </div>
        <div className="post-images">
          {trip.photos.slice(1, 4).map((img) => (
            <img key={img} src={img} alt="thumb" className="thumb-img" loading="lazy" />
          ))}
        </div>
      </div>
    </div>
  );
});

export default TripCard;
