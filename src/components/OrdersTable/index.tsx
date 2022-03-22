import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import HelperServices from '../../utils/helpers'
import { reverse, sortBy, truncate } from 'lodash'
import Tag from '../Tag'
import { grey } from '@mui/material/colors'
import EditOrder from './EditOrder'

const OrdersTable = () => {
  const { orders } = useSelector((state: RootState) => state.orders)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [orderId, setOrderId] = useState('')

  const reversedData = useMemo(() => {
    return reverse(sortBy(orders.data, d => d.createdAt))

    // eslint-disable-next-line
  }, [orders.data])

  return (
    <>
      <EditOrder
        id={orderId}
        open={isEditOpen}
        onClose={() => {
          setIsEditOpen(false)
        }}
      />
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label='orders table'>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align='center'>Trading Plan</TableCell>
              <TableCell align='center'>Category</TableCell>
              <TableCell align='center'>Amount&nbsp;(USD)</TableCell>
              <TableCell align='center'>Total&nbsp;(USD)</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reversedData.map(d => (
              <TableRow
                key={d._id}
                onClick={() => {
                  setOrderId(d._id)
                  setIsEditOpen(true)
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
                <TableCell align='center'>{d.plan.title}</TableCell>
                <TableCell align='center'>
                  {d.category === 'crypto'
                    ? 'Crypto Currency'
                    : d.category === 'stock'
                    ? 'Stock Market'
                    : d.category === 'nft'
                    ? 'Non-Fungible Token'
                    : 'Forex Market'}
                </TableCell>
                <TableCell align='center'>
                  {d.amount.toLocaleString()}
                </TableCell>
                <TableCell align='center'>{d.total.toLocaleString()}</TableCell>
                <TableCell align='center'>
                  <Tag
                    text={d.status}
                    variant={
                      d.status === 'pending'
                        ? 'warn'
                        : d.status === 'active'
                        ? 'info'
                        : 'error'
                    }
                  />
                </TableCell>
                <TableCell align='center'>{d.user.name}</TableCell>
                <TableCell align='center'>{d.user.email}</TableCell>
                <TableCell align='center'>
                  <Typography fontSize='small'>
                    {HelperServices.formatDate(d.createdAt, 'DD-MMM-YY')}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default OrdersTable
