import { Action, ActionTypes } from '../actions/types'

type State = {
  accounts: {
    _id: string
    image: string
    walletId: string
    name: string
    symbol: string
    createdAt: string
  }[]
}

const initialState: State = {
  accounts: [],
}

const accountsReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case ActionTypes.getAccounts:
      return { ...state, accounts: action.payload }

    case ActionTypes.deleteAccount:
      return {
        ...state,
        accounts: [
          ...state.accounts.filter(account => account._id !== action.payload),
        ],
      }

    case ActionTypes.createAccount:
      return {
        ...state,
        accounts: [...state.accounts, { ...action.payload }],
      }

    case ActionTypes.editAccount:
      return {
        ...state,
        accounts: [
          ...state.accounts.map(account =>
            account._id === action.payload._id
              ? { ...action.payload }
              : account,
          ),
        ],
      }

    default:
      return state
  }
}

export default accountsReducer
