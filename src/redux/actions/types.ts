import { AlertVariant } from '../reducers/alert.reducer'

export enum ActionTypes {
  auth = 'AUTH',
  authError = 'AUTH_ERROR',
  authLoading = 'AUTH_LOADING',
  logout = 'LOGOUT',
  profile = 'PROFILE',
  alert = 'ALERT',
  getWallet = 'GET_WALLET',
  createWallet = 'CREATE_WALLET',
  updateProfile = 'UPDATE_PROFILE',
  updatePassword = 'UPDATE_PASSWORD',
  getAccounts = 'GET_ACCOUNTS',
  deleteAccount = 'DELETE_ACCOUNT',
  updateWallet = 'UPDATE_WALLET',
  createOrder = 'CREATE_ORDER',
  getOrders = 'GET_ORDERS',
  getOrder = 'GET_ORDER',
  updateOrder = 'UPDATE_ORDER',
  getUsers = 'GET_USERS',
  updateUser = 'UPDATE_USER',
  getVerificationRequests = 'GET_VERIFICATION_REQUESTS',
  acceptVerification = 'ACCEPT_VERIFICATION',
  declineVerification = 'DECLINE_VERIFICATION',
  getPlans = 'GET_PLANS',
  deletePlan = 'DELETE_PLAN',
  addPlan = 'ADD_PLAN',
  updatePlan = 'UPDATE_PLAN',
  createAccount = 'CREATE_ACCOUNT',
  editAccount = 'EDIT_ACCOUNT',
  getWallets = 'GET_WALLETS',
  getNews = 'GET_NEWS',
  createNews = 'CREATE_NEWS',
  deleteNews = 'DELETE_NEWS',
  getCollections = 'GET_COLLECTIONS',
  createCollection = 'CREATE_COLLECTION',
  getCollection = 'GET_COLLECTION',
  createAsset = 'CREATE_ASSET',
  deleteAsset = 'DELETE_ASSET',
  editAsset = 'EDIT_ASSET',
}

interface Auth {
  type: ActionTypes.auth
  payload: boolean
}

interface AuthError {
  type: ActionTypes.authError
}

interface Profile {
  type: ActionTypes.profile
  payload: any
}

interface Alert {
  type: ActionTypes.alert
  payload: { variant: AlertVariant; text: string; id: string }
}

interface AuthLoading {
  type: ActionTypes.authLoading
  payload: boolean
}

interface Logout {
  type: ActionTypes.logout
}

interface CreateOrder {
  type: ActionTypes.createOrder
  payload: any
}

interface GetOrders {
  type: ActionTypes.getOrders
  payload: any
}

interface GetOrder {
  type: ActionTypes.getOrder
  payload: any
}

interface UpdateOrder {
  type: ActionTypes.updateOrder
  payload: any
}

interface GetUsers {
  type: ActionTypes.getUsers
  payload: any
}

interface UpdateUser {
  type: ActionTypes.updateUser
  payload: any
}

interface GetVerificationRequests {
  type: ActionTypes.getVerificationRequests
  payload: any
}

interface AcceptVerification {
  type: ActionTypes.acceptVerification
  payload: any
}

interface DeclineVerification {
  type: ActionTypes.declineVerification
  payload: string
}

interface GetPlans {
  type: ActionTypes.getPlans
  payload: any
}

interface DeletePlan {
  type: ActionTypes.deletePlan
  payload: string
}

interface AddPlan {
  type: ActionTypes.addPlan
  payload: any
}

interface UpdatePlan {
  type: ActionTypes.updatePlan
  payload: any
}

interface GetAccounts {
  type: ActionTypes.getAccounts
  payload: any
}

interface DeleteAccount {
  type: ActionTypes.deleteAccount
  payload: string
}

interface CreateAccount {
  type: ActionTypes.createAccount
  payload: any
}

interface EditAccount {
  type: ActionTypes.editAccount
  payload: any
}

interface GetWallets {
  type: ActionTypes.getWallets
  payload: any
}

interface GetWallet {
  type: ActionTypes.getWallet
  payload: any
}

interface UpdateWallet {
  type: ActionTypes.updateWallet
  payload: any
}

interface GetNews {
  type: ActionTypes.getNews
  payload: any
}

interface CreateNews {
  type: ActionTypes.createNews
  payload: any
}

interface DeleteNews {
  type: ActionTypes.deleteNews
  payload: string
}

interface GetCollections {
  type: ActionTypes.getCollections
  payload: any
}

interface CreateCollection {
  type: ActionTypes.createCollection
  payload: any
}

interface GetCollection {
  type: ActionTypes.getCollection
  payload: any
}

interface CreateAsset {
  type: ActionTypes.createAsset
  payload: any
}

interface DeleteAsset {
  type: ActionTypes.deleteAsset
  payload: { collection: string; asset: string }
}

interface EditAsset {
  type: ActionTypes.editAsset
  payload: any
}

export type Action =
  | Auth
  | Profile
  | AuthError
  | AuthLoading
  | Logout
  | Alert
  | CreateOrder
  | GetOrders
  | GetOrder
  | UpdateOrder
  | GetUsers
  | UpdateUser
  | GetVerificationRequests
  | AcceptVerification
  | DeclineVerification
  | GetPlans
  | DeletePlan
  | AddPlan
  | UpdatePlan
  | GetAccounts
  | DeleteAccount
  | CreateAccount
  | EditAccount
  | GetWallets
  | GetWallet
  | UpdateWallet
  | GetNews
  | CreateNews
  | DeleteNews
  | GetCollections
  | CreateCollection
  | GetCollection
  | CreateAsset
  | DeleteAsset
  | EditAsset
