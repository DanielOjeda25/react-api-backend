//importar el modulo de express
const express = require('express')
const logger = require('./loggerMiddleware')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

let notes = [
  {
    id: 1,
    content: 'This is the first note',
    date: new Date(),
    important: true
  },
  {
    id: 2,
    content: 'This is the second note',
    date: new Date(),
    important: false
  },
  {
    id: 3,
    content: 'This is the third note',
    date: new Date(),
    important: true
  }
]


const http = require('http')

//si estamos en la raiz automaticamente nos devuelve un mensaje
app.get('/', (req, res) => {
  res.send('<h1>Hello World first API</h1>')
})

//si estamos en este path, nos devolvera un json de las notas
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

//esta ruta nos devolvera un id en concreto
app.get('/api/notes/:id', (req, res) => {
  //recureperamos el id
  const id = req.params.id
  //buscamos entre el array de notas si el id, es igual al id de las notas en el path
  const note = notes.find(note => note.id === Number(id))

  if (note) {
    //si se cumple devolvemos el json
    res.json(note)
  } else {
    //si no se cumple devolvemos un mensaje de error
    res.status(404).send('Not found')
  }

})

//en esta ruta eliminaremos un nota
app.delete('/api/notes/:id', (req, res) => {
  //recureperamos el id
  const id = req.params.id
  //buscamos entre el array de notas si el id, es igual al id de las notas en el path
  const note = notes.find(note => note.id === Number(id))

  if (note) {
    //si se cumple eliminamos el nota
    notes = notes.filter(note => note.id !== Number(id))
    res.json(note)
  } else {
    //si no se cumple devolvemos un mensaje de status
    res.status(204).end()
  }

})

//esta funcion hara un POST a la ruta /api/notes
app.post('/api/notes', (req, res) => {
  const note = req.body

  //validaremos que encuentre el "content"
  if (!note || !note.content) {
    return res.status(400).json({ error: 'content is required or missing' })
  }
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== 'undefined' ? note.important : false
  }
  notes = [...notes, newNote]
  res.json(newNote)
})



//si el usuario escribe una ruta que no existe, nos devuelve un mensaje de error
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})

