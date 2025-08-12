import React, { useEffect } from "react";
import Spots from "./Spots";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { useFavoritesStore } from "../stores/favoritesStore";

const FavoriteSpots = () => {
  const token = useAuthStore((state) => state.token);

  // On récupère la fonction fetchFavorites depuis le store favorites
  const {
    favorites: spots,
    loading,
    error,
    fetchFavorites,
  } = useFavoritesStore();

  // À chaque changement de token, on relance le fetch des favoris
  useEffect(() => {
    if (token) {
      fetchFavorites(token);
    }
  }, [token, fetchFavorites]);

  if (!token) {
    return (
      <div className="flex flex-col items-center gap-4 w-full max-w-10/12 px-4 font-noto mb-5">
        <div className="flex flex-col sm:flex-row justify-center w-full items-center mt-30 gap-2">
          <Link to="/login" className="btn btn-white rounded-4xl p-5">
            Se connecter
          </Link>
          <p className="font-noto italic text-sm sm:text-md">pour afficher vos spots favoris</p>
        </div>
      </div>
    );
  }

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-white">Chargement des favoris...</p>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  if (error)
    return <p className="text-red-500">Session expirée, reconnectez-vous.</p>;

  return (
    <div className="flex flex-col items-center gap-4 px-4 font-noto mb-5 w-10/12">
      <div className="flex flex-col gap-5 w-full">
        <h1 className="sm:text-4xl text-2xl text-white font-bold mt-5 select-none">
          Vos spots favoris
        </h1>
        <Spots spots={spots} />
      </div>
    </div>
  );
};

export default FavoriteSpots;
