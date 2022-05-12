import { Action, ActionTypes } from './../actions/types'

export enum Role {
  user = 'user',
  admin = 'admin',
}

export enum SecurityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

type State = {
  isAuthenticated: boolean
  authLoading: boolean
  user: {
    active: boolean
    email: string
    friendsInvited: number
    isVerified: boolean
    lastLogin: string
    name: string
    photo: string
    referralCode: string
    roles: Role[]
    _id: string
    passwordChangedAt: string
    createdAt: string
    feeDiscount: number
    kycVerified: boolean
    tradingFees: {
      level: number
      maxLevel: number
      currentLevel: number
      lastCalcTime: string
    }
    securityLevel: SecurityLevel
  }
}

const initialState: State = {
  isAuthenticated: false,
  authLoading: true,
  user: {
    active: false,
    email: '',
    friendsInvited: 0,
    isVerified: false,
    lastLogin: '',
    name: '',
    photo: '',
    referralCode: '',
    roles: [Role.user],
    createdAt: '',
    _id: '',
    passwordChangedAt: '',
    feeDiscount: 0,
    kycVerified: false,
    securityLevel: SecurityLevel.low,
    tradingFees: {
      currentLevel: 0,
      maxLevel: 0,
      level: 0,
      lastCalcTime: '',
    },
  },
}

const authReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.auth:
      return {
        ...state,
        isAuthenticated: action.payload,
      }

    case ActionTypes.authError:
      return {
        ...initialState,
        authLoading: false,
      }

    case ActionTypes.authLoading:
      return {
        ...state,
        authLoading: action.payload,
      }

    case ActionTypes.profile:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      }

    //  case ActionTypes.updateProfile:
    //    return {
    //      ...state,
    //      user: {
    //        ...action.payload,
    //      },
    //    }

    //  case ActionTypes.updatePassword:
    //    return {
    //      ...initialState,
    //    }

    case ActionTypes.logout:
      return {
        ...initialState,
        authLoading: false,
      }

    default:
      return state
  }
}

export default authReducer
