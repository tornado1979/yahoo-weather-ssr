/* eslint-disable sort-keys */
import Weather, { loadData } from './components/Weather'

export default [
  {
    loadData,
    path: '/',
    component: Weather,
    exact: true,
  },
]
