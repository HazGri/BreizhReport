import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AutoCompleteInput from "./AutoCompleteInput";
import createSlug from "../lib/slug";
import useAuthStore from "../stores/useAuthStore";

const NavBar = ({ spots }) => {
  const logout = useAuthStore((state) => state.logout);

  const [inputValue, setInputValue] = useState("");
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleInputChange = (e, value) => {
    setInputValue(value);
    if (value.length >= 2) {
      const filtered = spots.filter((spot) =>
        spot.name.toLowerCase().includes(value.toLowerCase())
      );
      const formatted = filtered.map((spot, idx) => ({
        label: spot.name,
        id: `${spot.name}-${idx}`,
        ...spot,
      }));
      setOptions(formatted);
    } else {
      setOptions([]);
    }
  };

  const handleChange = (e, newValue) => {
    setSelectedSpot(newValue);
    if (newValue && newValue.name) {
      const slug = createSlug(newValue.name);
      navigate(`/${slug}`);
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-sm font-noto z-10">
      <div className="relative flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-sm sm:text-xl italic text-[#EF9436]"
        >
          BreizhReport
        </Link>
        <img
          src="/assets/logo.png"
          className="absolute -top-0 left-38 h-10 w-10 hidden sm:block"
          alt="Logo"
        />
      </div>

      <AutoCompleteInput
        label="Cherchez un spot"
        value={selectedSpot}
        inputValue={inputValue}
        options={options}
        loading={false}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />

      <div className="flex-none">
        {token ? (
          <>
            <img
              src="assets/logout.svg"
              className="h-8 sm:hidden cursor-pointer"
              alt="logo deconnexion"
              onClick={() => {
                logout();
                navigate("/");
              }}
            />
            <button
              className="btn btn-ghost bg-base-100 font-noto p-2 mx-2 hidden sm:block"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Déconnexion
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
