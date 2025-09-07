import { useState } from 'react'

const Person = (props) => {
  return (
    <>
      <p>{props.name} {props.phoneNumber}</p>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', contact: '040-1234567' },
  ]) 
  const [newContactName, setNewContact] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  const addContact = (event) => {
    event.preventDefault();
    if (!newContactName || !newContactPhone || newContactName.trim() === '') {
      alert("Please fill in both inputs");
      return false;
    }
    if (persons.some(person => person.name === newContactName || persons.some(person => person.contact === newContactPhone))) {
      alert(newContactName + 'or' + newContactPhone + ' is already in the phonebook');
      setNewContact("");
      setNewContactPhone("");
      return false;
    }
    const newPersons = persons.concat({name: newContactName, contact: newContactPhone});
    setPersons(newPersons);
    setNewContact("");
    setNewContactPhone("");

  }

  const handleInputContactAdd = (event) => {
    setNewContact(event.target.value);
  }
  const handleInputContactPhoneAdd = (event) => {
    setNewContactPhone(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newContactName} onChange={handleInputContactAdd}/>
          contact: <input type='number' value={newContactPhone} onChange={handleInputContactPhoneAdd}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <>
        {persons.map((pers, idx) => {
          return <Person key={idx} name={pers.name} phoneNumber={pers.contact} />
        })}
      </>

    </div>
  )
}

export default App