import 'babel-polyfill'
import express from 'express'
import { matchRoutes } from 'react-router-config'
import renderer from './helpers/renderer'
import createStore from './helpers/createStore'
import Routes from './client/Routes'

const app = express()

app.use(express.static('public'))

app.get('*', (req, res) => {
  const store = createStore()
  // Initialize and load data into the store
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null
  })

  Promise.all(promises).then(() => {
    const context = {}
    const content = renderer(req, store, context)

    return res.send(content)
  })
})

app.listen(3000, () => {
  console.log('Linstening on 3000 PORT') // eslint-disable-line
})
