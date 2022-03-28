import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import plansActions from '../../redux/actions/plans'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PercentIcon from '@mui/icons-material/Percent'

type Props = {
  open: boolean
  onClose: () => void
  plan: {
    createdAt: string
    max: number
    min: number
    rfb: number
    roi: number
    title: string
    _id: string
    type: 'bot' | 'self'
  }
}

type InputFields = {
  title: string
  min: number
  max: number
  roi: number
  rfb: number
  type: 'bot' | 'self'
}

const schema = yup
  .object({
    title: yup.string().required(),
    min: yup.number().min(1).required(),
    max: yup.number().min(1).required(),
    roi: yup.number().min(1).required(),
    rfb: yup.number().min(1).required(),
    type: yup.string().required(),
  })
  .required()

const EditPlanDialog = ({ open, onClose, plan }: Props) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const { _updatePlan } = bindActionCreators(plansActions, dispatch)

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<InputFields>({ resolver: yupResolver(schema) })

  const update: SubmitHandler<InputFields> = async data => {
    setLoading(true)
    await _updatePlan(plan._id, data, () => onClose(), setLoading)
  }

  const loadData = () => {
    setValue('title', plan.title)
    setValue('min', plan.min)
    setValue('max', plan.max)
    setValue('roi', plan.roi)
    setValue('rfb', plan.rfb)
    setValue('type', plan.type)
  }

  useEffect(() => {
    loadData()

    //eslint-disable-next-line
  }, [plan])

  return (
    <Dialog
      open={open}
      maxWidth='xs'
      fullWidth
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'Edit Plan'}</DialogTitle>
      <DialogContent>
        <Stack mt={1} spacing={2.5}>
          <FormControl fullWidth>
            <Controller
              name='title'
              control={control}
              rules={{ required: true }}
              defaultValue={plan.title}
              render={({ field }) => (
                <TextField
                  fullWidth
                  size='small'
                  type='text'
                  label='Title'
                  variant='outlined'
                  placeholder='Plan Name'
                  error={errors.title ? true : false}
                  {...field}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              name='min'
              control={control}
              rules={{ required: true }}
              defaultValue={plan.min}
              render={({ field }) => (
                <TextField
                  fullWidth
                  size='small'
                  type='number'
                  label='Minimum Amount'
                  variant='outlined'
                  placeholder='1000'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
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
              defaultValue={plan.max}
              render={({ field }) => (
                <TextField
                  fullWidth
                  size='small'
                  type='number'
                  label='Maximum Amount'
                  variant='outlined'
                  placeholder='1000'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={errors.max ? true : false}
                  {...field}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              name='roi'
              control={control}
              rules={{ required: true }}
              defaultValue={plan.roi}
              render={({ field }) => (
                <TextField
                  fullWidth
                  size='small'
                  type='number'
                  label='Return Of Investment'
                  variant='outlined'
                  placeholder='20'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <PercentIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={errors.roi ? true : false}
                  {...field}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              name='rfb'
              control={control}
              rules={{ required: true }}
              defaultValue={plan.rfb}
              render={({ field }) => (
                <TextField
                  fullWidth
                  size='small'
                  type='number'
                  label='Referral Bonus'
                  variant='outlined'
                  placeholder='2'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <PercentIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={errors.rfb ? true : false}
                  {...field}
                />
              )}
            />
          </FormControl>

          <FormControl component='fieldset' error={errors.type ? true : false}>
            <FormLabel component='legend'>Plan Type</FormLabel>
            <Controller
              name='type'
              control={control}
              rules={{ required: true }}
              defaultValue={plan.type}
              render={({ field }) => (
                <RadioGroup row aria-label='type' {...field}>
                  <FormControlLabel
                    value='self'
                    control={<Radio />}
                    label='Self Trading'
                  />
                  <FormControlLabel
                    value='bot'
                    control={<Radio />}
                    label='Bot Trading'
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Discard
        </Button>
        <LoadingButton loading={loading} onClick={handleSubmit(update)}>
          Update
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default EditPlanDialog
