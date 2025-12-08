const express = require("express");
const cors = require('cors')
const app = express();
var morgan = require('morgan');

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

morgan.token("body", (req, res) => {
    const body = req.body;
    if (!body) {
        return null;
    }
    return JSON.stringify(body);
});

app.use(morgan(':method :url :status - :response-time ms :body'));

let persons = 
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

const generateId = () => {
    let generatedId;

    do {
        generatedId = String(Math.floor(Math.random() * 1000) + 1);
    } while (persons.some(person => person.id === generatedId));

    return generatedId;
};

app.get('/api/persons', (req, res) => {
    res.json(persons); 
});

app.get('/info', (req, res) => {
    const humanInfoMessage = `Phonebook has info on ${persons.length} people`;
    const currentTime = new Date().toString();

    const response = humanInfoMessage + '\n' + currentTime;
    res.type('text/plain').send(response);
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.filter((person) => person.id === id);
    if (person.length === 0)
    {
        res.status(404).json('Person does not exist');
    }
    else res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter((person) => person.id !== id);
    res.status(204).end();
});

app.put('/api/persons', (req, res) => {
    const personBody = req.body;
    if (!personBody.name || !personBody.number) {
        res.status(422).send({ error: "Name or number must be in the entry" });
        return;
    }
    if (persons.filter((person) => person.name === personBody.name).length > 0 || persons.filter((person) => person.number === personBody.number).length > 0)
    {
        res.status(409).send({ error: "User alredy exists" });
        return;
    }
    const id = generateId();
    const person = {
        "id": id,
        ...personBody
    }
    persons = persons.concat(person);
    res.status(200).send({ message: "Successfully added the person" });

})

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});