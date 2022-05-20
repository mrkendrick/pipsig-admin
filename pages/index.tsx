import { Box, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/orders')

    // eslint-disable-next-line
  }, [])

  return (
    <Box>
      <Head>
        <title>Pip Signal | Orders</title>
      </Head>
    </Box>
  )
}

export default Home
