import { Action, ActionTypes } from '../actions/types'
import { Role, SecurityLevel } from './auth.reducer'

type State = {
  users: {
    totalCount: number
    count: number
    data: {
      _id: string
      createdAt: string
      passwordChangedAt: string
      friendsInvited: number
      referralCode: string
      feeDiscount: number
      kycVerified: boolean
      isVerified: boolean
      lastLogin: string
      active: boolean
      photo: string
      tradingFees: {
        level: number
        maxLevel: number
        currentLevel: number
        lastCalcTime: string
        _id: string
      }
      securityLevel: SecurityLevel
      roles: Role[]
      email: string
      name: string
    }[]
  }

  user: {
    _id: string
    createdAt: string
    passwordChangedAt: string
    friendsInvited: number
    referralCode: string
    feeDiscount: number
    kycVerified: boolean
    isVerified: boolean
    lastLogin: string
    active: boolean
    photo: string
    tradingFees: {
      level: number
      maxLevel: number
      currentLevel: number
      lastCalcTime: string
      _id: string
    }
    securityLevel: SecurityLevel
    roles: Role[]
    email: string
    name: string
  }
}

const initialState: State = {
  users: { totalCount: 0, count: 0, data: [] },
  user: {
    _id: '',
    createdAt: '',
    passwordChangedAt: '',
    friendsInvited: 0,
    referralCode: '',
    feeDiscount: 0,
    kycVerified: false,
    isVerified: false,
    lastLogin: '',
    active: true,
    photo: '',
    tradingFees: {
      level: 0,
      maxLevel: 0,
      currentLevel: 0,
      lastCalcTime: '',
      _id: '',
    },
    securityLevel: SecurityLevel.low,
    roles: [],
    email: '',
    name: '',
  },
}

const usersReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.getUsers:
      return { ...state, users: action.payload }

    case ActionTypes.updateUser:
      return {
        ...state,
        users: {
          ...state.users,
          data: state.users.data.map(user =>
            user._id === action.payload._id ? action.payload : user,
          ),
        },
        user: action.payload,
      }

    default:
      return state
  }
}

export default usersReducer
