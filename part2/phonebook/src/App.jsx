import { useState } from 'react'


  // Filtered input
  const Filter = ({value, onChange}) => <input placeholder='search...' value={value} onChange={onChange}/>

  const PersonForm = ({onFormSubmit, onNewNameSubmit, newNameValue, onNewPhoneSubmit, newPhoneValue}) => {
    return (
      <>
        <form onSubmit={onFormSubmit}>
          <ul>
            <li>name: <input onChange={onNewNameSubmit} value={newNameValue}/> </li>
            <li>phone: <input onChange={onNewPhoneSubmit} value={newPhoneValue}/> </li>
          </ul>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </>
    )
  }

  const Persons = ({persons}) =>  <div>{persons.map((person, id) => {return <p key={person.id}>{person.name} {person.phone}</p>})}</div>



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filteredInput, setFilteredInput] = useState('');
  const [showFiltered, setShowFiltered] = useState(persons)

    // Regarding names
  const newNameInput = (e) => {
    setNewName(e.target.value);
  }
  // Regarding phone nums
  const handlePhoneInput = (e) => {
    e.preventDefault()
    setNewPhone(e.target.value);
  }

  // Submit form to create new Person
  const handlePersonSubmit = (e) => {
    e.preventDefault();
    const newPersonAdd = {name: newName, phone: newPhone}

    if (persons.filter(persons => persons.name === newName).length > 0 || persons.filter(persons => persons.phone === newPhone).length > 0)
    {
      alert(`Name ${newName} or phone number ${newPhone} alr exists in the list`);
      return;
    }
    
    setPersons(persons.concat(newPersonAdd));
    setNewName("");
    setNewPhone("");
  }

  // Filtering searches
  const handleSearch = (e) => {
    setFilteredInput(e.target.value);
    // if (e.target.value === '') {
    //   setShowFiltered(persons)
    //   return;
    // }

    // Use target value here because react updates are async and this would otherwise lag behind
    const filtered = persons.filter(person => person.name.toLowerCase().startsWith(e.target.value.toLowerCase()))
    setShowFiltered(filtered)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filteredInput} onChange={handleSearch}/>
      <PersonForm 
        onFormSubmit={handlePersonSubmit}
        onNewNameSubmit={newNameInput} 
        newNameValue={newName}
        onNewPhoneSubmit={setNewPhone}
        newPhoneValue={newPhone}
      />

      <h2>Numbers</h2>
      <Persons persons={showFiltered}/>
    </div>
  )
}

export default App