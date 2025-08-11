import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/FinistereMap";
import NavBar from "./components/NavBar";
import FinistereMap from "./components/FinistereMap";
import axios from "axios";
import { useEffect, useState } from "react";
import SpotForecast from "./components/SpotForecast";
import createSlug from "./lib/slug";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/spots")
      .then((response) => {
        setSpots(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center ">
      <NavBar spots={spots} />
      <Routes>
        <Route path="/" element={<FinistereMap spots={spots} />} />
        {spots.map((element) => {
          const pathName = `/${createSlug(element.name)}`;
          return (
            <Route
              key={element.id}
              path={pathName}
              element={<SpotForecast spot={element} />}
            />
          );
        })}
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
