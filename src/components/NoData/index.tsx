import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import NextImage from 'next/image'

const NoData = ({ text }: { text: string }) => {
  return (
    <Box
      position='absolute'
      top='50%'
      left='50%'
      sx={{ transform: 'translate(-50%, -50%)' }}
      alignItems='center'
      justifyContent='center'
      zIndex='1000'
    >
      <NextImage src='/images/nodata.svg' width='200px' height='200px' />
      <Typography align='center' variant='h5'>
        {text}
      </Typography>
    </Box>
  )
}

export default NoData
