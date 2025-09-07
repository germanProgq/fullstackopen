import React from "react";

const Header = ({ name }) => <h1>{name}</h1>
const Description = ({ text, exercises }) => <p>{text} {exercises}</p>
const Sum = ({ parts }) => {
    let sum = 0;
    parts.forEach(part => {
        sum += part.exercises;        
    });
    return <p style={{fontWeight: 'bold'}}>Total is {sum}</p>
}

const Course = ({ course }) => {
    return(
        <>
            <Header name={course.name} />
            <div>
                {course.parts.map(part => 
                <Description key={part.id} text={part.name} exercises={part.exercises} />
                )}
            </div>
            <Sum parts={course.parts}/>
        </>
    )
}

export default Course