import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import accountActions from '../../redux/actions/account'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import NextImage from 'next/image'

type Props = {
  open: boolean
  onClose: () => void
  market: { id: string; image: string; name: string; symbol: string }[]
}

type InputFields = {
  symbol: string
  walletId: string
}

const schema = yup
  .object({
    symbol: yup.string().required(),
    walletId: yup.string().required(),
  })
  .required()

const AddAccountDialog = ({ open, onClose, market }: Props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const { _createAccount } = bindActionCreators(accountActions, dispatch)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputFields>({ resolver: yupResolver(schema) })

  const submit: SubmitHandler<InputFields> = async data => {
    const cryptoCurrency = market.find(m => m.symbol === data.symbol)
    const newAccount = {
      symbol: cryptoCurrency?.symbol,
      image: cryptoCurrency?.image,
      name: cryptoCurrency?.name,
      walletId: data.walletId,
    }

    setLoading(true)

    await _createAccount(newAccount, () => onClose(), setLoading)
  }

  return (
    <Dialog
      open={open}
      maxWidth='xs'
      fullWidth
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'Add Account'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <FormControl fullWidth error={errors.symbol ? true : false}>
            <InputLabel id='symbol-label'>Crypto Currency</InputLabel>
            <Controller
              name='symbol'
              control={control}
              rules={{ required: true }}
              defaultValue={market[0].symbol}
              render={({ field }) => (
                <Select
                  labelId='symbol-label'
                  id='demo-simple-select'
                  label='Crypto Currency'
                  {...field}
                >
                  {market.map(d => (
                    <MenuItem key={d.id} value={d.symbol}>
                      <Stack spacing={2} direction='row' alignItems='center'>
                        <NextImage
                          src={d.image}
                          width='20px'
                          height='20px'
                          layout='fixed'
                        />
                        <Typography>{d.name}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              name='walletId'
              control={control}
              rules={{ required: true }}
              defaultValue={''}
              render={({ field }) => (
                <TextField
                  fullWidth
                  size='medium'
                  type='text'
                  label='Wallet Address'
                  variant='outlined'
                  placeholder='1EERAqDvCAk86wQisQmud6oqejHaJ1Tvqu'
                  error={errors.walletId ? true : false}
                  {...field}
                />
              )}
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton onClick={handleSubmit(submit)} loading={loading}>
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default AddAccountDialog
