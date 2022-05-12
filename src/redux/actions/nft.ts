import { Dispatch } from 'redux'
import { v4 } from 'uuid'
import NftApiService from '../../utils/api/nft.api'
import { AlertVariant } from '../reducers/alert.reducer'
import { Action, ActionTypes } from './types'

const _getCollections =
  (
    { page, limit }: { page: number; limit: number },
    setLoading?: (x: boolean) => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await NftApiService.getCollections({
        page,
        limit,
      })

      dispatch({
        type: ActionTypes.getCollections,
        payload: res.data,
      })

      setLoading && setLoading(false)
    } catch (error: any) {
      setLoading && setLoading(false)

      if (error?.message === 'Network Error') {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.warn,
            text: 'You are offline',
          },
        })
      } else if (error?.response?.data?.message) {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: error.response.data.message,
          },
        })
      } else {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: 'Something went wrong.',
          },
        })
      }
    }
  }

const _validate =
  (
    collectionName: string,
    callback: (x: boolean) => void,
    setLoading?: (x: boolean) => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await NftApiService.validate(collectionName)

      const {
        collection: {
          stats,
          banner_image_url,
          description,
          image_url,
          name,
          slug,
        },
      } = res.data

      if (
        name &&
        slug &&
        image_url &&
        description &&
        banner_image_url &&
        stats.floor_price &&
        stats.market_cap &&
        stats.total_supply &&
        stats.total_sales &&
        stats.total_volume &&
        stats.num_owners &&
        stats.one_day_change &&
        stats.seven_day_change
      ) {
        callback(true)
      } else {
        callback(false)
      }

      setLoading && setLoading(false)
    } catch (error: any) {
      setLoading && setLoading(false)

      if (error?.message === 'Network Error') {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.warn,
            text: 'You are offline',
          },
        })
      } else {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: 'Collection not found',
          },
        })
      }
    }
  }

const _getCollection = (id: string) => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionTypes.getCollection,
    payload: id,
  })
}

const _createCollection =
  (data: any, callback: () => void, setLoading?: (x: boolean) => void) =>
  async (dispatch: Dispatch<Action>) => {
    const res = await NftApiService.createCollection(data)

    dispatch({
      type: ActionTypes.createCollection,
      payload: res.data,
    })

    dispatch({
      type: ActionTypes.alert,
      payload: {
        id: v4().toString(),
        variant: AlertVariant.info,
        text: 'Collection created',
      },
    })

    setLoading && setLoading(false)
    callback()
    try {
    } catch (error: any) {
      setLoading && setLoading(false)

      if (error?.message === 'Network Error') {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.warn,
            text: 'You are offline',
          },
        })
      } else if (error?.response?.data?.message) {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: error.response.data.message,
          },
        })
      } else {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: 'Something went wrong.',
          },
        })
      }
    }
  }

const _createAsset =
  (
    collectionId: string,
    data: any,
    callback: () => void,
    setLoading?: (x: boolean) => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await NftApiService.createAsset(collectionId, data)

      dispatch({
        type: ActionTypes.createAsset,
        payload: res.data,
      })

      dispatch({
        type: ActionTypes.alert,
        payload: {
          id: v4().toString(),
          variant: AlertVariant.info,
          text: 'Asset created',
        },
      })

      setLoading && setLoading(false)
      callback()
    } catch (error: any) {
      setLoading && setLoading(false)

      if (error?.message === 'Network Error') {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.warn,
            text: 'You are offline',
          },
        })
      } else if (error?.response?.data?.message) {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: error.response.data.message,
          },
        })
      } else {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: 'Something went wrong.',
          },
        })
      }
    }
  }

const _deleteAsset =
  (collection: string, asset: string, setLoading?: (x: boolean) => void) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      await NftApiService.deleteAsset(collection, asset)

      dispatch({
        type: ActionTypes.deleteAsset,
        payload: { collection, asset },
      })

      dispatch({
        type: ActionTypes.alert,
        payload: {
          id: v4().toString(),
          variant: AlertVariant.info,
          text: 'Asset deleted',
        },
      })

      setLoading && setLoading(false)
    } catch (error: any) {
      setLoading && setLoading(false)

      if (error?.message === 'Network Error') {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.warn,
            text: 'You are offline',
          },
        })
      } else if (error?.response?.data?.message) {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: error.response.data.message,
          },
        })
      } else {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: 'Something went wrong.',
          },
        })
      }
    }
  }

const _editAsset =
  (
    options: { collection: string; asset: string; data: any },
    callback: () => void,
    setLoading?: (x: boolean) => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await NftApiService.updateAsset(
        options.collection,
        options.asset,
        options.data,
      )

      dispatch({
        type: ActionTypes.editAsset,
        payload: res.data,
      })

      dispatch({
        type: ActionTypes.alert,
        payload: {
          id: v4().toString(),
          variant: AlertVariant.info,
          text: 'Asset deleted',
        },
      })

      setLoading && setLoading(false)
      callback()
    } catch (error: any) {
      setLoading && setLoading(false)

      if (error?.message === 'Network Error') {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.warn,
            text: 'You are offline',
          },
        })
      } else if (error?.response?.data?.message) {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: error.response.data.message,
          },
        })
      } else {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: 'Something went wrong.',
          },
        })
      }
    }
  }

export const nftActions = {
  _getCollections,
  _validate,
  _createCollection,
  _getCollection,
  _createAsset,
  _deleteAsset,
  _editAsset,
}
