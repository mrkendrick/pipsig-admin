import {
  Container,
  Typography,
  Box,
  FormControl,
  TextField,
  Button,
  Stack,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import React, { useState, MouseEvent, useEffect } from 'react'
import NextLink from 'next/link'
import Head from 'next/head'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { bindActionCreators } from 'redux'
import authActions from '../../redux/actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/dist/client/router'
import { RootState } from '../../redux/reducers'
import HelperServices from '../../utils/helpers'

type InputFields = {
  name: string
  email: string
  password: string
}

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required()

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { user } = useSelector((state: RootState) => state.auth)
  const { replace, push } = useRouter()
  const dispatch = useDispatch()

  const { _signup } = bindActionCreators(authActions, dispatch)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputFields>({ resolver: yupResolver(schema) })

  const signup: SubmitHandler<InputFields> = async data => {
    setIsLoading(true)

    await _signup(
      { ...data, referreeCode: HelperServices.storage({ method: 'get' })! },
      () => {
        HelperServices.storage({ method: 'del' })
        push('/auth?type=login')
      },
      setIsLoading,
    )
  }

  const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) =>
    e.preventDefault()

  useEffect(() => {
    !!user._id && replace('/orders')

    //eslint-disable-next-line
  }, [])

  return (
    <>
      <Head>
        <title>Pipsig | Get Started</title>
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
            Get Started with Pipsig
          </Typography>
          <Typography
            align='center'
            color='text.secondary'
            fontWeight='500'
            fontSize='1rem'
          >
            Create a new account
          </Typography>
        </Box>

        <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            defaultValue={''}
            render={({ field }) => (
              <TextField
                fullWidth
                size='small'
                type='text'
                label='Name'
                variant='outlined'
                placeholder='Full Name'
                error={errors.name ? true : false}
                {...field}
              />
            )}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
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
                error={errors.email ? true : false}
                {...field}
              />
            )}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
          <Controller
            name='password'
            control={control}
            rules={{ required: true }}
            defaultValue={''}
            render={({ field }) => (
              <TextField
                fullWidth
                size='small'
                type={showPassword ? 'text' : 'password'}
                placeholder='*********'
                helperText='Must be greater than eight characters'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                        size='small'
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label='Password'
                error={errors.password ? true : false}
                {...field}
              />
            )}
          />
        </FormControl>

        {isLoading ? (
          <LoadingButton loading size='large' fullWidth variant='contained'>
            Signup
          </LoadingButton>
        ) : (
          <Button
            size='large'
            fullWidth
            variant='contained'
            onClick={handleSubmit(signup)}
          >
            Signup
          </Button>
        )}

        <Stack
          mt='1.5rem'
          paddingX='2rem'
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <NextLink href='/auth?type=forgotPassword' passHref>
            <Link
              fontWeight='600'
              fontSize='small'
              color='text.primary'
              underline='none'
            >
              Forgot password?
            </Link>
          </NextLink>
          <NextLink href='/auth?type=login' passHref>
            <Link
              fontWeight='600'
              fontSize='small'
              color='text.primary'
              underline='none'
            >
              Login
            </Link>
          </NextLink>
        </Stack>
      </Container>
    </>
  )
}

export default Signup
