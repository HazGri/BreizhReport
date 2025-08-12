import axios from "axios";
import { create } from "zustand";

export const useFavoritesStore = create((set) => ({
  favorites: [],
  loading: true,
  error: null,

  fetchFavorites: async (token) => {
    if (!token) {
      set({ favorites: [], loading: false });
      return;
    }

    set({ loading: true, error: null });
    try {
      const res = await axios.get("https://breizh-report-130fab00c3e0.herokuapp.com/api/user/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ favorites: res.data, loading: false });
    } catch {
      set({ error: "Erreur chargement favoris", loading: false });
    }
  },

  toggleFavorite: async (spotId, token) => {
    if (!token) {
      alert("Vous devez être connecté pour ajouter un favori");
      return;
    }

    try {
      await axios.post(
        `https://breizh-report-130fab00c3e0.herokuapp.com/api/user/favorites/toggle/${spotId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Après toggle, on refetch la liste des favoris
      const res = await axios.get("https://breizh-report-130fab00c3e0.herokuapp.com/api/user/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ favorites: res.data });
    } catch (error) {
      console.error("Erreur toggle favori", error);
    }
  },
}));
