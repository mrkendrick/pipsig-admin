import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Slide,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import React, {
  forwardRef,
  ReactElement,
  Ref,
  useEffect,
  useState,
} from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { bindActionCreators } from 'redux'
import walletActions from '../../redux/actions/wallet'
import { useDispatch, useSelector } from 'react-redux'
import NoData from '../NoData'
import { RootState } from '../../redux/reducers'
import Deposits from './Deposits'
import Withdraws from './Withdraws'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement
  },
  ref: Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />
})

type Props = {
  open: boolean
  onClose: () => void
  id: string
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ height: '100%' }}
      {...other}
    >
      {value === index && (
        <Box height='100%' pt={3}>
          {children}
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const WalletDialog = ({ open, onClose, id }: Props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [value, setValue] = React.useState(0)
  const { wallet } = useSelector((state: RootState) => state.wallets)

  const { _getWallet } = bindActionCreators(walletActions, dispatch)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const loadData = async () => {
    setLoading(true)
    await _getWallet(id, setLoading)
  }

  useEffect(() => {
    open && loadData()

    // eslint-disable-next-line
  }, [id, open])

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Stack spacing={2} direction='row' alignItems='center'>
            <IconButton
              edge='start'
              color='inherit'
              onClick={onClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography variant='h6'>Wallet - ID: {id}</Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box p={2} height='100%' position='relative'>
        {loading && (
          <Box
            position='absolute'
            top='50%'
            left='50%'
            sx={{ transform: 'translate(-50%, -50%)' }}
          >
            <CircularProgress />
          </Box>
        )}
        {!loading && wallet._id === '' && <NoData text='Not Found' />}

        {!loading && wallet._id !== '' && (
          <Stack height='100%'>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='h5'>
                Total Balance: USD {wallet.totalBalance.toLocaleString()}
              </Typography>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='basic tabs example'
              >
                <Tab label='Deposit History' {...a11yProps(0)} />
                <Tab label='Withdraw History' {...a11yProps(1)} />
              </Tabs>
            </Stack>
            <TabPanel value={value} index={0}>
              <Deposits />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Withdraws closeDialog={onClose} />
            </TabPanel>
          </Stack>
        )}
      </Box>
    </Dialog>
  )
}

export default WalletDialog
