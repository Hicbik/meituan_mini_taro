import { applyMiddleware,createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

const middlewares = [
  thunkMiddleware,
  createLogger()
]

export default function configStore () {
  return createStore(rootReducer,applyMiddleware(...middlewares))
}
