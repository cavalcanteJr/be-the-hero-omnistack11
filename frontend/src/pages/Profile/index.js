import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import "./styles.css";
import api from "../../services/api";
import { logout } from "../../services/auth";

export default function Profile() {
  const history = useHistory();
  const [incidents, setIncidents] = useState([]);

  const ongName = localStorage.getItem("ongName");
  const ongEmail = localStorage.getItem("ongEmail");

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          email: ongEmail,
        },
      })
      .then((response) => {
        setIncidents(response.data);
      })
      .catch((response) => {
        if (response.response.status === 401) history.push("/");
        console.log(response.response.status);
      });
  }, [ongEmail, history]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          email: ongEmail,
        },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch {
      alert("Erro ao deletar caso");
    }
  }

  function handleLogout() {
    logout();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <header style={{ backgroundImage: `url(${incident.imageurl})` }} />

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(incident.value)}
            </p>

            <button onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
