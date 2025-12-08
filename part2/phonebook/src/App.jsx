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
  const Persons = ({persons, onDelete}) =>  <div>{persons.map((person) => {return <div style={{display: 'flex'}} key={person.id} ><p>{person.name} {person.number}</p><DeletePersonButton onDelete={onDelete} id={person.id} /></div>})}</div>

  const Message = ({successMessage, errorMessage}) => {
    const messageClass = successMessage ? 'success' : 'error';
    const message = successMessage || errorMessage;
    
    return (
      <div className={messageClass}>{message}</div>
    );
  }



const App = () => {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filteredInput, setFilteredInput] = useState('');
  const [persons, setPersons] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
      setSuccessMessage("Successfully deleted");
      setTimeout(() => {
        setSuccessMessage(null);        
      }, 3000);
      setPersons(persons.filter(person => person.id !== id));
      })
      .catch((e) => {
        if (e.status === 404) {
          setErrorMessage(`Information about the user had already been deleted`);
        }
        else {
          setErrorMessage("Failed to delete person");
        }
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000)
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
    if (newName.trim() === "" || newPhone.trim() === "") {
      alert("Name or phone number cannot be empty");
      return;
    }
    const newPersonAdd = {name: newName, number: newPhone};


    if (persons.filter(person => person.name === newName).length > 0)
    {
      if (!persons.filter(person => person.number === newPhone).length > 0) {
        if (window.confirm(`${newName} exists in the codebase. Replace the phone?`)) {
          const personId = (persons.filter(persons => persons.name === newName))[0].id;
          newPersonAdd.id = personId;
          console.log(personId);    
          server.update(personId, newPersonAdd);
          setPersons(persons.map(person => person.id !== personId ? person : newPersonAdd));
          setNewName("");
          setNewPhone("");   
          return;       
        }
      }
      else {
        alert("User already exists in the database")
      }
      
      return;
    }
    server.create(newPersonAdd)
    .then(res => {
      console.log(res);
      if (res.error) {
        setErrorMessage(res.error);
        setTimeout(() => {
          setErrorMessage("");          
        }, 2000);
        return;
      }
      setPersons(persons.concat(newPersonAdd));
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
      <Message successMessage={successMessage} errorMessage={errorMessage} />
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