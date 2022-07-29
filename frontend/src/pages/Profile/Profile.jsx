import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../../layout/Sidebar/Sidebar";
import axios from "axios";
import ErrorMessage from "../errorMessage";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import delay from "../delay";
import "./Profile.css";

export default function Profil() {
  const [values, setValues] = useState({
    nom: "",
    matricule: "",
    ser_Id: "",
    category: "",
    stf: "",
    date_emb: "",
    nbr_enf: "",
    gsm: "",
  });
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  const token = JSON.parse(userInfo)?.token;

  const redirect = async () => {
    setVariant("success");
    setMessage("Congratulation , You Profil Has Been Updated");
    await delay(2000);
    setMessage("you will be redirected to the home page after a moment ...");
    await delay(3000);
    navigate("/home");
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (data.length === 0) {
      getdata();
    }
    if (success) {
      redirect();
    }
  }, [success]);

  const getdata = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios.get("/api/services/", config).then((response) => {
      setData(response.data.services);
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(
        "/api/users/profile",

        {
          nom: values.nom,
          matricule: values.matricule,
          stf: values.stf,
          ser_Id: values.ser_Id,
          category: values.category,
          date_emb: values.date_emb,
          nbr_enf: values.nbr_enf,
          gsm: values.gsm,
        },
        config
      );
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      await delay(2000);
      setError(null);
    }
  };
  return (
    <div className="home">
      <Sidebar />
      <div className="profile">
        <h1 className="prof">Profil</h1>
        {message && <ErrorMessage variant={variant}>{message}</ErrorMessage>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <form className="form" onSubmit={submitHandler}>
          <div className="row button">
            <div className="col">
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  className="form-control"
                  type="text"
                  name="nom"
                  required
                  value={values.nom}
                  onChange={handlechange}
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
                  value={values.matricule}
                  onChange={handlechange}
                />
              </div>
            </div>
          </div>
          <div className="row button">
            <div className="col">
              <div className="form-group">
                <label>Service</label>
                <select
                  name="ser_Id"
                  className="form-control"
                  required
                  value={values.ser_Id}
                  onChange={handlechange}
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
                  value={values.category}
                  onChange={handlechange}
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
                  value={values.stf}
                  onChange={handlechange}
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
                  value={values.date_emb}
                  onChange={handlechange}
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
                  value={values.nbr_enf}
                  onChange={handlechange}
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
                  value={values.gsm}
                  onChange={handlechange}
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
