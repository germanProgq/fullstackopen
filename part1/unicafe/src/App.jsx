import { useState } from 'react'


const Header = () => <h1>Give Feedback</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticsLine = ({ value, text }) => <tr><th>{text}</th><td>{value}</td></tr>

const Statistics = ({ goodReviews, badReviews, neutralReviews }) => {
  const totalReviews = goodReviews + badReviews + neutralReviews;

  if (totalReviews === 0) {
    return <><h1>Statistics</h1><p>No feedback given</p></>
  }
  
  const averageReview = goodReviews - badReviews / totalReviews;
  const positiveReview = (goodReviews/totalReviews * 100).toString() + ' %';
  return (
    <>
    <h1>Statistics</h1>
    <table>
      <tbody>
      <StatisticsLine value={goodReviews} text={'Good: '} />
      <StatisticsLine value={badReviews} text={'Bad: '} />
      <StatisticsLine value={neutralReviews} text={'Neutral: '} />
      <StatisticsLine value={averageReview} text={'Average: '} />
      <StatisticsLine value={totalReviews} text={'Total: '} />
      <StatisticsLine value={positiveReview} text={'Positive: '} />
      </tbody>
    </table>
    </>
  )

}


function App() {
  const [goodReviews, setGoodReview] = useState(0);
  const [badReviews, setBadReview] = useState(0);
  const [neutralReviews, setNeutralReview] = useState(0);

  const leaveReview = (type) => {
    if (type == 'good') {
      setGoodReview(goodReviews+1);
    }
    else if (type == 'bad') {
      setBadReview(badReviews+1);
    }
    else if (type == 'neutral') {
      setNeutralReview(neutralReviews+1)
    }
  }

  

  return (
    <>
    <Header />
    <Button onClick={() => leaveReview('good')}
    text={"good"} />
    <Button onClick={() => leaveReview('bad')}
    text={"bad"} />
    <Button onClick={() => leaveReview('neutral')}
    text={"neutral"} />

    <Statistics badReviews={badReviews} goodReviews={goodReviews} neutralReviews={neutralReviews} />
    </>
  )
}

export default App
