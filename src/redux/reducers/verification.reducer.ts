import { Action, ActionTypes } from '../actions/types'
import { Role, SecurityLevel } from './auth.reducer'

type State = {
  verificationRequests: {
    totalCount: number
    count: number
    data: {
      _id: string
      dob: {
        day: number
        month: string
        year: number
        _id: string
      }
      gender: 'male' | 'female' | 'others'
      citizenship: string
      lastName: string
      firstName: string
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
      createdAt: string
    }[]
  }

  verificationRequest: {
    _id: string
    dob: {
      day: number
      month: string
      year: number
      _id: string
    }
    gender: 'male' | 'female' | 'others'
    citizenship: string
    lastName: string
    firstName: string
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
    createdAt: string
  }
}

const initialState: State = {
  verificationRequests: { totalCount: 0, count: 0, data: [] },
  verificationRequest: {
    _id: '',
    dob: {
      day: 1,
      month: 'January',
      year: 1981,
      _id: '',
    },
    gender: 'others',
    citizenship: '',
    lastName: '',
    firstName: '',
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
      active: false,
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
    createdAt: '',
  },
}

const verificationReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case ActionTypes.getVerificationRequests:
      return { ...state, verificationRequests: action.payload }

    case ActionTypes.acceptVerification:
      return {
        ...state,
        verificationRequests: {
          ...state.verificationRequests,
          data: [
            ...state.verificationRequests.data.map(data =>
              data.user._id === action.payload._id
                ? { ...data, user: action.payload }
                : data,
            ),
          ],
        },
      }

    case ActionTypes.declineVerification:
      return {
        ...state,
        verificationRequests: {
          ...state.verificationRequests,
          totalCount: state.verificationRequests.totalCount - 1,
          count: state.verificationRequests.count - 1,
          data: [
            ...state.verificationRequests.data.filter(
              data => data._id !== action.payload,
            ),
          ],
        },
      }

    //  case ActionTypes.updateUser:
    //    return {
    //      ...state,
    //      users: {
    //        ...state.users,
    //        data: state.users.data.map(user =>
    //          user._id === action.payload._id ? action.payload : user,
    //        ),
    //      },
    //      user: action.payload,
    //    }

    default:
      return state
  }
}

export default verificationReducer
