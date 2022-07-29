import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HistoryIcon from "@mui/icons-material/History";

export const sidebarData = [
  { title: "Acceuil", icon: <HomeIcon />, link: "/home" },
  { title: "Profile", icon: <PersonIcon />, link: "/profile" },
  {
    title: "Ajouter Demande",
    icon: <AddCircleIcon />,
    link: "/ajouter",
  },
  {
    title: "Gestion Demande",
    icon: <CheckCircleIcon />,
    link: "/gestion",
  },
  { title: "Historique Demande", icon: <HistoryIcon />, link: "/historique" },
];
