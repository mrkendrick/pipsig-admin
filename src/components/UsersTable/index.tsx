import React, { MouseEvent, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import {
  Avatar,
  Fade,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import HelperServices from '../../utils/helpers'
import { reverse, sortBy, truncate } from 'lodash'
import Tag from '../Tag'
import { Role, SecurityLevel } from '../../redux/reducers/auth.reducer'
import VerifiedIcon from '@mui/icons-material/Verified'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator'
import { bindActionCreators } from 'redux'
import usersActions from '../../redux/actions/users'

const UsersTable = () => {
  const dispatch = useDispatch()
  const [selectedId, setSelectedId] = useState('')
  const { users } = useSelector((state: RootState) => state.users)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { _updateUser } = bindActionCreators(usersActions, dispatch)

  const open = Boolean(anchorEl)

  const handleClick = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    setSelectedId(id)
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const reversedData = useMemo(() => {
    return reverse(sortBy(users.data, d => d.createdAt))

    // eslint-disable-next-line
  }, [users.data])

  const updateUser = async (type: 'role' | 'active', id: string) => {
    const user = users.data.find(user => user._id === id)

    switch (type) {
      case 'role':
        if (user) {
          handleClose()
          const newRoles = [
            ...user.roles.map(role =>
              role === Role.admin ? Role.user : Role.admin,
            ),
          ]

          const data = { roles: [...newRoles] }

          await _updateUser(user._id, data)
        }

        break

      case 'active':
        if (user) {
          handleClose()
          const data = {
            active: !user.active,
          }

          await _updateUser(user._id, data)
        }
        break

      default:
        break
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          size='small'
          stickyHeader
          sx={{ minWidth: 650 }}
          aria-label='orders table'
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>Referral Code</TableCell>
              <TableCell align='center'>Friends Invited</TableCell>
              <TableCell align='center'>KYC Verified</TableCell>
              <TableCell align='center'>Security Level</TableCell>
              <TableCell align='center'>Last Login</TableCell>
              <TableCell align='center'>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reversedData.map(d => (
              <TableRow
                key={d._id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  transition: 'all ease-in-out 300ms',
                }}
              >
                <TableCell component='th' scope='row'>
                  <Stack spacing={2} direction='row' alignItems='center'>
                    <Avatar
                      alt={d.name}
                      sx={{ width: 30, height: 30 }}
                      src={d.photo}
                    />
                    <Typography>{d.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align='center'>{d.email}</TableCell>
                <TableCell align='center'>
                  {truncate(d.referralCode, { length: 10 })}
                </TableCell>
                <TableCell align='center'>{d.friendsInvited}</TableCell>
                <TableCell align='center'>
                  <VerifiedIcon color={d.kycVerified ? 'info' : 'disabled'} />
                </TableCell>
                <TableCell align='center'>
                  <Tag
                    text={d.securityLevel}
                    variant={
                      d.securityLevel === SecurityLevel.low
                        ? 'error'
                        : d.securityLevel === SecurityLevel.medium
                        ? 'warn'
                        : 'success'
                    }
                  />
                </TableCell>
                <TableCell align='center'>
                  {HelperServices.dateFromNow(d.lastLogin)}
                </TableCell>
                <TableCell align='center'>
                  <IconButton onClick={e => handleClick(e, d._id)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id='table-menu'
                    anchorEl={anchorEl}
                    elevation={2}
                    open={open && selectedId === d._id}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={() => updateUser('role', d._id)}>
                      <ListItemIcon>
                        {d.roles.includes(Role.admin) ? (
                          <RemoveModeratorIcon color='error' />
                        ) : (
                          <AdminPanelSettingsIcon color='info' />
                        )}
                      </ListItemIcon>
                      <ListItemText>
                        {d.roles.includes(Role.admin)
                          ? 'Remove Admin'
                          : 'Make Admin'}
                      </ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => updateUser('active', d._id)}>
                      <ListItemIcon>
                        <RemoveCircleIcon color='error' />
                      </ListItemIcon>
                      <ListItemText>
                        {d.active ? 'Block' : 'Unblock'}
                      </ListItemText>
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UsersTable
