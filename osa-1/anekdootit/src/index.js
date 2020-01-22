import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({selected, points}) => (
    <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
    </div>
)

const MostVoted = ({points, best}) => (
    <div>
        <h2>Anecdote with the most votes</h2>
        <p>{anecdotes[best]}</p>
        <p>has {points[best]} votes</p>
    </div>
)

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [pointStat, setPoints] = useState([new Array(props.anecdotes.length).fill(0),0])

    const handleNextClick = () => {
        let number = Math.floor(Math.random() * props.anecdotes.length)
        setSelected(number)
    }

    const handleVoteClick = () => {
        const newPointStat = {...pointStat}
        newPointStat[0][selected] += 1

        let max = 0
        for (let i = 0; i < newPointStat[0].length; i++) {
            if (newPointStat[0][i] > max) {
                max = newPointStat[0][i]
                newPointStat[1] = i
            }
        }

        setPoints(newPointStat)
    }

    return (
        <div>
            <Anecdote selected={selected} points={pointStat[0]} />
            <Button handleClick={() => handleVoteClick()} text="Vote" />
            <Button handleClick={() => handleNextClick()} text="Next anecdote" />
            <MostVoted points={pointStat[0]} best={pointStat[1]} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)