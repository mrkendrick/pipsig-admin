import React, { useEffect, useMemo, useState } from 'react'
import {
  Avatar,
  Box,
  CircularProgress,
  Fab,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import NoData from '../NoData'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { bindActionCreators } from 'redux'
import accountActions from '../../redux/actions/account'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { truncate } from 'lodash'
import DeleteAccountDialog from './DeleteAccountDialog'
import AddAccountDialog from './AddAccountDialog'
import EditAccountDialog from './EditAccountDialog'

type Props = {
  market: { id: string; image: string; name: string; symbol: string }[]
}

const AccountSettings = ({ market }: Props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false)
  const [seletedId, setSeletedId] = useState('')
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)
  const [isEditAccountOpen, setIsEditAccountOpen] = useState(false)
  const [account, setAccount] = useState<{
    _id: string
    image: string
    walletId: string
    name: string
    symbol: string
    createdAt: string
  }>({ _id: '', image: '', walletId: '', name: '', symbol: '', createdAt: '' })
  const { authLoading } = useSelector((state: RootState) => state.auth)
  const { accounts } = useSelector((state: RootState) => state.accounts)

  const { _getAccounts } = bindActionCreators(accountActions, dispatch)

  const onDeleteClick = (id: string) => {
    setSeletedId(id)
    setIsDeleteAccountOpen(true)
  }

  const onEditClick = (account: {
    _id: string
    image: string
    walletId: string
    name: string
    symbol: string
    createdAt: string
  }) => {
    setIsEditAccountOpen(true)
    setAccount(account)
  }

  const loadData = async () => {
    setLoading(true)
    await _getAccounts(setLoading)
  }
  useEffect(() => {
    loadData()

    // eslint-disable-next-line
  }, [])

  return (
    <Box position='relative' height='100%'>
      <AddAccountDialog
        open={isAddAccountOpen}
        onClose={() => setIsAddAccountOpen(false)}
        market={market}
      />
      {loading && !authLoading && (
        <Box
          position='absolute'
          top='50%'
          left='50%'
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          <CircularProgress />
        </Box>
      )}

      {!loading && !accounts.length && <NoData text='No Accounts' />}

      <Fab
        onClick={() => setIsAddAccountOpen(true)}
        size='medium'
        sx={{
          position: 'fixed',
          bottom: '15px',
          right: '15px',
          zIndex: 10,
          transition: 'all ease 300ms',
          '&:hover': {
            transform: 'rotate(90deg)',
          },
        }}
        color='primary'
        aria-label='add'
      >
        <AddIcon />
      </Fab>

      {!loading && accounts.length > 0 && (
        <>
          <DeleteAccountDialog
            id={seletedId}
            open={isDeleteAccountOpen}
            onClose={() => setIsDeleteAccountOpen(false)}
          />

          <EditAccountDialog
            open={isEditAccountOpen}
            onClose={() => setIsEditAccountOpen(false)}
            market={market}
            account={account}
          />

          <Grid p={2} container columnSpacing={4} rowSpacing={6}>
            {accounts.map(account => (
              <Grid key={account._id} item xs={12} sm={6} md={3}>
                <Stack
                  boxShadow={2}
                  borderRadius='5px'
                  p={3}
                  direction='row'
                  alignItems='center'
                  justifyContent='space-evenly'
                >
                  <IconButton onClick={() => onEditClick(account)} color='info'>
                    <EditIcon />
                  </IconButton>
                  <Stack spacing={1} alignItems='center'>
                    <Avatar
                      sx={{ width: 70, height: 70 }}
                      src={account.image}
                      alt={account.name}
                    />
                    <Typography fontWeight='500'>{account.name}</Typography>
                    <Typography>
                      {truncate(account.walletId, { length: 15 })}
                    </Typography>
                  </Stack>
                  <IconButton
                    onClick={() => onDeleteClick(account._id)}
                    color='error'
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  )
}

export default AccountSettings
