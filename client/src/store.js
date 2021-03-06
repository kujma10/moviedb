import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers/index'
import moviesMiddleware from './middlewares/MoviesMiddleware'
import loginMiddleware from './middlewares/LoginMiddleware'
import movieMiddleware from './middlewares/MovieMiddleware'
import categoriesMiddleware from './middlewares/CategoriesMiddleware'
import Api from './Api'

export const history = createHistory()

const api = new Api()

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history),
  moviesMiddleware(api),
  loginMiddleware(api),
  movieMiddleware(api),
  categoriesMiddleware(api)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store
