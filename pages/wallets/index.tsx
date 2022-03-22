import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import BufferAuth from '../../src/components/Auth/BufferAuth'
import { useDispatch, useSelector } from 'react-redux'
import { ceil } from 'lodash'
import { RootState } from '../../src/redux/reducers'
import NoData from '../../src/components/NoData'
import WalletsTable from '../../src/components/WalletsTable'
import { bindActionCreators } from 'redux'
import walletActions from '../../src/redux/actions/wallet'

const Wallets = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [resultsPerPage, setResultsPerPage] = useState(10)
  const postCount = useMemo(() => [10, 20, 30, 40, 50], [])
  const [loading, setLoading] = useState(false)
  const { wallets } = useSelector((state: RootState) => state.wallets)

  const { _getWallets } = bindActionCreators(walletActions, dispatch)

  const loadData = async () => {
    setLoading(true)
    await _getWallets({ page, limit: resultsPerPage }, setLoading)
  }

  useEffect(() => {
    loadData()

    // eslint-disable-next-line
  }, [resultsPerPage, page])

  return (
    <Box flex='3'>
      <Head>
        <title>Pipsig | Wallets</title>
      </Head>
      <BufferAuth />
      <Stack
        py={2}
        px={4}
        direction='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <Typography variant='h5' fontWeight='500'>
          Wallets
        </Typography>
        <Stack spacing={2} direction='row' alignItems='center'>
          <FormControl>
            <InputLabel id='demo-simple-select-label'>
              Results Per Page
            </InputLabel>
            <Select
              size='small'
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={resultsPerPage}
              label='Results Per Page'
              disabled={loading}
              onChange={e => setResultsPerPage(e.target.value as number)}
            >
              {postCount.map(count => (
                <MenuItem key={count} value={count}>
                  {count}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Pagination
            count={ceil(wallets.totalCount / resultsPerPage)}
            defaultPage={1}
            disabled={loading}
            page={page}
            onChange={(e, value) => setPage(value)}
            color='primary'
            variant='outlined'
            shape='rounded'
          />
        </Stack>
      </Stack>
      {!loading && wallets.count === 0 && <NoData text='No Wallets' />}
      {loading && (
        <Box
          position='absolute'
          top='50%'
          left='50%'
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          <CircularProgress />
        </Box>
      )}

      {!loading && wallets.count > 0 && <WalletsTable />}
    </Box>
  )
}

export default Wallets
