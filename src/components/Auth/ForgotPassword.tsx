import { LoadingButton } from '@mui/lab'
import {
  Alert,
  AlertColor,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Box } from '@mui/system'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { useRouter } from 'next/dist/client/router'

type InputFields = {
  email: string
}

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required()

const ForgotPassword = () => {
  const [isLoading, setisLoading] = useState(false)
  const [alert, setAlert] = useState<{
    severity: AlertColor
    text: string
    state: boolean
  }>({
    severity: 'info',
    text: '',
    state: false,
  })
  const { user } = useSelector((state: RootState) => state.auth)
  const { replace, push } = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputFields>({ resolver: yupResolver(schema) })

  const afterSubmission = (status: boolean) => {
    setAlert({
      severity: status ? 'info' : 'error',
      text: status
        ? ' Password reset token sent. — check your email'
        : 'Something went wrong! — try again later',
      state: true,
    })

    setTimeout(() => {
      setAlert({ severity: 'info', text: '', state: false })
    }, 5000)
  }

  const submit: SubmitHandler<InputFields> = data => {
    setisLoading(true)
    console.log(data)
  }

  useEffect(() => {
    !!user._id && replace('/orders')

    //eslint-disable-next-line
  }, [])

  return (
    <>
      <Head>
        <title>Pip Signal | Forgot Password</title>
      </Head>
      <Container
        maxWidth='xs'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Box mb='3rem'>
          <Typography
            fontSize='1.9rem'
            align='center'
            variant='h1'
            fontWeight='bold'
            mb='0.8rem'
          >
            Forgot Password
          </Typography>
          <Typography
            align='center'
            color='text.secondary'
            fontWeight='500'
            fontSize='1rem'
          >
            Enter your email to revceive a reset token
          </Typography>
        </Box>

        <FormControl fullWidth sx={{ marginBottom: '1.5rem' }}>
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            defaultValue={''}
            render={({ field }) => (
              <TextField
                fullWidth
                size='small'
                type='email'
                label='Email'
                variant='outlined'
                placeholder='example@email.com'
                helperText="We'll never share your email"
                error={errors.email ? true : false}
                {...field}
              />
            )}
          />
        </FormControl>

        {isLoading ? (
          <LoadingButton loading size='large' fullWidth variant='contained'>
            Submit
          </LoadingButton>
        ) : (
          <Button
            size='large'
            fullWidth
            variant='contained'
            onClick={handleSubmit(submit)}
          >
            Submit
          </Button>
        )}

        {alert.state && (
          <Alert severity={alert.severity} sx={{ marginTop: '2rem' }}>
            {alert.text}
          </Alert>
        )}
      </Container>
    </>
  )
}

export default ForgotPassword
