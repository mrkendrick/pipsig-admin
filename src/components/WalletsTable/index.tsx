import React, { useState } from 'react'
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { RootState } from '../../redux/reducers'
import { useSelector } from 'react-redux'
import { truncate } from 'lodash'
import WalletDialog from './WalletDialog'
import { Status } from '../../redux/reducers/wallet.reducer'

const WalletsTable = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [id, setId] = useState('')
  const { wallets } = useSelector((state: RootState) => state.wallets)

  return (
    <>
      <WalletDialog open={isOpen} onClose={() => setIsOpen(false)} id={id} />
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
              <TableCell align='center'>Owner</TableCell>
              <TableCell align='center'>Total (USD)</TableCell>
              <TableCell align='center'>Spot Wallet (USD)</TableCell>
              <TableCell align='center'>Funding Wallet (USD)</TableCell>
              <TableCell align='center'>Deposits (pending)</TableCell>
              <TableCell align='center'>Withdraws (pending)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wallets.data.map(d => (
              <TableRow
                key={d._id}
                onClick={() => {
                  setId(d._id)
                  setIsOpen(true)
                }}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  transition: 'all ease-in-out 300ms',
                  '&:hover': {
                    background: grey[100],
                    cursor: 'pointer',
                  },
                }}
              >
                <TableCell component='th' scope='row'>
                  {truncate(d._id, { length: 10 })}
                </TableCell>
                <TableCell align='center'>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Avatar
                      sx={{ width: 30, height: 30 }}
                      alt={d.user.name}
                      src={d.user.photo}
                    />
                    <Typography>{d.user.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align='center'>
                  {d.totalBalance.toLocaleString()}
                </TableCell>
                <TableCell align='center'>
                  {d.spotWallet.balance.toLocaleString()}
                </TableCell>
                <TableCell align='center'>
                  {d.fundingWallet.balance.toLocaleString()}
                </TableCell>
                <TableCell align='center'>
                  {
                    d.depositHistory.filter(
                      dep => dep.status === Status.pending,
                    ).length
                  }
                </TableCell>
                <TableCell align='center'>{d.withdrawHistory.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default WalletsTable
