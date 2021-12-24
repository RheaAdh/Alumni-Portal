const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const app = express();

const AuthUser = require("./routes/auth/index");
const Home = require("./routes/home/index");
const Users = require("./routes/users/index");
const Convo = require("./routes/convo/index");
const Admin = require("./routes/admin/index");

dotenv.config({ path: "./.env" });

connectDB();

app.use(express.json({ extended: false }));

// Routes
app.use("/api/auth", AuthUser);
app.use("/api/home", Home);
app.use("/api/users", Users);
app.use("/api/convo", Convo);
app.use("/api/admin", Admin);

const PORT1 = process.env.PORT1 || 5000;

app.listen(PORT1, () => console.log(`Server started on port ${PORT1}.`));
