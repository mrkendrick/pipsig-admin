import {
  Box,
  CircularProgress,
  Fab,
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
import { ceil } from 'lodash'
import { bindActionCreators } from 'redux'
import newsActions from '../../src/redux/actions/news'
import { useDispatch, useSelector } from 'react-redux'
import NoData from '../../src/components/NoData'
import { RootState } from '../../src/redux/reducers'
import NewsTable from '../../src/components/NewsTable'
import AddIcon from '@mui/icons-material/Add'
import CreateNews from '../../src/components/CreateNews'

const News = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [resultsPerPage, setResultsPerPage] = useState(10)
  const postCount = useMemo(() => [10, 20, 30, 40, 50], [])
  const [loading, setLoading] = useState(false)
  const { news } = useSelector((state: RootState) => state.news)

  const { _getNews } = bindActionCreators(newsActions, dispatch)

  const loadData = async () => {
    setLoading(true)

    await _getNews({ page, limit: resultsPerPage }, setLoading)
  }

  useEffect(() => {
    loadData()

    // eslint-disable-next-line
  }, [resultsPerPage, page])

  return (
    <Box flex='3' position='relative'>
      <Head>
        <title>Pipsig | News</title>
      </Head>
      <BufferAuth />

      <Fab
        onClick={() => setIsOpen(true)}
        // disabled={isFetchingWallet || !user.kycVerified}
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

      <CreateNews isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <Stack
        py={2}
        px={4}
        direction='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <Typography variant='h5' fontWeight='500'>
          News
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
            count={ceil(news.totalCount / resultsPerPage)}
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

      {!loading && news.count === 0 && <NoData text='No News' />}

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

      {!loading && news.count > 0 && <NewsTable />}
    </Box>
  )
}

export default News
