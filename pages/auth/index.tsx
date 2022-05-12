import { NextPage } from 'next'
import React from 'react'
import { Box } from '@mui/material'
import Login from '../../src/components/Auth/Login'
import { useRouter } from 'next/dist/client/router'
import Signup from '../../src/components/Auth/Signup'
import ForgotPassword from '../../src/components/Auth/ForgotPassword'

const Auth: NextPage = () => {
  const { query } = useRouter()

  return (
    <Box flex='3' position='relative'>
      {query.type === 'login' ? (
        <Login />
      ) : query.type === 'signup' ? (
        <Signup />
      ) : (
        query.type === 'forgotPassword' && <ForgotPassword />
      )}
    </Box>
  )
}

export default Auth
