import { Action, ActionTypes } from '../actions/types'
import { Role, SecurityLevel } from './auth.reducer'

type State = {
  orders: {
    totalCount: number
    count: number
    data: {
      _id: string
      total: number
      amount: number
      status: 'pending' | 'active' | 'cancelled' | 'closed'
      category: 'forex' | 'crypto' | 'stock' | 'nft'

      plan: {
        _id: string
        rfb: number
        roi: number
        max: number
        min: number
        title: string
        createdAt: string
      }

      user: {
        _id: string
        createdAt: string
        passwordChangedAt: string
        friendsInvited: number
        referralCode: string
        feeDiscount: number
        kycVerified: false
        isVerified: false
        lastLogin: string
        active: true
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

  order: {
    _id: string
    total: number
    amount: number
    status: 'pending' | 'active' | 'cancelled' | 'closed'
    category: 'forex' | 'crypto' | 'stock'

    plan: {
      _id: string
      rfb: number
      roi: number
      max: number
      min: number
      title: string
      createdAt: string
    }

    user: {
      _id: string
      createdAt: string
      passwordChangedAt: string
      friendsInvited: number
      referralCode: string
      feeDiscount: number
      kycVerified: false
      isVerified: false
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
  orders: { totalCount: 0, count: 0, data: [] },
  order: {
    _id: '',
    total: 0,
    amount: 0,
    status: 'pending',
    category: 'forex',

    plan: {
      _id: '',
      rfb: 0,
      roi: 0,
      max: 0,
      min: 0,
      title: '',
      createdAt: '',
    },

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

const ordersReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.getOrders:
      return { ...state, orders: action.payload }

    case ActionTypes.getOrder:
      return { ...state, order: action.payload }

    case ActionTypes.updateOrder:
      return {
        ...state,
        orders: {
          ...state.orders,
          data: state.orders.data.map(order =>
            order._id === action.payload._id ? action.payload : order,
          ),
        },
        order: action.payload,
      }

    default:
      return state
  }
}

export default ordersReducer
