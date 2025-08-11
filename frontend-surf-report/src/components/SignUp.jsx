import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setShowErrorToast(true);
      // Cache le toast d'erreur après 3 secondes
      const timer = setTimeout(() => {
        setShowErrorToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      setShowToast(true);

      // Reset inputs
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

      // Redirection après 2s
      setTimeout(() => {
        setShowToast(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-100 rounded-box w-md mt-[8%] border p-4">
          <legend className="fieldset-legend text-xl font-noto">
            Inscription
          </legend>
          <label className="label">Prenom</label>
          <input
            type="text"
            className="input rounded-2xl my-2 w-full"
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label className="label">Nom</label>
          <input
            type="text"
            className="input rounded-2xl my-2 w-full"
            placeholder="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label className="label">Email</label>
          <input
            type="email"
            className="input rounded-2xl my-2 w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="label">Mot de passe</label>
          <input
            type="password"
            className="input rounded-2xl w-full my-2"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="rounded-3xl btn btn-neutral mt-4"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-ring loading-md"></span>
            ) : (
              "S'inscrire"
            )}
          </button>
        </fieldset>
      </form>

      {showToast && (
        <div className="toast">
          <div className="alert alert-success">
            <span>Inscription réussie.</span>
          </div>
        </div>
      )}

      {showErrorToast && (
        <div className="toast">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
