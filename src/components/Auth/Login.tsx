import {
  Container,
  Typography,
  Box,
  FormControl,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Stack,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import React, { MouseEvent, useEffect, useState } from 'react'
import NextLink from 'next/link'
import Head from 'next/head'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import authActions from '../../redux/actions/auth'
import { useRouter } from 'next/dist/client/router'
import { RootState } from '../../redux/reducers'

type InputFields = {
  username: string
  password: string
}

const schema = yup
  .object({
    username: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required()

const Login = () => {
  const [isLoading, setisLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [checked, setChecked] = useState(true)
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const { replace } = useRouter()

  const { _login } = bindActionCreators(authActions, dispatch)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputFields>({ resolver: yupResolver(schema) })

  const login: SubmitHandler<InputFields> = async data => {
    setisLoading(true)

    await _login(
      { ...data, saveInCookie: checked },
      () => {
        replace('/orders')
      },
      setisLoading,
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
        <title>Pip Signal | Login</title>
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
            Login to Pip Signal
          </Typography>
          <Typography
            align='center'
            color='text.secondary'
            fontWeight='500'
            fontSize='1rem'
          >
            Enter your login credentials
          </Typography>
        </Box>

        <FormControl fullWidth sx={{ marginBottom: '1.5rem' }}>
          <Controller
            name='username'
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
                error={errors.username ? true : false}
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
                label='Password'
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
                variant='outlined'
                placeholder='*********'
                error={errors.password ? true : false}
                {...field}
              />
            )}
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
          <FormControlLabel
            control={
              <Checkbox
                size='medium'
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
              />
            }
            label={<Typography fontSize='0.9rem'>Remember me</Typography>}
          />
        </FormControl>

        {isLoading ? (
          <LoadingButton loading size='large' fullWidth variant='contained'>
            Login
          </LoadingButton>
        ) : (
          <Button
            size='large'
            fullWidth
            variant='contained'
            onClick={handleSubmit(login)}
          >
            Login
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
          <NextLink href='/auth?type=signup' passHref>
            <Link
              fontWeight='600'
              fontSize='small'
              color='text.primary'
              underline='none'
            >
              Signup Now
            </Link>
          </NextLink>
        </Stack>
      </Container>
    </>
  )
}

export default Login
