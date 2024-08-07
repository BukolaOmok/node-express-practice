const express = require("express");
const app = express();

app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },

  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },

  {
    id: 3,
    content: "GET and POST are the most important methods of the HTTP protocol",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end({ message: "Deletion Successful!" });
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/notes", (req, res) => {
  const body = req.body;
  if (!body.content) {
    res.status(400).json({ error: "content missing" });
    return 
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = notes.concat(note);
  res.json(note);
});

// const app = http.createServer((req, res) => {
//     res.writeHead(200, {"Content-Type": "application/json"})
//     res.end(JSON.stringify(notes))
// })

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// console.log("hello world")
