const calculateBmi = (height: number, weight: number): string => {
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  if (bmi <= 18.5) {
    return "Underweight (unhealthy weight)";
  } else if (bmi <= 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi <= 29.9) {
    return "Overweight (unhealthy weight)";
  } else {
    return "Obese (unhealthy weight)";
  }
};
console.log("Running calculator with parameters 180cm and 74kg");
console.log(calculateBmi(180, 74));
console.log("Running calculator with parameters 150cm and 74kg");
console.log(calculateBmi(150, 74));
console.log("Running calculator with parameters 200cm and 74kg");
console.log(calculateBmi(200, 74));
console.log("Running calculator with parameters 16cm and 70kg");
console.log(calculateBmi(160, 70));
