const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: 'edbbfaa4f43843809e0a09921d9c4201',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const students = []
const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served succesfully')
})

app.post('/api/student', (req, res) => {
    let {name} = req.body
    name = name.trim()

    students.push(name)
    rollbar.log('Studnt added succesfully', {author: 'Scott', type: 'manual entry'})
    res.status(200).send(students)
})

const port = process.env.PORT || 4545

app.use(rollbar.errorHandler())

app.listen(port, () => {
    console.log('Server up on 4545')
})