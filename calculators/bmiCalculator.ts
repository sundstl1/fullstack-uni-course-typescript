export const calculateBmi = (height: number, weight: number): string => {
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  if (bmi <= 18.5) {
    return "Underweight";
  } else if (bmi <= 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi <= 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
};
