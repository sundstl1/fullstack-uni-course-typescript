import express = require("express");
import { calculateBmi } from "./bmiCalculator";
import { calculateExcercises } from "./excerciseCalculator";
const app = express();
app.use(express.json());
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi/:height?:weight?", (req, res) => {
  try {
    if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
      throw new Error("Malformatted parameters");
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    res.send({
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight),
    });
  } catch (error: unknown) {
    res.status(400);
    res.send({ error: "malformatted parameters" });
  }
});

app.post("/excercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
      throw new Error("parameters missing");
    }
    if (isNaN(Number(target))) {
      throw new Error("malformatted parameters");
    }
    const typedExcercises: number[] = [];

    // eslint-disable-next-line
    daily_exercises.map((e: any) => {
      if (isNaN(Number(e))) {
        throw new Error("malformatted parameters");
      }
      typedExcercises.push(Number(e));
    });

    const result = calculateExcercises(typedExcercises, Number(target));
    res.send(result);
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400);
    res.send({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
