import { Dispatch } from 'redux'
import { v4 } from 'uuid'
import PlansApiService from '../../utils/api/plans.api'
import { AlertVariant } from '../reducers/alert.reducer'
import { Action, ActionTypes } from './types'

const _getPlans =
  (setLoading?: (x: boolean) => void) => async (dispatch: Dispatch<Action>) => {
    try {
      const res = await PlansApiService.getPlans()

      dispatch({
        type: ActionTypes.getPlans,
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

const _addPlan =
  (data: any, callback?: () => void, setLoading?: (x: boolean) => void) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await PlansApiService.addPlan(data)

      dispatch({
        type: ActionTypes.addPlan,
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

const _deletePlan =
  (id: string, callback?: () => void, setLoading?: (x: boolean) => void) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      await PlansApiService.deletePlan(id)

      dispatch({
        type: ActionTypes.deletePlan,
        payload: id,
      })

      setLoading && setLoading(false)
      callback && callback()

      dispatch({
        type: ActionTypes.alert,
        payload: {
          id: v4().toString(),
          variant: AlertVariant.success,
          text: 'Plan deleted',
        },
      })
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

const _updatePlan =
  (
    id: string,
    data: any,
    callback?: () => void,
    setLoading?: (x: boolean) => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await PlansApiService.updatePlan(id, data)

      dispatch({
        type: ActionTypes.updatePlan,
        payload: res.data,
      })

      setLoading && setLoading(false)
      callback && callback()

      dispatch({
        type: ActionTypes.alert,
        payload: {
          id: v4().toString(),
          variant: AlertVariant.success,
          text: 'Plan updated',
        },
      })
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

const plansActions = { _getPlans, _deletePlan, _addPlan, _updatePlan }

export default plansActions
