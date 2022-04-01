import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
  FormControl,
  TextField,
  FormControlLabel,
  Checkbox,
  Stack,
  Alert,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { bindActionCreators } from 'redux'
import { nftActions } from '../../redux/actions/nft'
import { useDispatch } from 'react-redux'
import { LoadingButton } from '@mui/lab'

type Props = {
  onClose: () => void
  isOpen: boolean
}

type InputFields = {
  name: string
}

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required()

const AddCollection = ({ onClose, isOpen }: Props) => {
  const dispatch = useDispatch()
  const [isValid, setIsValid] = useState({ state: false, alert: '' })
  const [isvalidating, setIsvalidating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(true)

  const { _validate, _createCollection } = bindActionCreators(
    nftActions,
    dispatch,
  )

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<InputFields>({ resolver: yupResolver(schema) })

  const validate: SubmitHandler<InputFields> = async data => {
    setIsvalidating(true)

    const callback = (isValid: boolean) => {
      if (isValid) {
        setIsValid({ state: true, alert: `${data.name} collection is valid` })
        setTimeout(() => {
          setIsValid({ state: true, alert: '' })
        }, 5000)
      } else {
        setIsValid({ state: false, alert: `${data.name} has incomplete data` })
        setTimeout(() => {
          setIsValid({ state: false, alert: '' })
        }, 5000)
      }
    }

    await _validate(data.name, callback, setIsvalidating)
  }

  const create: SubmitHandler<InputFields> = async data => {
    setLoading(true)
    const collection = { ...data, isVerified: isChecked }
    await _createCollection(collection, () => onClose(), setLoading)
  }

  useEffect(() => {
    if (isOpen) {
      setValue('name', '')
      setIsValid({
        state: false,
        alert: '',
      })
    }

    // eslint-disable-next-line
  }, [isOpen])

  return (
    <Dialog fullWidth maxWidth='xs' onClose={onClose} open={isOpen}>
      <DialogTitle>Create Collection</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <FormControl sx={{ marginTop: 1 }} fullWidth>
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              defaultValue={''}
              render={({ field }) => (
                <TextField
                  fullWidth
                  size='small'
                  type='text'
                  label='Collection Slug'
                  variant='outlined'
                  placeholder='cryptopunks'
                  error={errors.name ? true : false}
                  {...field}
                />
              )}
            />
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked}
                onChange={e => setIsChecked(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label='Verify Collection'
          />

          {isValid.alert !== '' && (
            <Alert severity={isValid.state ? 'success' : 'error'}>
              {isValid.alert}
            </Alert>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton loading={isvalidating} onClick={handleSubmit(validate)}>
          Validate
        </LoadingButton>
        <LoadingButton
          loading={loading}
          disabled={!isValid.state}
          onClick={handleSubmit(create)}
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default AddCollection
