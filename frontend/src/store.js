/**
 * Reducer is a function: create new state
 *
 * Reducer accept 'Action' and current state as parameters, and return a new state.
 *
 * To Summarize: Store receive an Action => return a new State => View changes.
 * In this procedure, the calculation of the new state is called reducer.
 *
 * From "Submit" => View changes
 * User submit === active Action
 * Action will take "type" and form data to reducer
 * reducer will calculdate and update data, return the newest state
 * View changes
 *
 */

//redux setup
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
//reducer: A function, return several reducers
//const store = createStore('reducer', 'initialState', 'middileware')

const initialState = {}

const middleware = [thunk]
const { composeWithDevTools } = require('redux-devtools-extension')

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
