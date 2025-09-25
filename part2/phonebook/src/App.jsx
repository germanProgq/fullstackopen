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
  const [filterKeyword, setFilter] = useState('');
  const [filteredContacrs, setFilteredContacts] = useState([])

  //Contact
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

  //Filter
  const handleFilterInput = (event) => {
    setFilter(event.target.value);
    filterPhonebook();
  }
  const filterPhonebook = () => {
    const filtered = persons.some(person => {
      if (person.name.toLowerCase().includes(filterKeyword.toLowerCase()) || person.contact.includes(filterKeyword)) {
        if (!filteredContacrs.some(p => p.name === person.name && p.contact === person.contact)) {
          setFilteredContacts(prev => [...prev, person]);
        }
      }
      return false;
    });
    console.log(filteredContacrs)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      <h1>Filter</h1>
      <input type='text' placeholder='filter...' onChange={handleFilterInput} value={filterKeyword}></input>
      </div>
      <form onSubmit={addContact}>
        <h1>Add a new</h1>
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