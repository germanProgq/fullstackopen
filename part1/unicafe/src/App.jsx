import { useState } from 'react'


const Header = () => <h1>Give Feedback</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Display = ({ goodReviews, badReviews, neutralReviews }) => {
  const totalReviews = goodReviews + badReviews + neutralReviews;
  const averageReview = (goodReviews - badReviews) / totalReviews;
  const positiveReview = totalReviews === 0 ? 0 : (goodReviews/totalReviews) * 100;
  return (
    <div>
      <p>Good: {goodReviews} </p>
      <p>Bad: {badReviews} </p>
      <p>Neutral: {neutralReviews}</p>
      <p>All: {totalReviews} </p>
      <p>Average: {averageReview}</p>
      <p>Positive: {positiveReview} %</p>
    </div>
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

    <Display badReviews={badReviews} goodReviews={goodReviews} neutralReviews={neutralReviews} />
    </>
  )
}

export default App
