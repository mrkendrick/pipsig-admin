import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import plansActions from '../../redux/actions/plans'

type Props = {
  open: boolean
  onClose: () => void
  id: string
}

const DeletePlanDialog = ({ open, onClose, id }: Props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const { _deletePlan } = bindActionCreators(plansActions, dispatch)

  const onDelete = async () => {
    setLoading(true)
    await _deletePlan(id, () => onClose(), setLoading)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'Delete Plan'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure? This action is irreversible
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton loading={loading} color='error' onClick={onDelete}>
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default DeletePlanDialog
