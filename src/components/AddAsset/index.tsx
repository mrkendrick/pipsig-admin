import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { bindActionCreators } from 'redux'
import { nftActions } from '../../redux/actions/nft'
import { useDispatch } from 'react-redux'

type Props = {
  isOpen: boolean
  onClose: () => void
  collectionId: string
}

type InputFields = {
  image: string
  uuid: number
  min: number
  max: number
}

const schema = yup
  .object({
    image: yup.string().required(),
    uuid: yup.number().required(),
    min: yup.number().required(),
    max: yup.number().required(),
  })
  .required()

const AddAsset = ({ isOpen, onClose, collectionId }: Props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const { _createAsset } = bindActionCreators(nftActions, dispatch)

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<InputFields>({ resolver: yupResolver(schema) })

  const create: SubmitHandler<InputFields> = async data => {
    setLoading(true)
    _createAsset(collectionId, data, () => onClose(), setLoading)
  }

  useEffect(() => {
    if (isOpen) {
      setValue('image', '')
      setValue('uuid', 2671)
      setValue('min', 100)
      setValue('max', 700)
    }

    // eslint-disable-next-line
  }, [isOpen])

  return (
    <Dialog fullWidth maxWidth='xs' onClose={onClose} open={isOpen}>
      <DialogTitle>Create Asset</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <FormControl sx={{ marginTop: 1 }} fullWidth>
            <Controller
              name='image'
              control={control}
              rules={{ required: true }}
              defaultValue={''}
              render={({ field }) => (
                <TextField
                  fullWidth
                  size='small'
                  type='text'
                  label='Image URL'
                  variant='outlined'
                  placeholder='https://picsum.com/67392'
                  defaultValue=''
                  error={errors.image ? true : false}
                  {...field}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              name='uuid'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  size='small'
                  type='number'
                  label='Asset ID'
                  variant='outlined'
                  placeholder='3672'
                  defaultValue={3627}
                  error={errors.uuid ? true : false}
                  {...field}
                />
              )}
            />
          </FormControl>

          <Stack spacing={2} direction='row' alignItems='center'>
            <FormControl fullWidth>
              <Controller
                name='min'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    size='small'
                    type='number'
                    label='Minimum Amount'
                    variant='outlined'
                    placeholder='100'
                    defaultValue={100}
                    error={errors.min ? true : false}
                    {...field}
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth>
              <Controller
                name='max'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    size='small'
                    type='number'
                    label='Maximum Amount'
                    variant='outlined'
                    placeholder='900'
                    defaultValue={800}
                    error={errors.max ? true : false}
                    {...field}
                  />
                )}
              />
            </FormControl>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <LoadingButton loading={loading} onClick={handleSubmit(create)}>
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default AddAsset
