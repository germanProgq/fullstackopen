import { useEffect } from 'react'
import { useState } from 'react'

const Person = (props) => {
  return (
    <>
      <p>{props.name}</p>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ]) 
  const [newContact, setNewContact] = useState('');

  const addContact = (event) => {
    event.preventDefault();
    const newPersons = persons.concat({name: newContact});
    setPersons(newPersons);
    setNewContact("");

  }

  const handleInputContactAdd = (event) => {
    setNewContact(event.target.value);
  }
  useEffect(() => {

  }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newContact} onChange={handleInputContactAdd}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <>
        {persons.map((pers, idx) => {
          return <Person key={idx} name={pers.name} />
        })}
      </>

    </div>
  )
}

export default App