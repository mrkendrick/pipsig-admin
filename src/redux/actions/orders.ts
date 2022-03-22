import { Dispatch } from 'redux'
import { v4 } from 'uuid'
import OrdersApiService from '../../utils/api/orders.api'
import { AlertVariant } from '../reducers/alert.reducer'
import { Action, ActionTypes } from './types'

const _createOrder =
  (
    data: any,
    callback: () => Promise<void>,
    setLoading?: (x: boolean) => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await OrdersApiService.createOrder(data)

      dispatch({
        type: ActionTypes.createOrder,
        payload: res.data,
      })

      dispatch({
        type: ActionTypes.alert,
        payload: {
          id: v4().toString(),
          variant: AlertVariant.info,
          text: 'Order created',
        },
      })

      await callback()
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

const _getOrders =
  (
    { page, limit }: { page: number; limit: number },
    setLoading?: (x: boolean) => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await OrdersApiService.getOrders({ page, limit })

      dispatch({
        type: ActionTypes.getOrders,
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

const _getOrder =
  (id: string, setLoading?: (x: boolean) => void) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await OrdersApiService.getOrder(id)

      dispatch({
        type: ActionTypes.getOrder,
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

const _updateOrder =
  (
    id: string,
    data: any,
    callback?: () => void,
    setLoading?: (x: boolean) => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await OrdersApiService.updateOrder(id, data)

      dispatch({
        type: ActionTypes.updateOrder,
        payload: res.data,
      })

      setLoading && setLoading(false)
      callback && callback()
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

const orderActions = { _createOrder, _getOrders, _getOrder, _updateOrder }

export default orderActions
