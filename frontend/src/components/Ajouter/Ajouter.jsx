import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import ErrorMessage from "../errorMessage";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import delay from "../delay";
import "./Ajouter.css";

export default function Ajouter() {
  const [values, setValues] = useState({
    cv1: "",
    cv2: "",
    cv3: "",
    s1: "",
    s2: "",
    s3: "",
    nbr_plc: "",
  });
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  const user_id = JSON.parse(userInfo)?._id;
  const token = JSON.parse(userInfo)?.token;

  const redirect = async () => {
    setVariant("success");
    setMessage("Congratulation , Votre demande est enregistrée");
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
  }, [success, data]);

  const getdata = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios.get("/api/sessions/", config).then((response) => {
      setData(response.data.sessions);
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const choixs = [
        { priorité: 1, centre: values.cv1, session_id: values.s1 },
        { priorité: 2, centre: values.cv2, session_id: values.s2 },
        { priorité: 3, centre: values.cv3, session_id: values.s3 },
      ];
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        "/api/demandes/ajouter",
        { user_id, nbr_plc: values.nbr_plc, choixs },
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
      <div className="profilee">
        <h1 className="demande">Ajouter Demande</h1>
        <form className="forme" onSubmit={submitHandler}>
          {loading && <Loading />}
          {message && <ErrorMessage variant={variant}>{message}</ErrorMessage>}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          <div className="row button">
            <div className="col">
              <div className="form-group">
                <label>Centre 1</label>
                <select
                  name="cv1"
                  className="form-control"
                  required
                  value={values.cv1}
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
                  <option value="CVE">ElJADIDA</option>
                  <option value="CVI">IMMOUZZER</option>
                  <option value="CVIF">IFRANE</option>
                  <option value="CVL">LAAYOUNE</option>
                  <option value="CVM">MARRAKECH</option>
                  <option value="CVC">CABO NEGRO</option>
                  <option value="CVH">HACIENDA</option>
                  <option value="CVSD">SAIDIA</option>
                  <option value="CVTAF">TAFOUGHALT</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>session 1</label>

                <select
                  name="s1"
                  className="form-control"
                  required
                  value={values.s1}
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
                  {data.map((val, key) => {
                    return (
                      <option value={val._id} key={key}>
                        {val.date_d + " - " + val.date_f}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row button">
            <div className="col">
              <div className="form-group">
                <label>Centre 2</label>

                <select
                  name="cv2"
                  className="form-control"
                  required
                  value={values.cv2}
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
                  <option value="CVE">ElJADIDA</option>
                  <option value="CVI">IMMOUZZER</option>
                  <option value="CVIF">IFRANE</option>
                  <option value="CVL">LAAYOUNE</option>
                  <option value="CVM">MARRAKECH</option>
                  <option value="CVC">CABO NEGRO</option>
                  <option value="CVH">HACIENDA</option>
                  <option value="CVSD">SAIDIA</option>
                  <option value="CVTAF">TAFOUGHALT</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>session 2</label>

                <select
                  name="s2"
                  className="form-control"
                  required
                  value={values.s2}
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
                  {data.map((val, key) => {
                    return (
                      <option value={val._id} key={key}>
                        {val.date_d + " - " + val.date_f}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row button">
            <div className="col">
              <div className="form-group">
                <label>Centre 3</label>

                <select
                  name="cv3"
                  className="form-control"
                  required
                  value={values.cv3}
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
                  <option value="CVE">ElJADIDA</option>
                  <option value="CVI">IMMOUZZER</option>
                  <option value="CVIF">IFRANE</option>
                  <option value="CVL">LAAYOUNE</option>
                  <option value="CVM">MARRAKECH</option>
                  <option value="CVC">CABO NEGRO</option>
                  <option value="CVH">HACIENDA</option>
                  <option value="CVSD">SAIDIA</option>
                  <option value="CVTAF">TAFOUGHALT</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>session 3</label>

                <select
                  name="s3"
                  className="form-control"
                  required
                  value={values.s3}
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
                  {data.map((val, key) => {
                    return (
                      <option value={val._id} key={key}>
                        {val.date_d + " - " + val.date_f}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row button">
            <div className="col">
              <div className="form-group">
                <label>Nombre de Places</label>
                <input
                  className="form-control"
                  type="number"
                  name="nbr_plc"
                  required
                  value={values.nbr_plc}
                  onChange={handlechange}
                />
              </div>
            </div>
          </div>

          <div className="row button">
            <div className="col d-flex justify-content-center">
              <button className="btn btn-primary" type="submit">
                Envoyer Demande
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
