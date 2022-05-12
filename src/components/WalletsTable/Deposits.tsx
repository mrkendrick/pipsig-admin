import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Fade,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import React, { MouseEvent, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import HelperServices from '../../utils/helpers'
import { reverse, sortBy } from 'lodash'
import CheckIcon from '@mui/icons-material/Check'
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import { Status, Wallet } from '../../redux/reducers/wallet.reducer'
import { bindActionCreators } from 'redux'
import walletActions from '../../redux/actions/wallet'
import Tag from '../Tag'
import NoData from '../NoData'

const Deposits = () => {
  const dispatch = useDispatch()
  const { wallet } = useSelector((state: RootState) => state.wallets)
  const [selectedId, setSelectedId] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { _updateWallet } = bindActionCreators(walletActions, dispatch)

  const open = Boolean(anchorEl)

  const reversedData = useMemo(() => {
    return reverse(sortBy(wallet.depositHistory, d => d.date))

    // eslint-disable-next-line
  }, [wallet.depositHistory])

  const handleClick = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    setSelectedId(id)
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const onConfirm = async (id: string, amount: number) => {
    handleClose()

    const data: Wallet = {
      ...wallet,
      totalBalance: wallet.totalBalance + Number(amount),
      fundingWallet: {
        ...wallet.fundingWallet,
        balance: wallet.fundingWallet.balance + Number(amount),
        percentageChange:
          ((wallet.fundingWallet.balance - Number(amount)) /
            (wallet.fundingWallet.balance + Number(amount))) *
          100,
      },
      depositHistory: [
        ...wallet.depositHistory.map(dep =>
          dep._id === id ? { ...dep, status: Status.confirmed } : dep,
        ),
      ],
    }

    await _updateWallet(wallet._id, data)
  }

  const onCancel = async (id: string) => {
    handleClose()

    const data: Wallet = {
      ...wallet,
      depositHistory: [
        ...wallet.depositHistory.map(dep =>
          dep._id === id ? { ...dep, status: Status.cancelled } : dep,
        ),
      ],
    }

    await _updateWallet(wallet._id, data)
  }

  return (
    <Box height='100%' position='relative'>
      <Typography variant='h5'>Deposits</Typography>
      {wallet.depositHistory.length === 0 && <NoData text='No Deposits' />}

      {wallet.depositHistory.length > 0 && (
        <Box mt={2}>
          <TableContainer component={Paper}>
            <Table
              size='small'
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label='verification table'
            >
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell align='center'>Crypto Currency</TableCell>
                  <TableCell align='center'>Wallet Address</TableCell>
                  <TableCell align='center'>Amount (USD)</TableCell>
                  <TableCell align='center'>Status</TableCell>
                  <TableCell align='center'>Date</TableCell>
                  <TableCell align='center'>Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reversedData.map(d => (
                  <TableRow
                    key={d._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      transition: 'all ease-in-out 300ms',
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      {d._id}
                    </TableCell>
                    <TableCell align='center'>{d.coin}</TableCell>
                    <TableCell align='center'>{d.walletAddress}</TableCell>
                    <TableCell align='center'>
                      {d.amount.toLocaleString()}
                    </TableCell>
                    <TableCell align='center'>
                      <Tag
                        text={d.status}
                        variant={
                          d.status === Status.pending
                            ? 'warn'
                            : d.status === Status.confirmed
                            ? 'info'
                            : 'error'
                        }
                      />
                    </TableCell>
                    <TableCell align='center'>
                      {HelperServices.dateFromNow(d.date)}
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton onClick={e => handleClick(e, d._id)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id='table-menu'
                        anchorEl={anchorEl}
                        elevation={2}
                        open={open && selectedId === d._id}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                        TransitionComponent={Fade}
                      >
                        <MenuItem
                          disabled={d.status === Status.confirmed}
                          onClick={() => onConfirm(d._id, d.amount)}
                        >
                          <ListItemIcon>
                            <CheckIcon color='success' />
                          </ListItemIcon>
                          <ListItemText>Confirm</ListItemText>
                        </MenuItem>
                        <MenuItem
                          disabled={d.status === Status.cancelled}
                          onClick={() => onCancel(d._id)}
                        >
                          <ListItemIcon>
                            <DoDisturbIcon color='error' />
                          </ListItemIcon>
                          <ListItemText>Cancel</ListItemText>
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  )
}

export default Deposits
