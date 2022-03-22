import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Slide,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { Box } from '@mui/system'
import { truncate } from 'lodash'
import React, { forwardRef, Ref, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import orderActions from '../../../redux/actions/orders'
import { RootState } from '../../../redux/reducers'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { LoadingButton } from '@mui/lab'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

type Props = {
  open: boolean
  onClose: () => void
  id: string
}

type InputFields = {
  total: number
  status: 'pending' | 'active' | 'cancelled' | 'closed'
}

const schema = yup
  .object({
    total: yup.number().required(),
    status: yup.string().required(),
  })
  .required()

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const EditOrder = ({ open, onClose, id }: Props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const { order } = useSelector((state: RootState) => state.orders)
  const { _getOrder, _updateOrder } = bindActionCreators(orderActions, dispatch)

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<InputFields>({ resolver: yupResolver(schema) })

  const update: SubmitHandler<InputFields> = async data => {
    setIsUpdating(true)
    await _updateOrder(order._id, data, onClose, setIsUpdating)
  }

  const increment = () => {
    const changeValue = order.amount * (order.plan.roi / 100)
    const currentValue = getValues('total')
    setValue('total', currentValue + changeValue)
  }

  const decrement = () => {
    const changeValue = order.amount * (order.plan.roi / 100)
    const currentValue = getValues('total')
    setValue('total', currentValue - changeValue)
  }

  useMemo(() => {
    if (id === order._id && open) {
      setValue('total', order.total)
      setValue('status', order.status)
    }

    //eslint-disable-next-line
  }, [id, order])

  const loadData = async () => {
    if (open) {
      setLoading(true)
      await _getOrder(id, setLoading)
    }
  }

  useEffect(() => {
    loadData()

    // eslint-disable-next-line
  }, [id])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      TransitionComponent={Transition}
      fullWidth
      maxWidth='xs'
    >
      <DialogTitle id='alert-dialog-title'>
        Edit Order {truncate(id, { length: 15 })}
      </DialogTitle>
      <DialogContent
        sx={{
          transition: 'all ease 300ms',
          position: 'relative',
          minHeight: '100px',
        }}
      >
        {loading && (
          <CircularProgress
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            size={30}
          />
        )}

        {!loading && order._id !== id && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography variant='body1'>Order Unavailable</Typography>
          </Box>
        )}

        {!loading && order._id === id && (
          <Stack spacing={3}>
            <Stack spacing={1} direction='row' alignItems='center'>
              <Typography>{order.plan.title}</Typography>
              <Typography fontWeight='500' color='text.secondary'>
                USD {order.amount.toLocaleString()}
              </Typography>
            </Stack>

            <Stack direction='row' alignItems='center' spacing={1}>
              <FormControl fullWidth>
                <Controller
                  name='total'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={order.total}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      size='medium'
                      type='number'
                      label='Total'
                      variant='outlined'
                      placeholder='1000'
                      error={errors.total ? true : false}
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <Stack>
                <IconButton aria-label='increase' onClick={increment}>
                  <KeyboardArrowUpIcon color='success' />
                </IconButton>
                <IconButton aria-label='decrease' onClick={decrement}>
                  <KeyboardArrowDownIcon color='error' />
                </IconButton>
              </Stack>
            </Stack>

            <FormControl
              component='fieldset'
              error={errors.status ? true : false}
            >
              <FormLabel component='legend'>Status</FormLabel>
              <Controller
                name='status'
                control={control}
                rules={{ required: true }}
                defaultValue={order.status}
                render={({ field }) => (
                  <RadioGroup row aria-label='status' {...field}>
                    <FormControlLabel
                      value='active'
                      control={<Radio />}
                      label='Active'
                    />
                    <FormControlLabel
                      value='pending'
                      control={<Radio />}
                      label='Pending'
                    />
                    <FormControlLabel
                      value='cancelled'
                      control={<Radio />}
                      label='Cancelled'
                    />
                    <FormControlLabel
                      value='closed'
                      control={<Radio />}
                      label='Close'
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Discard</Button>
        <LoadingButton loading={isUpdating} onClick={handleSubmit(update)}>
          Update
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default EditOrder
