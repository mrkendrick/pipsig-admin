import { Dispatch } from 'redux'
import { v4 } from 'uuid'
import UsersApiService from '../../utils/api/users.api'
import VerificationApiService from '../../utils/api/verification.api'
import { AlertVariant } from '../reducers/alert.reducer'
import { Action, ActionTypes } from './types'

const _getVerificationRequests =
  (
    { page, limit }: { page: number; limit: number },
    setLoading?: (x: boolean) => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await VerificationApiService.getVerificationRequests({
        page,
        limit,
      })

      dispatch({
        type: ActionTypes.getVerificationRequests,
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

const _acceptVerification =
  (userId: string, data: any, setLoading?: (x: boolean) => void) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await UsersApiService.updateUser(userId, data)

      dispatch({
        type: ActionTypes.acceptVerification,
        payload: res.data,
      })

      setLoading && setLoading(false)

      dispatch({
        type: ActionTypes.alert,
        payload: {
          id: v4().toString(),
          variant: AlertVariant.success,
          text: 'Verification Accepted',
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

const _declineVerification =
  (id: string, userId: string, data: any, setLoading?: (x: boolean) => void) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      await UsersApiService.updateUser(userId, data)
      await VerificationApiService.deleteVerificationRequest(id)

      dispatch({
        type: ActionTypes.declineVerification,
        payload: id,
      })

      setLoading && setLoading(false)

      dispatch({
        type: ActionTypes.alert,
        payload: {
          id: v4().toString(),
          variant: AlertVariant.success,
          text: 'Verification Declined',
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

// const _getVerificationRequest =
//   (id: string, setLoading?: (x: boolean) => void) =>
//   async (dispatch: Dispatch<Action>) => {
//     try {
//       const res = await VerificationApiService.getVerificationRequest(id)

//       dispatch({
//         type: ActionTypes.getVerificationRequest,
//         payload: res.data,
//       })

//       setLoading && setLoading(false)
//     } catch (error: any) {
//       setLoading && setLoading(false)

//       if (error?.message === 'Network Error') {
//         dispatch({
//           type: ActionTypes.alert,
//           payload: {
//             id: v4().toString(),
//             variant: AlertVariant.warn,
//             text: 'You are offline',
//           },
//         })
//       } else if (error?.response?.data?.message) {
//         dispatch({
//           type: ActionTypes.alert,
//           payload: {
//             id: v4().toString(),
//             variant: AlertVariant.error,
//             text: error.response.data.message,
//           },
//         })
//       } else {
//         dispatch({
//           type: ActionTypes.alert,
//           payload: {
//             id: v4().toString(),
//             variant: AlertVariant.error,
//             text: 'Something went wrong.',
//           },
//         })
//       }
//     }
//   }

const verificationActions = {
  _getVerificationRequests,
  _acceptVerification,
  _declineVerification,
}

export default verificationActions
