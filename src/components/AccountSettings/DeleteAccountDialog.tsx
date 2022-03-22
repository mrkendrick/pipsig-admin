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
import accountActions from '../../redux/actions/account'

type Props = {
  open: boolean
  onClose: () => void
  id: string
}

const DeleteAccountDialog = ({ open, onClose, id }: Props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const { _deleteAccount } = bindActionCreators(accountActions, dispatch)

  const onDelete = async () => {
    setLoading(true)
    await _deleteAccount(id, () => onClose(), setLoading)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'Delete Account'}</DialogTitle>
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

export default DeleteAccountDialog
