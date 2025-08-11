import React, { useEffect, useState } from "react";
import axios from "axios";
import DayForecast from "./DayForecast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart } from "lucide-react";
import FavoriteSpots from "./FavoriteSpots";
import { useFavoritesStore } from "../stores/favoritesStore";
import useAuthStore from "../stores/useAuthStore";

const SpotForecast = ({ spot, departement = 82 }) => {
  const { favorites, toggleFavorite, fetchFavorites } = useFavoritesStore();
  const token = useAuthStore((state) => state.token);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
  const [weather, setWeather] = useState(null);
  const [wind, setWind] = useState(null);
  const [tide, setTide] = useState(null);
  const [error, setError] = useState(null);

  // Charger les favoris une seule fois au montage
  useEffect(() => {
    fetchFavorites();
  }, []);

  // Fonction utilitaire pour transformer les données horaires en jours indexés
  function transformHourlyToIndexedDays(hourlyData) {
    if (!hourlyData || !hourlyData.time) return {};
    const { time, ...rest } = hourlyData;
    const days = {};

    time.forEach((isoString, i) => {
      const dayIndex = Math.floor(i / 24);
      if (!days[dayIndex]) days[dayIndex] = [];

      const entry = { time: isoString };
      for (const key in rest) {
        entry[key] = rest[key][i];
      }

      days[dayIndex].push(entry);
    });

    return days;
  }

  const getNextFourDays = () => {
    const formatter = new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    const dates = [];

    for (let i = 0; i < 4; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      const formatted = formatter.format(date);
      const capitalized =
        formatted.charAt(0).toUpperCase() + formatted.slice(1);
      dates.push(capitalized);
    }

    return dates;
  };
  const fourDaysArray = getNextFourDays();

  const lat = spot?.location?.gps?.lat;
  const lng = spot?.location?.gps?.lng;

  const imgUrl =
    lat && lng
      ? `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${lng},${lat},13/600x300?access_token=${apiKey}`
      : null;

  // Chargement des données marées
  useEffect(() => {
    if (!departement) {
      setTide(null);
      return;
    }
    const url = `http://localhost:8080/api/marees/${departement}`;
    axios
      .get(url)
      .then((response) => {
        setTide(response.data);
      })
      .catch((error) => {
        console.error("Erreur chargement marées :", error);
        setTide(null);
      });
  }, [departement]);

  // Chargement données météo marines (vagues)
  useEffect(() => {
    if (!lat || !lng) return;

    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&hourly=wind_wave_height,wind_wave_direction,wind_wave_period,swell_wave_height,swell_wave_direction,swell_wave_period,sea_level_height_msl&timezone=auto&forecast_days=4`;
    axios
      .get(url)
      .then((response) => {
        const grouped = transformHourlyToIndexedDays(response.data.hourly);
        setWeather(grouped);
        setError(null);
      })
      .catch((error) => {
        console.error(
          "Erreur météo marine :",
          error.response?.data || error.message
        );
        setError("Erreur lors du chargement des données météo marines.");
      });
  }, [lat, lng]);

  // Chargement données météo vent
  useEffect(() => {
    if (!lat || !lng) return;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=wind_speed_10m,wind_direction_10m,apparent_temperature,rain&timezone=auto&forecast_days=4`;
    axios
      .get(url)
      .then((response) => {
        const grouped = transformHourlyToIndexedDays(response.data.hourly);
        setWind(grouped);
        setError(null);
      })
      .catch((error) => {
        console.error(
          "Erreur météo vent :",
          error.response?.data || error.message
        );
        setError("Erreur lors du chargement des données météo du vent.");
      });
  }, [lat, lng]);

  // Calcul si le spot est favori, direct dans le rendu, pas d'état local inutile
  const favorite = favorites.some((s) => s.id === spot.id);

  // Affichage conditionnel amélioré
  const isLoading = !weather || !wind || !tide;

  if (error) return <p className="text-red-500">{error}</p>;
  if (isLoading) return <p>Chargement des données météo...</p>;

  return (
    <>
      <div className="w-11/12 flex-col items-center gap-5 lg:flex-row flex mt-10 mb-30">
        <div className="md:w-5/12">
          <div className="flex items-center gap-3">
            <h1 className="text-white font-noto text-4xl">{spot.name}</h1>
            <Heart
              className="cursor-pointer"
              fill={favorite ? "#f87171" : "none"}
              stroke={favorite ? "#f87171" : "#ffffff"}
              onClick={() => toggleFavorite(spot.id, token)}
              size={32}
            />
          </div>
          <p className="font-noto text-lg mt-10">{spot.description}</p>
          {imgUrl && (
            <img
              className="rounded-4xl mt-10 select-none"
              src={imgUrl}
              alt="image satellite du spot"
              draggable={false}
            />
          )}
        </div>

        <Carousel className="md:w-7/12">
          <CarouselContent>
            {fourDaysArray.map((day, index) => (
              <CarouselItem key={day}>
                <DayForecast
                  day={day}
                  weather={weather[index]}
                  wind={wind[index]}
                  spot={spot}
                  tide={tide[index]}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hover:cursor-pointer" />
          <CarouselNext className="hover:cursor-pointer" />
        </Carousel>
      </div>
      <FavoriteSpots />
    </>
  );
};

export default SpotForecast;
