import { stringify } from "querystring";

const App = () => {
  const courseName = "Half Stack application development";
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CourseNormalPart extends CourseDescriptionPart {
    type: "normal";
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CourseDescriptionPart {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseDescriptionPart extends CoursePartBase {
    description: string;
  }

  interface CourseRequirementsPart extends CourseDescriptionPart {
    requirements: string[];
    type: "special";
  }

  type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CourseRequirementsPart;

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
    },
  ];

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const Part = ({ part }: { part: CoursePart }) => {
    const heading = (
      <b>
        {part.name} {part.exerciseCount}
      </b>
    );
    switch (part.type) {
      case "normal":
        return (
          <p>
            {heading}
            <br />
            <i>{part.description}</i>
          </p>
        );
      case "groupProject":
        return (
          <p>
            {heading}
            <br />
            project exercises {part.exerciseCount}
          </p>
        );
      case "submission":
        return (
          <p>
            {heading}
            <br />
            <i>{part.description}</i>
            <br />
            submit to {part.exerciseSubmissionLink}
          </p>
        );
      case "special":
        return (
          <p>
            {heading}
            <br />
            <i>{part.description}</i>
            <br />
            required skils: {part.requirements.join(", ")}
          </p>
        );
      default:
        return assertNever(part);
    }
  };

  const Header = ({ name }: { name: string }) => {
    return <h1>{name}</h1>;
  };

  const Content = ({ parts }: { parts: CoursePart[] }) => {
    return (
      <>
        {parts.map((part) => (
          <Part key={part.name} part={part} />
        ))}
      </>
    );
  };

  const Total = ({ parts }: { parts: CoursePart[] }) => {
    return (
      <p>
        Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    );
  };

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
