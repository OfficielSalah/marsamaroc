import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import "./Historique.css";

export default function Historique() {
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
    }
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    getdata();
  }, []);

  const getdata = () => {
    setLoading(true);
    axios.get("/api/demandes/", config).then((response) => {
      setData(response.data.data);
      setLoading(false);
    });
  };
  return (
    <div className="home">
      <Sidebar login={user.login} />
      <div className="historique">
        <h1 className="history">Historique</h1>
        <div className="container-fluid mt-5">
          <div className="d-flex justify-content-center row">
            <div className="col-lg-12">
              <div className="rounded">
                <div className="table-responsive">
                  <table className="table table-striped table-dark">
                    <thead>
                      <tr>
                        <th className="text-center">
                          <div className="toggle-btn">
                            <div className="inner-circle"></div>
                          </div>
                        </th>
                        <th>Centre Vacance 1</th>
                        <th>Session 1</th>
                        <th>Centre Vacance 2</th>
                        <th>Session 2</th>
                        <th>Centre Vacance 3</th>
                        <th>Session 3</th>
                        <th>nombre de place</th>
                        <th>date</th>
                      </tr>
                    </thead>
                    {data?.map((val, key) => {
                      return (
                        <tbody className="table-body" key={key}>
                          <tr className="cell-1">
                            <td className="text-center">
                              <div className="toggle-btn">
                                <div className="inner-circle"></div>
                              </div>
                            </td>
                            <td>{val.choixs[0].centre}</td>
                            <td>{val.choixs[0].session}</td>
                            <td>{val.choixs[1].centre}</td>
                            <td>{val.choixs[1].session}</td>
                            <td>{val.choixs[2].centre}</td>
                            <td>{val.choixs[2].session}</td>
                            <td>{val.nbr_plc}</td>
                            <td>{val.date}</td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                  {loading && <Loading />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
