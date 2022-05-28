import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'

const app = express()

app.use(bodyParser.json(), routes)

app.listen(3333, () => {
  console.log('Servindo')
})
