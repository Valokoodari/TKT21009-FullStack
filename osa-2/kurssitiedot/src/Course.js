import React from 'react'

const Header = ({course}) => <h1>{course}</h1>;

const Part = ({part}) => <p>{part.name} {part.exercises}</p>;
const Content = ({parts}) => (
    <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
)

const Total = ({parts}) => (
    <b>Number of exercises: {parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises
        , 0)}
    </b>
)

const Course = ({courseData}) => (
    <div>
        <Header course={courseData.name} />
        <Content parts={courseData.parts} />
        <Total parts={courseData.parts} />
    </div>
)

export default Course