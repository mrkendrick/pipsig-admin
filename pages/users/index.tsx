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
import { RootState } from '../../src/redux/reducers'
import { bindActionCreators } from 'redux'
import NoData from '../../src/components/NoData'
import { ceil } from 'lodash'
import usersActions from '../../src/redux/actions/users'
import UsersTable from '../../src/components/UsersTable'

const Users = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [resultsPerPage, setResultsPerPage] = useState(10)
  const postCount = useMemo(() => [10, 20, 30, 40, 50], [])
  const [loading, setLoading] = useState(false)
  const { users } = useSelector((state: RootState) => state.users)

  const { _getUsers } = bindActionCreators(usersActions, dispatch)

  const loadData = async () => {
    setLoading(true)

    await _getUsers({ page, limit: resultsPerPage }, setLoading)
  }

  useEffect(() => {
    loadData()

    // eslint-disable-next-line
  }, [resultsPerPage, page])

  return (
    <Box flex='3' position='relative'>
      <Head>
        <title>Pipsig | Users</title>
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
          Users
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
            count={ceil(users.totalCount / resultsPerPage)}
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
      {!loading && users.count === 0 && <NoData text='No Users' />}
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

      {!loading && users.count > 0 && <UsersTable />}
    </Box>
  )
}

export default Users
