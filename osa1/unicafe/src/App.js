import React, { useState } from 'react'

const Button = ({painallus, teksti}) => {
  return (
  <button onClick={painallus}>{teksti}</button>
  )
}
const StaticticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statictics = ({good, bad, neutral}) => {
  const voteCount = (good + bad + neutral)
  const avg  =  (good - bad) / voteCount
 const posVotes = good  * 100 / voteCount

  if (voteCount === 0)  {
    return (
    <p>No feedback given</p>
    ) }

  return (
    <div>
    <table>
      <tbody>
        <StaticticsLine text="good" value={good} />
        <StaticticsLine text="neutral" value={neutral} />
        <StaticticsLine text="bad" value={bad} />
        <StaticticsLine text="total" value={voteCount} />
        <StaticticsLine text="avg" value={avg} />
        <StaticticsLine text="positives" value={posVotes + " %" } />

      </tbody>
    </table>
  </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>Give feedback</h1>
      <Button painallus={() => setGood(good +1 )} teksti="good" />
      <Button painallus={() => setNeutral(neutral +1 )} teksti="neutral" />
      <Button painallus={() => setBad(bad +1 )} teksti="neutral" />
      
      <h1>stats</h1>
      <Statictics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App