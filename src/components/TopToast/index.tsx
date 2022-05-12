import { Box, Typography } from '@mui/material'
import { blue, green, red, yellow } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionTypes } from '../../redux/actions/types'
import { RootState } from '../../redux/reducers'
import { AlertVariant } from '../../redux/reducers/alert.reducer'

const info = blue[800],
  warn = yellow[900],
  success = green[800],
  error = red[700]

const TopToast = () => {
  const dispatch = useDispatch()
  const [toastOptions, setToastOptions] = useState({
    opacity: 0,
    height: '0px',
  })

  const { text, variant, id } = useSelector((state: RootState) => state.alert)

  useEffect(() => {
    id && text !== '' && setToastOptions({ height: '70px', opacity: 1 })

    id &&
      setTimeout(() => {
        setToastOptions({
          opacity: 0,
          height: '0px',
        })
        setTimeout(() => {
          dispatch({
            type: ActionTypes.alert,
            payload: { id: '', text: '', variant: AlertVariant.info },
          })
        }, 1000)
      }, 5000)

    return () => {}

    // eslint-disable-next-line
  }, [id])

  return (
    <Box
      width='100%'
      height={toastOptions.height}
      zIndex='99999'
      sx={{
        background:
          variant === AlertVariant.error
            ? error
            : variant === AlertVariant.warn
            ? warn
            : variant === AlertVariant.success
            ? success
            : info,
        transition: 'height ease 350ms',
      }}
      position='fixed'
      top='0px'
    >
      <Typography
        sx={{
          position: 'absolute',
          opacity: toastOptions.opacity,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          transition: 'opacity ease 300ms',
        }}
        fontSize='1.5rem'
        align='center'
        color='white'
      >
        {text}
      </Typography>
    </Box>
  )
}

export default TopToast
