import { Action, ActionTypes } from '../actions/types'

type State = {
  news: {
    totalCount: number
    count: number
    data: {
      _id: string
      createdAt: string
      postedBy: string
      photo: string
      post: string
      slug: string
      title: string
    }[]
  }
}

const initialState: State = {
  news: {
    totalCount: 0,
    count: 0,
    data: [],
  },
}

const newsReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.getNews:
      return {
        ...state,
        news: { ...action.payload },
      }

    case ActionTypes.createNews:
      return {
        ...state,
        news: {
          totalCount: state.news.totalCount + 1,
          count: state.news.count + 1,
          data: [...state.news.data, { ...action.payload }],
        },
      }

    case ActionTypes.deleteNews:
      return {
        ...state,
        news: {
          totalCount: state.news.totalCount - 1,
          count: state.news.count - 1,
          data: [...state.news.data.filter(d => d._id !== action.payload)],
        },
      }

    default:
      return state
  }
}

export default newsReducer
