import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Loading from "../Loading";
import "./Gestion.css";

export default function Gestion() {
  /*
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  const token = JSON.parse(userInfo)?.token;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const getdata = async () => {
    setLoading(true);
    await axios.get("/api/demandes/employe", config).then((res) => {
      setData(res.data.demsemp);
    });
    setLoading(false);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (data.length === 0) {
      getdata();
    }
  }, []);

  const handle = async (id, isvalid) => {
    try {
      setLoading(true);
      await axios.put(
        `/api/demandes/validate/${id}`,
        { isvalid: isvalid },
        config
      );
      setLoading(false);
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="employe">
        <h1 className="gestion">Gestion Demande</h1>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <div className="container-fluid ">
          <div className="d-flex justify-content-center row">
            <div className="col-lg-12">
              <div className="rounded">
                <Accordion>
                  {data.map((val, key) => {
                    return (
                      <Accordion.Item eventKey={key} key={key}>
                        <Card style={{ margin: 10 }}>
                          <Card.Header style={{ display: "flex" }}>
                            <span className="title">
                              <Accordion.Header>
                                {val.user.nom}
                              </Accordion.Header>
                            </span>
                            <Button
                              variant="success"
                              onClick={() => {
                                handle(val.demande._id, true);
                              }}
                            >
                              Valider
                            </Button>
                            <Button
                              variant="danger"
                              className="mx-2"
                              onClick={() => handle(val.demande._id, false)}
                            >
                              Annuler
                            </Button>
                          </Card.Header>
                          <Accordion.Body>
                            <Card.Body>
                              <div className="table-responsive table-borderless">
                                <table className="table table-striped table-dark">
                                  <thead>
                                    <tr>
                                      <th className="text-center">
                                        <div className="toggle-btn">
                                          <div className="inner-circle"></div>
                                        </div>
                                      </th>
                                      <th>Matricule</th>
                                      <th>Service</th>
                                      <th>Date d'embauche</th>
                                      <th>Catégorie</th>
                                      <th>Situation Familial</th>
                                      <th>Nombre d'enfants</th>
                                      <th>Numéro de Télephone</th>
                                    </tr>
                                  </thead>

                                  <tbody className="table-body">
                                    <tr className="cell-1">
                                      <td className="text-center">
                                        <div className="toggle-btn">
                                          <div className="inner-circle"></div>
                                        </div>
                                      </td>
                                      <td>{val.user.matricule}</td>
                                      <td>{val.user.ser_Id}</td>
                                      <td>{val.user.date_emb}</td>
                                      <td>{val.user.category}</td>
                                      <td>{val.user.stf}</td>
                                      <td>{val.user.nbr_enf}</td>
                                      <td>{val.user.gsm}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="table-responsive table-borderless">
                                <table className="table table-striped table-dark">
                                  <thead>
                                    <tr>
                                      <th className="text-center">
                                        <div className="toggle-btn">
                                          <div className="inner-circle"></div>
                                        </div>
                                      </th>
                                      <th>Centre 1</th>
                                      <th>Session 1</th>
                                      <th>Centre 2</th>
                                      <th>Session 2</th>
                                      <th>Centre 3</th>
                                      <th>Session 3</th>
                                      <th>nombre de place</th>
                                    </tr>
                                  </thead>

                                  <tbody className="table-body">
                                    <tr className="cell-1">
                                      <td className="text-center">
                                        <div className="toggle-btn">
                                          <div className="inner-circle"></div>
                                        </div>
                                      </td>
                                      <td>{val.demande.choixs[0].centre}</td>
                                      <td>
                                        {val.demande.choixs[0].session_id}
                                      </td>
                                      <td>{val.demande.choixs[1].centre}</td>
                                      <td>
                                        {val.demande.choixs[1].session_id}
                                      </td>
                                      <td>{val.demande.choixs[2].centre}</td>
                                      <td>
                                        {val.demande.choixs[2].session_id}
                                      </td>
                                      <td>{val.demande.nbr_plc}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </Card.Body>
                          </Accordion.Body>
                        </Card>
                      </Accordion.Item>
                    );
                  })}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );*/
}
