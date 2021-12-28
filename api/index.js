const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const app = express();

const AuthUser = require("./routes/auth/index");
const Users = require("./routes/users");
const Admin = require("./routes/admin");
const Event = require("./routes/event");

dotenv.config({ path: "./.env" });

connectDB();

app.use(express.json({ extended: false }));

// Routes
app.use("/api/auth", AuthUser);
app.use("/api/users", Users);
app.use("/api/admin", Admin);
app.use("/api/event", Event);

const PORT1 = process.env.PORT1 || 5000;

app.listen(PORT1, () => console.log(`Server started on port ${PORT1}.`));
