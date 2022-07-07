import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import ErrorMessage from "../errorMessage";
import { useNavigate } from "react-router-dom";
import "./Ajouter.css";

export default function Ajouter() {
  const [user, setUser] = useState("");
  const [cv1, setCv1] = useState("");
  const [cv2, setCv2] = useState("");
  const [cv3, setCv3] = useState("");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [p3, setP3] = useState("");
  const [sessions, setSessions] = useState([]);
  const [nbr_plc, setNbr_plc] = useState("");
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    setSessions([
      "21/06 - 30/06",
      "01/07 - 10/07",
      "11/07 - 20/07",
      "21/07 - 30/07",
      "01/08 - 10/08",
      "11/08 - 20/08",
      "21/08 - 30/08",
      "01/09 - 10/09",
      "11/09 - 20/09",
    ]);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      const userid = JSON.parse(localStorage.getItem("userInfo"))._id;
      const date = new Date().getFullYear();
      const choixs = [
        { centre: cv1, session: p1 },
        { centre: cv2, session: p2 },
        { centre: cv3, session: p3 },
      ];
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        "/api/demandes/ajouter",
        { userid, choixs, nbr_plc, date },
        config
      );
      setVariant("success");
      setMessage("Congratulation , Votre demande est enregistrée");
      setTimeout(() => {
        setMessage(null);
        navigate("/home");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="home">
      <Sidebar login={user.login} />
      <div className="profilee">
        <h1 className="demande">Ajouter Demande</h1>
        <form className="forme" onSubmit={submitHandler}>
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
                  value={cv1}
                  onChange={(e) => setCv1(e.target.value)}
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
                  name="p1"
                  className="form-control"
                  required
                  value={p1}
                  onChange={(e) => setP1(e.target.value)}
                >
                  <option
                    className="form-control"
                    type="text"
                    name="service"
                    value="null"
                  >
                    choisissez
                  </option>
                  {sessions.map((val, key) => {
                    return (
                      <option value={val} key={key}>
                        {val}
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
                  value={cv2}
                  onChange={(e) => setCv2(e.target.value)}
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
                  name="p2"
                  className="form-control"
                  required
                  value={p2}
                  onChange={(e) => setP2(e.target.value)}
                >
                  <option
                    className="form-control"
                    type="text"
                    name="service"
                    value="null"
                  >
                    choisissez
                  </option>
                  {sessions.map((val, key) => {
                    return (
                      <option value={val} key={key}>
                        {val}
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
                  value={cv3}
                  onChange={(e) => setCv3(e.target.value)}
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
                  name="p3"
                  className="form-control"
                  required
                  value={p3}
                  onChange={(e) => setP3(e.target.value)}
                >
                  <option
                    className="form-control"
                    type="text"
                    name="service"
                    value="null"
                  >
                    choisissez
                  </option>
                  {sessions.map((val, key) => {
                    return (
                      <option value={val} key={key}>
                        {val}
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
                  name="name"
                  required
                  value={nbr_plc}
                  onChange={(e) => setNbr_plc(e.target.value)}
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
