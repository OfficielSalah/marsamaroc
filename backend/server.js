const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const demandeRoutes = require("./routes/demandeRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

const app = express();

require("dotenv").config();
require("./config/db");

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/demandes", demandeRoutes);
app.use("/api/services", serviceRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3500;

app.listen(PORT, console.log(` app listening on port ${PORT}!`));
