import { Action, ActionTypes } from '../actions/types'

export type Asset = {
  image: string
  uuid: number
  price: number
  max: number
  min: number
  percentageChange: number
  _id: string
}

type Collection = {
  _id: string
  owners: number
  totalVolume: number
  totalSales: number
  totalSupply: number
  marketCap: number
  floorPrice: number
  isVerified: boolean
  coverImage: string
  assets: Asset[]
  '7dChange': number
  '24hChange': number
  description: string
  slug: string
  image: string
  name: string
  createdAt: string
}

type State = {
  collections: {
    totalCount: number
    count: number
    data: Collection[]
  }

  collection: Collection
}

const initialState: State = {
  collections: {
    totalCount: 0,
    count: 0,
    data: [],
  },

  collection: {
    name: '',
    _id: '',
    '24hChange': 0,
    '7dChange': 0,
    totalSales: 0,
    totalSupply: 0,
    slug: '',
    assets: [],
    coverImage: '',
    image: '',
    createdAt: '',
    description: '',
    floorPrice: 0,
    isVerified: false,
    marketCap: 0,
    owners: 0,
    totalVolume: 0,
  },
}

const nftReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.getCollections:
      return {
        ...state,
        collections: {
          ...action.payload,
        },
      }

    case ActionTypes.getCollection:
      return {
        ...state,
        collection: state.collections.data.find(
          collection => collection._id === action.payload,
        ),
      }

    case ActionTypes.createCollection:
      return {
        ...state,
        collections: {
          ...state.collections,
          totalCount: state.collections.totalCount + 1,
          count: state.collections.count + 1,
          data: [{ ...action.payload }, ...state.collections.data],
        },
      }

    case ActionTypes.createAsset:
      return {
        ...state,
        collections: {
          ...state.collections,
          data: [
            ...state.collections.data.map(collection =>
              collection._id === action.payload._id
                ? action.payload
                : collection,
            ),
          ],
        },
        collection: action.payload,
      }

    case ActionTypes.deleteAsset:
      return {
        ...state,
        collections: {
          ...state.collections,
          data: [
            ...state.collections.data.map(collection =>
              collection._id === action.payload.collection
                ? {
                    ...collection,
                    assets: [
                      ...collection.assets.filter(
                        asset => asset._id !== action.payload.asset,
                      ),
                    ],
                  }
                : collection,
            ),
          ],
        },
        collection: {
          ...state.collection,
          assets: [
            ...state.collection.assets.filter(
              asset => asset._id !== action.payload.asset,
            ),
          ],
        },
      }

    case ActionTypes.editAsset:
      return {
        ...state,
        collections: {
          ...state.collections,
          data: [
            ...state.collections.data.map(collection =>
              collection._id === action.payload.id
                ? action.payload
                : collection,
            ),
          ],
        },
        collection: action.payload,
      }

    default:
      return state
  }
}

export default nftReducer
