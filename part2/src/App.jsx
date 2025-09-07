import Course from "./components/Course"
// const Header = (props) => {
//   return <h1>{props.course.name}</h1>;
// };

// const Content = (props) => {
//   return (
//     <div>
//       <Part part={props.course.parts[0]} />
//       <Part part={props.course.parts[1]} />
//       <Part part={props.course.parts[2]} />
//     </div>
//   );
// };

// const Part = (props) => {
//   return (
//     <p>
//       {props.part.name} {props.part.exercises}
//     </p>
//   )
// }
// const Total = (props) => {
//   const sum = props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises;
//   return <p>Number of exercises {sum} </p>;
// };

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <>
    {courses.map((c, idx) => (
      <Course key={idx} course={c} />
    ))}
    </>
  )
}

export default App
