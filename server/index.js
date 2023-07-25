/* IMPORT REQUIRED MODULES */
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.js");
const appRoutes = require("./routes/app.js");
const bodyParser = require("body-parser");

/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/app", appRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewURlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
