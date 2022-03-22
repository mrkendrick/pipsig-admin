import { Dispatch } from 'redux'
import { v4 } from 'uuid'
import UsersApiService from '../../utils/api/users.api'
import { AlertVariant } from '../reducers/alert.reducer'
import { Action, ActionTypes } from './types'

const _getUsers =
  (
    { page, limit }: { page: number; limit: number },
    setLoading?: (x: boolean) => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await UsersApiService.getUsers({ page, limit })

      dispatch({
        type: ActionTypes.getUsers,
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

const _updateUser =
  (id: string, data: any, setLoading?: (x: boolean) => void) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await UsersApiService.updateUser(id, data)

      dispatch({
        type: ActionTypes.updateUser,
        payload: res.data,
      })

      setLoading && setLoading(false)
      dispatch({
        type: ActionTypes.alert,
        payload: {
          id: v4().toString(),
          variant: AlertVariant.info,
          text: 'User Updated',
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

const usersActions = { _getUsers, _updateUser }

export default usersActions
