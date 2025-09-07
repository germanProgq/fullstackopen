const Header = ({ name }) => <h1>{name}</h1>
const Description = ({ text, exercises }) => <p>{text} {exercises}</p>
const Sum = ({ parts }) => {
    const sum = parts.reduce((total, part) => total + part.exercises, 0);
    return <p style={{ fontWeight: 'bold' }}>Total is {sum}</p>
}

const Course = ({ course }) => {
    return(
        <>
            <Header name={course.name} />
            <>
                {course.parts.map(part => 
                <Description key={part.id} text={part.name} exercises={part.exercises} />
                )}
            </>
            <Sum parts={course.parts}/>
        </>
    )
}

export default Course