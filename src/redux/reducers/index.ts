import { combineReducers } from 'redux'
import accountsReducer from './accounts.reducer'
import alertReducer from './alert.reducer'
import authReducer from './auth.reducer'
import newsReducer from './news.reducer'
import nftReducer from './nft.reducer'
import ordersReducer from './orders.reducers'
import plansReducer from './plans.reducer'
import usersReducer from './users.reducer'
import verificationReducer from './verification.reducer'
import walletReducer from './wallet.reducer'

const reducers = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  orders: ordersReducer,
  users: usersReducer,
  verification: verificationReducer,
  plans: plansReducer,
  accounts: accountsReducer,
  wallets: walletReducer,
  news: newsReducer,
  nfts: nftReducer,
})

export type RootState = ReturnType<typeof reducers>

export default reducers
