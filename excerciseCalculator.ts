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

interface excerciseData {
  trainingHistory: number[];
  target: number;
}

const getNumber = (n: string): number => {
  if (!isNaN(Number(n))) {
    return Number(n);
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const parseExcerciseArgument = (args: Array<string>): excerciseData => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const excerciseDays = [];
  for (let i = 3; i < args.length; i++) {
    excerciseDays.push(getNumber(args[i]));
  }
  return {
    trainingHistory: excerciseDays,
    target: getNumber(args[2]),
  };
};

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

const calculateExcercises = (
  excerciseHours: number[],
  target: number
): excerciseStats => {
  const average =
    excerciseHours.reduce((a, b) => a + b, 0) / excerciseHours.length;
  const success = average > target;
  const ratings = rateExcercising(average, target);
  return {
    periodLength: excerciseHours.length,
    trainingDays: excerciseHours.filter((h) => h > 0).length,
    ...ratings,
    target: target,
    average: average,
  };
};
try {
  const { trainingHistory, target } = parseExcerciseArgument(process.argv);
  console.log(calculateExcercises(trainingHistory, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
  console.log(
    "please write first the daily target and then daily excercise time separated by spaces"
  );
  console.log("example:");
  console.log("npm run excerciseCalculator 2 1 0 2 4.5 0 3 1 0 4");
}
