import {
  Table,
  TableContainer,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Stack,
  Avatar,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import VerifiedIcon from '@mui/icons-material/Verified'
import { blue, grey } from '@mui/material/colors'
import { round } from 'lodash'
import CollectionDialog from '../CollectionDialog'
import { bindActionCreators } from 'redux'
import { nftActions } from '../../redux/actions/nft'

const CollectionTable = () => {
  const dispatch = useDispatch()
  const { collections } = useSelector((state: RootState) => state.nfts)
  const [isOpen, setIsOpen] = useState(false)
  const { _getCollection } = bindActionCreators(nftActions, dispatch)

  const onOpen = (id: string) => {
    _getCollection(id)
    setIsOpen(true)
  }

  return (
    <TableContainer>
      <CollectionDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Collection</TableCell>
            <TableCell align='right'>Volume ETH</TableCell>
            <TableCell align='right'>24h</TableCell>
            <TableCell align='right'>7d</TableCell>
            <TableCell align='right'>Floor Price ETH</TableCell>
            <TableCell align='right'>Owners</TableCell>
            <TableCell align='right'>Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {collections.data.map(collection => (
            <TableRow
              onClick={() => onOpen(collection._id)}
              key={collection._id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                transition: 'all ease 300ms',
                '&:hover': { cursor: 'pointer', background: grey[100] },
              }}
            >
              <TableCell component='th' scope='row'>
                <Stack spacing={2} direction='row' alignItems='center'>
                  <Avatar alt={collection.name} src={collection.image} />
                  <Stack spacing={1} direction='row' alignItems='center'>
                    <Typography fontWeight='600'>{collection.name}</Typography>
                    {collection.isVerified && (
                      <VerifiedIcon
                        sx={{ color: blue[700] }}
                        fontSize='small'
                      />
                    )}
                  </Stack>
                </Stack>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='subtitle2'>
                  {round(collection.totalVolume / 1000, 2)}k
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography
                  sx={{
                    color: collection['24hChange'] <= 0 ? '#f52525' : '#01aa78',
                  }}
                  variant='subtitle2'
                >
                  {(collection['24hChange'] * 100).toLocaleString()}%
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography
                  sx={{
                    color: collection['7dChange'] <= 0 ? '#f52525' : '#01aa78',
                  }}
                  variant='subtitle2'
                >
                  {(collection['7dChange'] * 100).toLocaleString()}%
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='subtitle2'>
                  {collection.floorPrice}
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='subtitle2'>
                  {round(collection.owners / 1000, 1)}k
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='subtitle2'>
                  {round(collection.totalSupply / 1000, 1)}k
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CollectionTable
