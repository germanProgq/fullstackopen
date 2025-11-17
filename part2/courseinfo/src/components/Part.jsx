const Part = ({singleCourse}) => {
  const name = singleCourse.name;
  const exercises = singleCourse.exercises;
  return (
    <>
      <p>{name} {exercises}</p>
    </>
  )
}

export default Part;