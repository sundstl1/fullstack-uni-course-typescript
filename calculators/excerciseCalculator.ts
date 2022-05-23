interface ratingDescription {
  ratingDescription:
    | "a poor effort"
    | "not too bad but could be better"
    | "very well done!";
}

interface rating {
  success: boolean;
  ratingDescription: ratingDescription;
  rating: number;
}

interface excerciseStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: ratingDescription;
  target: number;
  average: number;
}

const rateExcercising = (average: number, target: number): rating => {
  if (average - target > 0) {
    return {
      success: true,
      rating: 3,
      ratingDescription: "very well done!" as unknown as ratingDescription,
    };
  } else if (average - target > -0.5) {
    return {
      success: false,
      rating: 2,
      ratingDescription:
        "not too bad but could be better" as unknown as ratingDescription,
    };
  } else {
    return {
      success: false,
      rating: 1,
      ratingDescription: "a poor effort" as unknown as ratingDescription,
    };
  }
};

export const calculateExcercises = (
  excerciseHours: number[],
  target: number
): excerciseStats => {
  const average =
    excerciseHours.reduce((a, b) => a + b, 0) / excerciseHours.length;
  const ratings = rateExcercising(average, target);
  return {
    periodLength: excerciseHours.length,
    trainingDays: excerciseHours.filter((h) => h > 0).length,
    ...ratings,
    target: target,
    average: average,
  };
};
