import {
  Box,
  Fade,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { reverse, sortBy, truncate } from 'lodash'
import React, { MouseEvent, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import HelperServices from '../../utils/helpers'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { bindActionCreators } from 'redux'
import newsActions from '../../redux/actions/news'

const NewTable = () => {
  const { news } = useSelector((state: RootState) => state.news)
  const dispatch = useDispatch()
  const [selectedId, setSelectedId] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const { _deleteNews } = bindActionCreators(newsActions, dispatch)

  const open = Boolean(anchorEl)

  const handleClick = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    setSelectedId(id)
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const reversedData = useMemo(() => {
    return reverse(sortBy(news.data, d => d.createdAt))

    // eslint-disable-next-line
  }, [news.data])

  const onDelete = async (id: string) => {
    handleClose()
    await _deleteNews(id)
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table
          size='small'
          stickyHeader
          sx={{ minWidth: 650 }}
          aria-label='orders table'
        >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align='center'>Title</TableCell>
              <TableCell align='center'>Content</TableCell>
              <TableCell align='center'>Posted By</TableCell>
              <TableCell align='center'>Date</TableCell>
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
                  {truncate(d._id, { length: 10 })}
                </TableCell>
                <TableCell align='center'>
                  {truncate(d.title, { length: 15 })}
                </TableCell>
                <TableCell align='center'>
                  {truncate(d.post, { length: 15 })}
                </TableCell>
                <TableCell align='center'>{d.postedBy}</TableCell>
                <TableCell align='center'>
                  <Typography
                    fontSize='small'
                    fontWeight='500'
                    color='text.secondary'
                  >
                    {HelperServices.dateFromNow(d.createdAt)}
                  </Typography>
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
                    <MenuItem disabled>
                      <ListItemIcon>
                        <EditIcon color='info' />
                      </ListItemIcon>
                      <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => onDelete(d._id)}>
                      <ListItemIcon>
                        <DeleteIcon color='error' />
                      </ListItemIcon>
                      <ListItemText>Delete</ListItemText>
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default NewTable
