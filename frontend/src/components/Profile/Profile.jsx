import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import ErrorMessage from "../errorMessage";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profil() {
  const [nom, setNom] = useState("");
  const [matricule, setMatricule] = useState("");
  const [service, setService] = useState("");
  const [category, setCategory] = useState("");
  const [stf, setStf] = useState("");
  const [date_emb, setDate_emb] = useState("");
  const [nbr_enf, setNbr_enf] = useState("");
  const [gsm, setGsm] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState(null);
  const [error, setError] = useState(false);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
    }
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    getdata();
  }, []);

  const getdata = () => {
    axios.get("/api/services/", config).then((response) => {
      setData(response.data.services);
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "/api/users/profile",
        { nom, matricule, service, category, stf, date_emb, nbr_enf, gsm },
        config
      );
      setVariant("success");
      setMessage("Congratulation , You Profil Has Been Updated");
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="home">
      <Sidebar login={user.login} />
      <div className="profile">
        <h1 className="prof">Profil</h1>
        <form className="form" onSubmit={submitHandler}>
          {message && <ErrorMessage variant={variant}>{message}</ErrorMessage>}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          <div className="row button">
            <div className="col">
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Matricule</label>
                <input
                  className="form-control"
                  type="number"
                  name="matricule"
                  required
                  value={matricule}
                  onChange={(e) => setMatricule(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row button">
            <div className="col">
              <div className="form-group">
                <label>Service</label>
                <select
                  name="stf"
                  className="form-control"
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option
                    className="form-control"
                    type="text"
                    name="service"
                    value="null"
                  >
                    choisissez
                  </option>
                  {data?.map((val, key) => {
                    return (
                      <option
                        className="form-control"
                        type="text"
                        name="service"
                        key={key}
                        value={val._id}
                      >
                        {val.ser_nom}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Catégorie</label>
                <select
                  name="category"
                  className="form-control"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option
                    className="form-control"
                    type="text"
                    name="service"
                    value="null"
                  >
                    choisissez
                  </option>
                  <option value="C">Cadre</option>
                  <option value="CS">Cadre Supérieur</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row button">
            <div className="col">
              <div className="form-group">
                <label>Situation Familial</label>
                <select
                  name="stf"
                  className="form-control"
                  required
                  value={stf}
                  onChange={(e) => setStf(e.target.value)}
                >
                  <option type="text" value="null">
                    choisissez
                  </option>
                  <option value="M">Marié</option>
                  <option value="C">Célibataire</option>
                  <option value="D">Divorcé</option>
                  <option value="V">Veuf</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Date d'embauche</label>
                <input
                  type="text"
                  name="date_emb"
                  className="form-control"
                  required
                  value={date_emb}
                  onChange={(e) => setDate_emb(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row button">
            <div className="col">
              <div className="form-group">
                <label>Nombre d'enfants</label>
                <input
                  className="form-control"
                  type="number"
                  name="nbr_enf"
                  required
                  value={nbr_enf}
                  onChange={(e) => setNbr_enf(e.target.value)}
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>Numéro de Télephone</label>
                <input
                  className="form-control"
                  type="text"
                  name="gsm"
                  required
                  value={gsm}
                  onChange={(e) => setGsm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row button">
            <div className="col d-flex justify-content-center">
              <button className="btn btn-primary" type="submit">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
