import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  FormControl,
  TextField,
  styled,
  Alert,
  AlertColor,
} from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Compressor from 'compressorjs'
import { bindActionCreators } from 'redux'
import newsActions from '../../redux/actions/news'
import { useDispatch } from 'react-redux'

type Props = {
  isOpen: boolean
  onClose: () => void
}

type InputFields = {
  title: string
  post: string
}

const schema = yup
  .object({
    title: yup.string().required(),
    post: yup.string().required(),
  })
  .required()

const Input = styled('input')({
  display: 'none',
})

const EditNews = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<any>({
    isSelected: false,
    src: null,
  })
  const [alert, setAlert] = useState<{
    state: boolean
    text: string
    variant: AlertColor
  }>({
    state: false,
    text: '',
    variant: 'error',
  })

  const { _createNews } = bindActionCreators(newsActions, dispatch)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputFields>({ resolver: yupResolver(schema) })

  const submit: SubmitHandler<InputFields> = async data => {
    setLoading(true)

    const news = {
      ...data,
      image: image.src,
    }

    await _createNews(news, () => onClose(), setLoading)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    if (!file) return

    new Compressor(file, {
      quality: 0.4,

      success(compressedImage) {
        let reader = new FileReader()

        reader.readAsDataURL(compressedImage)
        reader.onload = () => {
          setImage({
            isSelected: true,
            src: reader.result,
          })

          setAlert({
            state: true,
            text: 'Image selected successfully!',
            variant: 'success',
          })
        }
      },

      error(err) {
        setImage({
          isSelected: false,
          src: null,
        })

        setAlert({
          state: true,
          text: 'Something went wrong!',
          variant: 'error',
        })
        console.log(err.message)
      },
    })
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle id='alert-dialog-title'>Edit News</DialogTitle>
      <DialogContent>
        <Stack
          pt={1}
          spacing={4}
          divider={<Divider orientation='horizontal' flexItem />}
          justifyContent='space-between'
        >
          <Stack spacing={2} alignItems='stretch' flex='2'>
            <FormControl fullWidth>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                defaultValue={''}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type='text'
                    size='small'
                    label='Title'
                    variant='outlined'
                    placeholder='News Title'
                    error={errors.title ? true : false}
                    {...field}
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth>
              <Controller
                name='post'
                control={control}
                rules={{ required: true }}
                defaultValue={''}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type='text'
                    size='small'
                    multiline
                    maxRows={6}
                    label='Content'
                    variant='outlined'
                    placeholder='News Content...'
                    error={errors.post ? true : false}
                    {...field}
                  />
                )}
              />
            </FormControl>
          </Stack>
          <Stack
            spacing={3}
            justifyContent='center'
            alignItems='center'
            flex='3'
          >
            {alert.state && (
              <Alert severity={alert.variant}>{alert.text}</Alert>
            )}
            <label htmlFor='contained-button-file'>
              <Input
                onChange={onChange}
                accept='image/*'
                id='contained-button-file'
                type='file'
              />
              <Button variant='outlined' component='span'>
                Select Image
              </Button>
            </label>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Discard</Button>
        <LoadingButton
          disabled={!image.isSelected}
          loading={loading}
          onClick={handleSubmit(submit)}
        >
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default EditNews
