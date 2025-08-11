import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const Login = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      setToken(response.data.token);

      setToast({ message: "Connexion réussie", type: "success" });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch {
      setToast({ message: "Échec de la connexion", type: "error" });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="fieldset bg-base-200 border-base-100 rounded-box w-md mt-[8%] border p-4"
      >
        <legend className="fieldset-legend text-xl font-noto">
          Se connecter
        </legend>

        <input
          type="email"
          className="input rounded-2xl my-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          type="password"
          className="input rounded-2xl w-full my-2"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button type="submit" className="rounded-3xl btn btn-neutral mt-4">
          Connexion
        </button>

        <Link to="/register" className="rounded-3xl btn btn-active mt-4">
          Pas de compte ? Inscris-toi !
        </Link>
      </form>

      {toast && (
        <div className="toast toast-end">
          <div
            className={`alert ${
              toast.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
