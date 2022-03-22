import { Dispatch } from 'redux'
import { v4 } from 'uuid'
import NewsApiService from '../../utils/api/news.api'
import UploadService from '../../utils/api/upload.api'
import { AlertVariant } from '../reducers/alert.reducer'
import { Action, ActionTypes } from './types'

const _getNews =
  (
    { page, limit }: { page: number; limit: number },
    setLoading?: (x: boolean) => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await NewsApiService.getNews({
        page,
        limit,
      })

      dispatch({
        type: ActionTypes.getNews,
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

const _createNews =
  (
    data: {
      post: string
      title: string
      image: string | ArrayBuffer | null
    },
    callback: () => void,
    setLoading?: (x: boolean) => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const { post, title, image } = data

      const imageRes = await UploadService.uploadImage(image)

      const news = {
        title,
        post,
        photo: imageRes.data.secure_url,
        postedBy: 'press',
      }

      const res = await NewsApiService.createNews(news)

      dispatch({
        type: ActionTypes.createNews,
        payload: res.data,
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

const _deleteNews =
  (id: string, setLoading?: (x: boolean) => void) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      await NewsApiService.deleteNews(id)

      dispatch({
        type: ActionTypes.deleteNews,
        payload: id,
      })

      dispatch({
        type: ActionTypes.alert,
        payload: {
          id: v4().toString(),
          variant: AlertVariant.info,
          text: 'News deleted',
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

const newsActions = { _getNews, _createNews, _deleteNews }

export default newsActions
