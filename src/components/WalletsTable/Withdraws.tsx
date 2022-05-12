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
  Tooltip,
} from '@mui/material'
import { reverse, sortBy, truncate } from 'lodash'
import React, { MouseEvent, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import walletActions from '../../redux/actions/wallet'
import { RootState } from '../../redux/reducers'
import HelperServices from '../../utils/helpers'
import NoData from '../NoData'
import CheckIcon from '@mui/icons-material/Check'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import { Wallet } from '../../redux/reducers/wallet.reducer'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

type Props = {
  closeDialog: () => void
}

const Withdraws = ({ closeDialog }: Props) => {
  const dispatch = useDispatch()
  const [selectedId, setSelectedId] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { _updateWallet } = bindActionCreators(walletActions, dispatch)
  const { wallet } = useSelector((state: RootState) => state.wallets)

  const reversedData = useMemo(() => {
    return reverse(sortBy(wallet.withdrawHistory, d => d.date))

    // eslint-disable-next-line
  }, [wallet.withdrawHistory])

  const open = Boolean(anchorEl)

  const handleClick = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    setSelectedId(id)
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const onApprove = async (id: string, amount: number) => {
    handleClose()
    closeDialog()

    const data: Wallet = {
      ...wallet,
      totalBalance: wallet.totalBalance - amount,
      fundingWallet: {
        ...wallet.fundingWallet,
        balance: wallet.fundingWallet.balance - amount,
        percentageChange:
          ((wallet.fundingWallet.balance - amount) /
            (wallet.fundingWallet.balance + wallet.fundingWallet.balance)) *
          100,
      },
      withdrawHistory: [...wallet.withdrawHistory.filter(d => d._id !== id)],
    }

    await _updateWallet(wallet._id, data)
  }

  const onDelete = async (id: string) => {
    handleClose()
    closeDialog()

    const data: Wallet = {
      ...wallet,
      withdrawHistory: [...wallet.withdrawHistory.filter(d => d._id !== id)],
    }

    await _updateWallet(wallet._id, data)
  }

  const onCopy = async (walletId: string) => {
    await HelperServices.copyToClipboard(walletId)
  }

  return (
    <Box height='100%' position='relative'>
      <Typography variant='h5'>Withdraws</Typography>
      {wallet.withdrawHistory.length === 0 && <NoData text='No Withdraws' />}

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
                  <TableCell align='center'>Comment</TableCell>
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
                      <Tooltip title={d.comment}>
                        <Typography>
                          {truncate(d.comment, { length: 15 })}
                        </Typography>
                      </Tooltip>
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
                        <MenuItem onClick={() => onCopy(d.walletAddress)}>
                          <ListItemIcon>
                            <ContentCopyIcon color='info' />
                          </ListItemIcon>
                          <ListItemText>Copy Address</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => onApprove(d._id, d.amount)}>
                          <ListItemIcon>
                            <CheckIcon color='success' />
                          </ListItemIcon>
                          <ListItemText>Approve</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => onDelete(d._id)}>
                          <ListItemIcon>
                            <DeleteIcon color='error' />
                          </ListItemIcon>
                          <ListItemText>Delete</ListItemText>
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

export default Withdraws
