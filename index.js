import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 3000

mongoose.connect( // Connect to mongodb
    `mongodb://localhost:27017/label_pic_database`,
    //`mongodb://mongo:27017/label_pic_database`,
    { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false }
  )

app.disable('x-powered-by')

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))