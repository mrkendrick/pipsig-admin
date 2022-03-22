import { Typography } from '@mui/material'
import { blue, yellow, green, red } from '@mui/material/colors'
import React from 'react'

type Props = {
  text: string
  variant: 'success' | 'warn' | 'error' | 'info'
}

const Tag = ({ text, variant }: Props) => {
  return (
    <Typography
      fontWeight='500'
      fontSize='small'
      sx={{
        background:
          variant === 'warn'
            ? yellow[200]
            : variant === 'info'
            ? blue[100]
            : variant === 'success'
            ? green[100]
            : red[100],
        borderRadius: '3px',
      }}
      color={
        variant === 'warn'
          ? yellow[900]
          : variant === 'info'
          ? blue[900]
          : variant === 'success'
          ? green[900]
          : red[900]
      }
    >
      {text.toUpperCase()}
    </Typography>
  )
}

export default Tag
