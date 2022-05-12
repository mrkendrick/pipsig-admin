import { Action, ActionTypes } from '../actions/types'
import { Role, SecurityLevel } from './auth.reducer'

export enum Status {
  pending = 'pending',
  confirmed = 'confirmed',
  cancelled = 'cancelled',
}

export type Wallet = {
  _id: string
  withdrawLimit: number
  spotWallet: {
    balance: number
    percentageChange: number
    _id: string
  }
  fundingWallet: {
    balance: number
    percentageChange: number
    _id: string
  }
  availableBalance: number
  totalBalance: number
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
    referralBonus: number
  }
  withdrawHistory: {
    coin: string
    walletAddress: string
    comment: string
    amount: number
    date: string
    _id: string
  }[]
  transactionHistory: {
    amount: number
    from: string
    to: string
    date: string
    _id: string
  }[]
  depositHistory: {
    coin: string
    walletAddress: string
    status: Status
    amount: number
    date: string
    _id: string
  }[]
}

type State = {
  wallets: {
    totalCount: number
    count: number
    data: Wallet[]
  }

  wallet: Wallet
}

const initialState: State = {
  wallets: {
    totalCount: 0,
    count: 0,
    data: [],
  },
  wallet: {
    _id: '',
    withdrawLimit: 0,
    spotWallet: {
      balance: 0,
      percentageChange: 0,
      _id: '',
    },
    fundingWallet: {
      balance: 0,
      percentageChange: 0,
      _id: '',
    },
    availableBalance: 0,
    totalBalance: 0,
    user: {
      referralBonus: 0,
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
    withdrawHistory: [],
    transactionHistory: [],
    depositHistory: [],
  },
}

const walletReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.getWallets:
      return { ...state, wallets: action.payload }

    case ActionTypes.getWallet:
      return { ...state, wallet: action.payload }

    case ActionTypes.updateWallet:
      return {
        ...state,
        wallets: {
          ...state.wallets,
          data: [
            ...state.wallets.data.map(d =>
              d._id === action.payload._id ? { ...action.payload } : d,
            ),
          ],
        },
        wallet: { ...action.payload },
      }

    default:
      return state
  }
}

export default walletReducer
