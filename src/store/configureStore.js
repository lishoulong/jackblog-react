import { createStore,compose,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'
import promiseMiddleware from '../api/promiseMiddleware'
import rootReducer from '../reducers'

export default function configureStore(initialState, history) {
  let middleware = [ thunkMiddleware, promiseMiddleware, routerMiddleware(history) ]
  let finalCreateStore
  if (__DEVCLIENT__) {
    if(__DEVLOGGER__){
      middleware.push(createLogger())
    }
    finalCreateStore = compose(
      applyMiddleware(...middleware)
    )
  } else {
    finalCreateStore = compose(applyMiddleware(...middleware))
  }

  const store = finalCreateStore(createStore)(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }
  return store
}
