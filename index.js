import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import adminRouter from "./routes/adminRouter.js";
import employeeRouter from "./routes/employeeRouter.js";

const app = express();
mongoose.connect("mongodb://localhost:27017/fullstack_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database Connected..."));

app.use(cors());
app.use(express.json());
// app.use(UserRoute);

app.use("/admin", adminRouter);
app.use("/employee", employeeRouter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set EJS as templating engine
app.set("view engine", "ejs");

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
