const TotalExercises = ({parts}) => {
  // Array mechanics => the first one is accumulator (number) that passes the value it returns throughout the whole array, the second value is the value we are using (course parts in this case)
  const sum = parts.reduce((total, currentValue) => total + currentValue.exercises, 0);
  return (
    <>
      <p>The total number of exercises is: {sum}</p>
    </>
  )
}

export default TotalExercises;