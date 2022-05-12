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
import { Asset } from '../../redux/reducers/nft.reducer'

type Props = {
  isOpen: boolean
  onClose: () => void
  collectionId: string
  asset: Asset
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

const EditAsset = ({ isOpen, onClose, collectionId, asset }: Props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const { _editAsset } = bindActionCreators(nftActions, dispatch)

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<InputFields>({ resolver: yupResolver(schema) })

  const update: SubmitHandler<InputFields> = async data => {
    setLoading(true)
    _editAsset(
      { asset: asset._id, collection: collectionId, data },
      () => onClose(),
      setLoading,
    )
  }

  useEffect(() => {
    if (isOpen) {
      setValue('image', asset.image)
      setValue('uuid', asset.uuid)
      setValue('min', asset.min)
      setValue('max', asset.max)
    }

    // eslint-disable-next-line
  }, [isOpen])

  return (
    <Dialog fullWidth maxWidth='xs' onClose={onClose} open={isOpen}>
      <DialogTitle>Edit Asset</DialogTitle>
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
                  defaultValue={asset.image}
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
                  defaultValue={asset.uuid}
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
                    defaultValue={asset.min}
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
                    defaultValue={asset.max}
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

        <LoadingButton loading={loading} onClick={handleSubmit(update)}>
          Update
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default EditAsset
