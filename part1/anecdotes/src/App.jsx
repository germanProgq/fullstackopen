import { useEffect, useState } from 'react'

const Joke = ({joke, title}) => <div><h1>{title}</h1><p>{joke}</p></div>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const len = anecdotes.length;
  const [selected, setSelected] = useState(0);
  const [highestVoted, setHighestVoted] = useState(null);
  const [votes, setVotes] = useState(() => Array(len).fill(0));


  const selectRandomJoke = () => {
    const randomInt = () => Math.floor(Math.random() * len);
    let chosen = randomInt();
    while (chosen === selected) {
      chosen = randomInt();
    }
    setSelected(chosen);
  }

  const voteForJoke = () => {
    setVotes(prev => {
      const next = [...prev];
      next[selected] += 1;
      let maxVotes = next[0];
      let maxVotesIndex = 0;
      next.forEach((count, idx) => {
        if (count > maxVotes) {
          maxVotes = count;
          maxVotesIndex = idx;
        }
      });
      setHighestVoted(maxVotesIndex);

      return next;
    });
  }

  useEffect(() => {
    selectRandomJoke();
  }, [])

  return (
    <div>
      <Joke joke={anecdotes[selected]} title="Anecdote of the day" />
      <p>Has {votes[selected] === 0 ? 'no' : votes[selected]} votes</p>
      <div>
        <Button onClick={() => selectRandomJoke()} text={'next anecdote'} />
        <Button onClick={voteForJoke} text={'vote'} />
      </div>
      {highestVoted !== null && (
        <>
          <Joke joke={anecdotes[highestVoted]} title={'Highest voted Anecdote'} />
          <p>Has {votes[highestVoted]} votes</p>
        </>
      )}
    </div>
  )
}

export default App
