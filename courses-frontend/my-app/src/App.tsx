import { stringify } from "querystring";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const Header = ({ name }: { name: string }) => {
    return <h1>{name}</h1>;
  };

  interface CoursePart {
    name: string;
    exerciseCount: number;
  }

  const courseData: Array<CoursePart> = courseParts.map((obj) => {
    const object: CoursePart = {
      name: obj.name,
      exerciseCount: obj.exerciseCount,
    };
    return object;
  });

  const Content = ({ parts }: { parts: CoursePart[] }) => {
    return (
      <>
        {parts.map((part) => (
          <p key={part.name}>
            {part.name} {part.exerciseCount}
          </p>
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
      <Content parts={courseData} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
