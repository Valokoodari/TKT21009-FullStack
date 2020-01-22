import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => <h1>Give feedback</h1>;

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({text, number, unit}) => <tr><td>{text}</td><td>{number} {unit}</td></tr>
const Statistics = ({texts, counts}) => {
    let total = 0
    counts.forEach(count => total += count)

    let average = (counts[0] - counts[2]) / total;
    let goodPercentage = counts[0] / total * 100;

    if (total === 0) {
        return (
            <div>
                <h2>Statistics</h2>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <h2>Statistics</h2>
            <table>
                <tbody>
                    <StatisticLine text={texts[0]} number={counts[0]} />
                    <StatisticLine text={texts[1]} number={counts[1]} />
                    <StatisticLine text={texts[2]} number={counts[2]} />
                    <StatisticLine text="All" number={total} />
                    <StatisticLine text="Average" number={average} />
                    <StatisticLine text="Positive" number={goodPercentage} unit="%" />
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => setGood(good + 1)
    const handleNeutralClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)

    const texts = ["Good", "Neutral", "Bad"]

    return (
        <div>
            <Header />
            <Button handleClick={handleGoodClick} text="Good" />
            <Button handleClick={handleNeutralClick} text="Neutral" />
            <Button handleClick={handleBadClick} text="Bad" />
            <Statistics texts={texts} counts={[good,neutral,bad]}/>
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)