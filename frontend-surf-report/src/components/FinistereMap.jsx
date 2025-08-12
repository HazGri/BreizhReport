import React, { useRef, useState, useCallback } from "react";
import { Map, Source, Layer } from "@vis.gl/react-maplibre";
import { Link, useNavigate } from "react-router-dom";
import "maplibre-gl/dist/maplibre-gl.css";
import createSlug from "../lib/slug";
import FavoriteSpots from "./FavoriteSpots";

const FinistereMap = ({ spots }) => {
  const mapRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const geojson = {
    type: "FeatureCollection",
    features: spots.map((spot, index) => ({
      type: "Feature",
      properties: {
        id: index,
        name: spot.name,
      },
      geometry: {
        type: "Point",
        coordinates: [spot.location.gps.lng, spot.location.gps.lat],
      },
    })),
  };

  const layerStyle = {
    id: "spot-points",
    type: "circle",
    paint: {
      "circle-radius": 5,
      "circle-color": "#007cbf",
      "circle-stroke-width": 2,
      "circle-stroke-color": "#000000",
    },
  };

  const handleMouseMove = useCallback((event) => {
    const map = mapRef.current.getMap();
    const features = map.queryRenderedFeatures(event.point, {
      layers: ["spot-points"],
    });

    if (features.length > 0) {
      const feature = features[0];
      setTooltip({
        x: event.originalEvent.clientX,
        y: event.originalEvent.clientY,
        name: feature.properties.name,
      });
    } else {
      setTooltip(null);
    }
  }, []);

  const handleClick = useCallback(
    (event) => {
      const map = mapRef.current.getMap();
      const features = map.queryRenderedFeatures(event.point, {
        layers: ["spot-points"],
      });

      if (features.length > 0) {
        const feature = features[0];
        const name = feature.properties.name;
        const slug = createSlug(name);
        navigate(`/${slug}`);
      }
    },
    [navigate]
  );

  return (
    <>
      <div className="relative mt-5 mb-10 flex flex-col mx-2 sm:flex-row items-center justify-center gap-8 w-9/12">
        <div className="sm:w-5/12 text-center sm:text-left">
          <div className="text-4xl sm:text-5xl font-bold font-noto text-white">
            Trouvez votre prochain spot en Bretagne !
          </div>
          {!token && (
            <Link to={"/register"}>
              <button className="btn btn-neutral rounded-4xl mt-7 p-5">
                Inscrivez-vous!
              </button>
            </Link>
          )}
        </div>
        <div className="w-full sm:w-6/12 rounded-xl overflow-hidden border-0 shadow-xl">
          <Map
            ref={mapRef}
            initialViewState={{
              longitude: -3.5,
              latitude: 48.2,
              zoom: 3,
            }}
            maxZoom={9}
            maxBounds={[
              [-6.5, 47.0],
              [-0.5, 49.5],
            ]}
            style={{ width: "100%", height: 400 }}
            mapStyle="https://demotiles.maplibre.org/style.json"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTooltip(null)}
            onClick={handleClick}
          >
            <Source id="spots" type="geojson" data={geojson}>
              <Layer {...layerStyle} />
            </Source>
          </Map>

          {tooltip && (
            <div
              className="absolute bg-white text-black px-2 py-1 rounded shadow"
              style={{
                left: tooltip.x - 40,
                top: tooltip.y - 40,
                pointerEvents: "none",
                zIndex: 1000,
              }}
            >
              {tooltip.name}
            </div>
          )}
        </div>
      </div>
      <FavoriteSpots />
    </>
  );
};

export default FinistereMap;
