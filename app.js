const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World'))
app.put('/votes', (req, res) => res.json(req.body))
app.put('/solutions', (req, res) => res.json(req.body))

app.listen(3000, () => console.log('Running on port 3000'))
