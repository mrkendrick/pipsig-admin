import {
  Avatar,
  Fade,
  Breadcrumbs,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  capitalize,
  TextField,
  Box,
} from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import React, { MouseEvent, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NotificationsIcon from '@mui/icons-material/Notifications'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { RootState } from '../../redux/reducers'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import authActions from '../../redux/actions/auth'

const TopBar = () => {
  const { asPath, push } = useRouter()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  )

  const open = Boolean(anchorEl)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { _logout } = bindActionCreators(authActions, dispatch)

  const onLogout = () => {
    handleClose()
    _logout()
  }

  return (
    <Stack
      px={2}
      py={1.5}
      borderBottom={`1px solid ${grey[200]}`}
      direction='row'
      alignItems='center'
      flex='0.2'
      justifyContent='space-between'
    >
      <Box width='fit-content'>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize='small' />}
          aria-label='breadcrumb'
        >
          <Link fontWeight='500' underline='none' color={blue[700]} href='/'>
            Dashoard
          </Link>
          <Link
            fontWeight='500'
            underline='none'
            color='inherit'
            href='/getting-started/installation/'
          >
            {capitalize(asPath.split('/')[1])}
          </Link>
        </Breadcrumbs>
      </Box>
      <TextField
        type='text'
        size='small'
        placeholder='Search Name'
        label='Search'
      />
      <Stack spacing={2} direction='row' alignItems='center'>
        <IconButton aria-label='notifications'>
          <NotificationsIcon />
        </IconButton>
        <Avatar alt={user.name} src={user.photo} />
        <Typography fontWeight='500'>{user.name}</Typography>
        <IconButton onClick={handleClick} aria-label='more'>
          <KeyboardArrowDownIcon />
        </IconButton>
        <Menu
          id='nav-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          TransitionComponent={Fade}
        >
          <MenuItem disabled onClick={handleClose}>
            <ListItemIcon>
              <PersonIcon color='success' />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose()
              push('/settings')
            }}
          >
            <ListItemIcon>
              <SettingsIcon color='info' />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <MenuItem onClick={onLogout}>
            <ListItemIcon>
              <LogoutIcon color='warning' />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Stack>
    </Stack>
  )
}

export default TopBar
