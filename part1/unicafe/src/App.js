import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
    if (all === 0) { 
      return (
        <div>
          No feedback given
        </div>
      )
    }
  
  const average = ((good) + (neutral * 0) - (bad)) / all
  const positive = good/all * 100
    
return ( 
    <table>
      <tbody>
        <StatisticLine text={'good'} value={good} />
        <StatisticLine text={'neutral'} value={neutral} />
        <StatisticLine text={'bad'} value={bad} />
        <StatisticLine text={'all'} value={all} />
        <StatisticLine text={'average'} value={average} />
        <StatisticLine text={'positive'} value={positive} extra={'%'}/>
      </tbody>
    </table>
  )
}

// display single statistic
const StatisticLine = ({text, value, extra}) => {
  return(
    <tr>
      <td>{text} &ensp;</td> 
      <td>{value} {extra}</td>
    </tr>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // save clicks of each button to its own state
  const g = () => setGood(good + 1)
  const n = () => setNeutral(neutral + 1)
  const b = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={g} text='good' />
      <Button onClick={n} text='neutral' />
      <Button onClick={b} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App