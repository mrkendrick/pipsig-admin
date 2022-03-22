import { AlertVariant } from './../reducers/alert.reducer'
import { Dispatch } from 'react'
import { v4 } from 'uuid'
import AuthenticationApiService from '../../utils/api/auth.api'
import HelperServices from '../../utils/helpers'
import { Action, ActionTypes } from './types'

const _login =
  (
    data: { username: string; password: string; saveInCookie: boolean },
    successCallback: () => void,
    setLoading?: (x: boolean) => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    const { password, username, saveInCookie } = data
    try {
      const res = await AuthenticationApiService.login({ username, password })

      if (saveInCookie) {
        HelperServices.session({ method: 'del' })

        HelperServices.cookies({ method: 'set', value: res.data.token })
      } else {
        HelperServices.cookies({ method: 'del' })

        HelperServices.session({ method: 'set', value: res.data.token })
      }

      dispatch({
        type: ActionTypes.auth,
        payload: true,
      })

      dispatch({
        type: ActionTypes.alert,
        payload: {
          id: v4(),
          variant: AlertVariant.success,
          text: 'Logged In. Please wait...',
        },
      })
      setLoading && setLoading(false)
      successCallback()
    } catch (error: any) {
      setLoading && setLoading(false)
      HelperServices.cookies({ method: 'del' })
      HelperServices.session({ method: 'del' })
      dispatch({
        type: ActionTypes.auth,
        payload: false,
      })

      dispatch({
        type: ActionTypes.authError,
      })

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

const _signup =
  (
    data: {
      email: string
      password: string
      name: string
      referreeCode?: string
    },
    successCallback: () => void,
    setLoading?: (x: boolean) => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    const { password, email, name } = data
    try {
      await AuthenticationApiService.signup({ email, name, password })

      dispatch({
        type: ActionTypes.alert,
        payload: {
          id: v4(),
          variant: AlertVariant.success,
          text: 'Registration successful. Please login...',
        },
      })
      setLoading && setLoading(false)
      successCallback()
    } catch (error: any) {
      setLoading && setLoading(false)
      dispatch({
        type: ActionTypes.auth,
        payload: false,
      })

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
            id: v4(),
            variant: AlertVariant.error,
            text: error.response.data.message,
          },
        })
      } else {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4(),
            variant: AlertVariant.error,
            text: 'Something went wrong',
          },
        })
      }
    }
  }

const _getProfile = () => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionTypes.authLoading,
    payload: true,
  })
  try {
    const res = await AuthenticationApiService.getProfile()

    dispatch({
      type: ActionTypes.profile,
      payload: res.data,
    })
    dispatch({
      type: ActionTypes.authLoading,
      payload: false,
    })
  } catch (error: any) {
    HelperServices.cookies({ method: 'del' })
    HelperServices.session({ method: 'del' })

    dispatch({
      type: ActionTypes.authError,
    })
  }
}

const _logout = () => async (dispatch: Dispatch<Action>) => {
  HelperServices.cookies({ method: 'del' })
  HelperServices.session({ method: 'del' })

  dispatch({ type: ActionTypes.logout })
}

// const _updateProfile =
//   (
//     data: {
//       name: string
//       userPhoto: string
//       croppedImage: { isCropped: boolean; src: string }
//     },
//     callback?: () => void,
//     setLoading?: (x: boolean) => void,
//   ) =>
//   async (dispatch: Dispatch<Action>) => {
//     try {
//       if (data.croppedImage.isCropped) {
//         const blobRes = await CropperService.getBlobImage(data.croppedImage.src)

//         const upload = async (file: string | ArrayBuffer | null) => {
//           try {
//             const imageRes = await UploadService.uploadImage(file)
//             const secureUrl = imageRes.data.secure_url

//             const res = await AuthenticationApiService.updateProfile({
//               name: data.name,
//               photo: secureUrl,
//             })

//             dispatch({
//               type: ActionTypes.updateProfile,
//               payload: res.data,
//             })

//             dispatch({
//               type: ActionTypes.alert,
//               payload: {
//                 id: v4(),
//                 text: 'Profile updated',
//                 variant: AlertVariant.info,
//               },
//             })

//             setLoading && setLoading(false)
//             callback && callback()
//           } catch (error: any) {
//             setLoading && setLoading(false)
//             callback && callback()
//             console.log(error.message)
//           }
//         }

//         await CropperService.fileReader(blobRes.data, upload)
//       } else {
//         const res = await AuthenticationApiService.updateProfile({
//           name: data.name,
//           photo: data.userPhoto,
//         })

//         dispatch({
//           type: ActionTypes.updateProfile,
//           payload: res.data,
//         })

//         dispatch({
//           type: ActionTypes.alert,
//           payload: {
//             id: v4(),
//             text: 'Profile updated',
//             variant: AlertVariant.info,
//           },
//         })
//       }
//     } catch (error: any) {
//       setLoading && setLoading(false)
//       callback && callback()

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
//             id: v4(),
//             variant: AlertVariant.error,
//             text: error.response.data.message,
//           },
//         })
//       } else {
//         dispatch({
//           type: ActionTypes.alert,
//           payload: {
//             id: v4(),
//             variant: AlertVariant.error,
//             text: 'Something went wrong',
//           },
//         })
//       }
//     }
//   }

const _updatePassword =
  (
    data: { currentPassword: string; newPassword: string },
    callback: () => void,
    setLoading?: (x: boolean) => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await AuthenticationApiService.updatePassword(data)

      HelperServices.session({ method: 'del' })

      HelperServices.cookies({ method: 'set', value: res.data.token })

      dispatch({
        type: ActionTypes.alert,
        payload: {
          id: v4(),
          text: 'Password updated',
          variant: AlertVariant.info,
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
            id: v4(),
            variant: AlertVariant.error,
            text: error.response.data.message,
          },
        })
      } else {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4(),
            variant: AlertVariant.error,
            text: 'Something went wrong',
          },
        })
      }
    }
  }

const authActions = {
  _login,
  _signup,
  _getProfile,
  _logout,
  // _updateProfile,
  _updatePassword,
}

export default authActions
