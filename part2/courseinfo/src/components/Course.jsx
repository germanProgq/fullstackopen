import Header from "./Header";
import Part from "./Part";
import TotalExercises from "./TotalExercises";

const Course = ({course}) => {
  return (
    <>
      <Header courseName={course.name}/>
      {course.parts.map((part, id) => <Part singleCourse={part} key={part.id} />)}
      <TotalExercises parts={course.parts}/>
    </>
  )
}

export default Course