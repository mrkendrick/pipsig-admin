import { Box, Stack } from '@mui/material'
import React, { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import authActions from '../../redux/actions/auth'
import { RootState } from '../../redux/reducers'
import SideBar from '../SideBar'
import TopBar from '../TopBar'
import TopToast from '../TopToast'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  )

  const { _getProfile } = bindActionCreators(authActions, dispatch)

  const initialCalls = async () => {
    await _getProfile()
  }

  useEffect(() => {
    initialCalls()

    // eslint-disable-next-line
  }, [isAuthenticated])

  return (
    <Stack
      direction='row'
      alignItems='stretch'
      width='100%'
      height='100vh'
      component='main'
    >
      <TopToast />
      <SideBar />
      <Stack justifyContent='stretch' alignItems='stretch' flex='2'>
        {isAuthenticated && user._id !== '' && <TopBar />}
        {children}
      </Stack>
    </Stack>
  )
}

export default Layout
