import { Action, ActionTypes } from '../actions/types'

type State = {
  plans: {
    createdAt: string
    max: number
    min: number
    rfb: number
    roi: number
    title: string
    type: 'self' | 'bot'
    _id: string
  }[]
}

const initialState: State = {
  plans: [],
}

const plansReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.getPlans:
      return { ...state, plans: [...action.payload] }

    case ActionTypes.deletePlan:
      return {
        ...state,
        plans: [...state.plans.filter(plan => plan._id !== action.payload)],
      }

    case ActionTypes.addPlan:
      return {
        ...state,
        plans: [...state.plans, { ...action.payload }],
      }

    case ActionTypes.updatePlan:
      return {
        ...state,
        plans: [
          ...state.plans.map(plan =>
            plan._id === action.payload._id ? { ...action.payload } : plan,
          ),
        ],
      }

    default:
      return state
  }
}

export default plansReducer
