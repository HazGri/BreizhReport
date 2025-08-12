import React from "react";

const Spot = ({ title, coordinates }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  const imgUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${coordinates.lng},${coordinates.lat},15/600x300?access_token=${apiKey}`;

  return (
    <div className="card bg-base-100">
      <figure>
        <img
          src={imgUrl}
          alt={`Vue satellite du spot ${title}`}
          className="w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-sm xl:text-lg">{title}</h2>
      </div>
    </div>
  );
};

export default Spot;
