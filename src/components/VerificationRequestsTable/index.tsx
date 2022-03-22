import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Paper,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Fade,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { reverse, sortBy } from 'lodash'
import React, { MouseEvent, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import TransgenderIcon from '@mui/icons-material/Transgender'
import VerifiedIcon from '@mui/icons-material/Verified'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'
import { bindActionCreators } from 'redux'
import verificationActions from '../../redux/actions/verification'

const VerificationRequestsTable = () => {
  const dispatch = useDispatch()
  const [selectedId, setSelectedId] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { verificationRequests } = useSelector(
    (state: RootState) => state.verification,
  )

  const { _acceptVerification, _declineVerification } = bindActionCreators(
    verificationActions,
    dispatch,
  )

  const open = Boolean(anchorEl)

  const handleClick = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    setSelectedId(id)
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const reversedData = useMemo(() => {
    return reverse(sortBy(verificationRequests.data, d => d.createdAt))

    // eslint-disable-next-line
  }, [verificationRequests.data])

  const onReject = async (verificationId: string, userId: string) => {
    const data = {
      kycVerified: false,
    }

    handleClose()

    await _declineVerification(verificationId, userId, data)
  }

  const onAccept = async (userId: string) => {
    const data = {
      kycVerified: true,
    }

    handleClose()

    await _acceptVerification(userId, data)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          size='small'
          stickyHeader
          sx={{ minWidth: 650 }}
          aria-label='verification table'
        >
          <TableHead>
            <TableRow>
              <TableCell>Owner</TableCell>
              <TableCell align='center'>First Name Last Name</TableCell>
              <TableCell align='center'>Gender</TableCell>
              <TableCell align='center'>Citizenship</TableCell>
              <TableCell align='center'>DOB</TableCell>
              <TableCell align='center'>KYC Verified</TableCell>
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
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Avatar
                      sx={{ width: 30, height: 30 }}
                      alt={d.user.name}
                      src={d.user.photo}
                    />
                    <Typography>{d.user.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align='center'>
                  {d.firstName} {d.lastName}
                </TableCell>
                <TableCell align='center'>
                  {d.gender === 'male' ? (
                    <MaleIcon />
                  ) : d.gender === 'female' ? (
                    <FemaleIcon />
                  ) : (
                    <TransgenderIcon />
                  )}
                </TableCell>
                <TableCell align='center'>{d.citizenship}</TableCell>
                <TableCell align='center'>
                  {d.dob.day}-{d.dob.month}-{d.dob.year}
                </TableCell>
                <TableCell align='center'>
                  <VerifiedIcon
                    color={d.user.kycVerified ? 'info' : 'disabled'}
                  />
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
                    <MenuItem onClick={() => onAccept(d.user._id)}>
                      <ListItemIcon>
                        <CheckIcon color='info' />
                      </ListItemIcon>
                      <ListItemText>Accept</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => onReject(d._id, d.user._id)}>
                      <ListItemIcon>
                        <CancelIcon color='error' />
                      </ListItemIcon>
                      <ListItemText>Reject</ListItemText>
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

export default VerificationRequestsTable
