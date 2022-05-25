import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnosisRouter";
import patientsRouter from "./routes/patientsRouter";

const app = express();

const allowedOrigins = ["http://localhost:3000", "https://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnosis", diagnosisRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
