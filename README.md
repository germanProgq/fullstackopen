# fullstackopen

My exercise solutions for the [Full Stack Open](https://fullstackopen.com/) course from the University of Helsinki. This is coursework, so each part is a set of practice exercises rather than one finished product.

## Parts

| Part | Topic | Contents |
| --- | --- | --- |
| part0 | Fundamentals of web apps | Diagram notes (`.txt` files) |
| part1 | Introduction to React | `courseinfo`, `unicafe`, `anecdotes` |
| part2 | Communicating with a server | `courseinfo`, `phonebook`, `countries` |
| part3 | Node.js and Express backend | `phonebook_backend` |
| part4 | Testing the backend | `blog_post` |

The React exercises use Vite. The backend exercises use Express with MongoDB through Mongoose.

## Running an exercise

Each exercise folder is its own small project. Change into one, install, and run it.

Frontend (Vite) exercises:

```sh
cd part1/courseinfo
npm install
npm run dev
```

Backend exercises (need a MongoDB connection string in a `.env` file):

```sh
cd part3/phonebook_backend
npm install
npm start
```

## Notes

- Not every folder has a `package.json`. `part0` is written notes only.
- The backends expect their own environment variables (for example a MongoDB URI), so check each folder before running.
