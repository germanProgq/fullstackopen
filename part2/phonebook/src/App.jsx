import { useEffect, useState } from 'react'
import server from './persons'


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

  const DeletePersonButton = ({onDelete, id}) => {
    return <button style={{color: 'blue'}} onClick={() => onDelete(id)}>Delete</button>
  }

  const Persons = ({persons, onDelete}) =>  <div>{persons.map((person) => {return <div style={{display: 'flex'}}><p key={person.id}>{person.name} {person.phone}</p><DeletePersonButton onDelete={onDelete} id={person.id} /></div>})}</div>



const App = () => {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filteredInput, setFilteredInput] = useState('');
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    server.getAll()
    .then(res => {
      setPersons(res)
    })
  }, [])

  const deletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete this person?"))
    {
      server.deletePerson(id).then(() => {
      setPersons(persons.filter(person => person.id !== id));
      });
    }
  }

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
    server.create(newPersonAdd)
    .then(res => {
      setPersons(persons.concat(res));
      setNewName("");
      setNewPhone("");
    });
  }

  // Filtering searches
  const handleSearch = (e) => {
    setFilteredInput(e.target.value);
  }

  const shownPeople = filteredInput === '' 
  ? persons 
  : persons.filter((some) => 
    some.name.toLowerCase().startsWith(filteredInput.toLowerCase()));


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filteredInput} onChange={handleSearch}/>
      <PersonForm 
        onFormSubmit={handlePersonSubmit}
        onNewNameSubmit={newNameInput} 
        newNameValue={newName}
        onNewPhoneSubmit={handlePhoneInput}
        newPhoneValue={newPhone}
      />

      <h2>Numbers</h2>
      <Persons persons={shownPeople} onDelete={deletePerson}/>
    </div>
  )
}

export default App