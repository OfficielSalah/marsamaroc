import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  let userInfo = localStorage.getItem("userInfo");
  return userInfo && userInfo.isverified ? children : <Navigate to="/login" />;
}
