import React from 'react'
import { Stack, Typography, Link } from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'

const Logo = () => {
  return (
    <NextLink href='/orders' passHref>
      <Link underline='none'>
        <Stack direction='row' alignItems='center' spacing={1.2}>
          <Typography fontWeight='bold' fontSize='large' color='#fff'>
            Pip Signal
          </Typography>
        </Stack>
      </Link>
    </NextLink>
  )
}

export default Logo
