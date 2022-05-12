import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initalState = {}

const middleware = [thunk]

const persistConfig = {
  key: 'pipsig_fx_admin',
  storage,
  blacklist: ['auth', 'alert', 'wallets'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
  persistedReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

const persistor = persistStore(store)

export { store, persistor }
