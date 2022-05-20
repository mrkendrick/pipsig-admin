import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { ceil } from 'lodash'
import Head from 'next/head'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import BufferAuth from '../../src/components/Auth/BufferAuth'
import NoData from '../../src/components/NoData'
import { nftActions } from '../../src/redux/actions/nft'
import { RootState } from '../../src/redux/reducers'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import AddCollection from '../../src/components/AddCollection'
import CollectionTable from '../../src/components/CollectionTable'

const Nfts = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [resultsPerPage, setResultsPerPage] = useState(10)
  const postCount = useMemo(() => [10, 20, 30, 40, 50], [])
  const [loading, setLoading] = useState(false)
  const [isAddCollectionOpen, setisAddCollectionOpen] = useState(false)
  const { collections } = useSelector((state: RootState) => state.nfts)

  const { _getCollections } = bindActionCreators(nftActions, dispatch)

  const loadData = async () => {
    setLoading(true)

    await _getCollections({ page, limit: resultsPerPage }, setLoading)
  }

  useEffect(() => {
    loadData()

    // eslint-disable-next-line
  }, [resultsPerPage, page])

  return (
    <Box flex='3' position='relative'>
      <Head>
        <title>Pip Signal | Nfts</title>
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
          Collections
        </Typography>
        <Stack spacing={2} direction='row' alignItems='center'>
          <Button
            onClick={() => setisAddCollectionOpen(true)}
            variant='contained'
            startIcon={<AddRoundedIcon />}
          >
            Add Collection
          </Button>
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
            count={ceil(collections.totalCount / resultsPerPage)}
            disabled={loading}
            page={page}
            onChange={(e, value) => setPage(value)}
            color='primary'
            variant='outlined'
            shape='rounded'
          />
        </Stack>
      </Stack>

      <AddCollection
        isOpen={isAddCollectionOpen}
        onClose={() => setisAddCollectionOpen(false)}
      />

      {!loading && collections.count === 0 && <NoData text='No Collection' />}
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

      {!loading && collections.count > 0 && <CollectionTable />}
    </Box>
  )
}

export default Nfts
