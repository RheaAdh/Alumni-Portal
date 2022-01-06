const express = require("express");
require("dotenv").config();
const path = require("path");
const connectDB = require("./config/db");
var cors = require("cors");
const app = express();
app.use(cors());
const AuthUser = require("./routes/auth/index");
const Users = require("./routes/users");
const Admin = require("./routes/admin");
const Event = require("./routes/event");

connectDB();

app.use(express.json({ extended: false }));

// Routes
app.use("/api/auth", AuthUser);
app.use("/api/users", Users);
app.use("/api/admin", Admin);
app.use("/api/event", Event);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
