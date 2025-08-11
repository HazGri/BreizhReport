import React, { useEffect } from "react";
import Spots from "./Spots";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { useFavoritesStore } from "../stores/favoritesStore";

const FavoriteSpots = () => {
  const token = useAuthStore((state) => state.token);

  // On récupère la fonction fetchFavorites depuis le store favorites
  const { favorites: spots, loading, error, fetchFavorites } = useFavoritesStore();

  // À chaque changement de token, on relance le fetch des favoris
  useEffect(() => {
    if (token) {
      fetchFavorites(token);
    }
  }, [token, fetchFavorites]);

  if (!token) {
    return (
      <div className="flex flex-col items-center gap-4 w-full max-w-10/12 px-4 font-noto mb-5">
        <div className="flex justify-center items-center mt-30 gap-2">
          <Link to="/login">
            <button className="btn btn-neutral rounded-4xl p-5">
              Se connecter
            </button>
          </Link>
          <p className="font-noto italic">pour afficher vos spots favoris</p>
        </div>
      </div>
    );
  }

  if (loading) return <p className="text-white">Chargement des favoris...</p>;
  if (error) return <p className="text-red-500">Erreur lors du chargement</p>;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-10/12 px-4 font-noto mb-5">
      <div className="w-full">
        <h1 className="text-4xl text-white font-bold mt-5 select-none">
          Vos spots favoris
        </h1>
      </div>
      <Spots spots={spots} />
    </div>
  );
};

export default FavoriteSpots;
