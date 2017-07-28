import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { articleData } from './article'

const rootReducer = combineReducers({
  articleData,
  routing: routerReducer,
  form: formReducer
})

export default rootReducer
