import { Box, Link, Stack, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import React, { useMemo } from 'react'
import { v4 } from 'uuid'
import Logo from '../Logo'
import NextLink from 'next/link'
import ReceiptIcon from '@mui/icons-material/Receipt'
import GroupIcon from '@mui/icons-material/Group'
import VerifiedIcon from '@mui/icons-material/Verified'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded'

const SideBar = () => {
  const { asPath } = useRouter()
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  )

  const links = useMemo(
    () => [
      {
        id: v4(),
        name: 'Orders',
        href: '/orders',
        icon: <ReceiptIcon />,
      },
      {
        id: v4(),
        name: 'Users',
        href: '/users',
        icon: <GroupIcon />,
      },
      {
        id: v4(),
        name: 'Verification',
        href: '/verification',
        icon: <VerifiedIcon />,
      },
      {
        id: v4(),
        name: 'Wallets',
        href: '/wallets',
        icon: <AccountBalanceWalletIcon />,
      },
      {
        id: v4(),
        name: 'Nfts',
        href: '/nfts',
        icon: <PhotoRoundedIcon />,
      },
      {
        id: v4(),
        name: 'News',
        href: '/news',
        icon: <NewspaperIcon />,
      },
    ],
    [],
  )

  return (
    <Stack
      sx={{
        background: blue[600],
        color: '#fff',
        opacity: isAuthenticated && user._id !== '' ? 1 : 0,
        transition: 'all ease 450ms',
      }}
      p={isAuthenticated && user._id !== '' ? 2 : 0}
      pr={0}
      flex={isAuthenticated && user._id !== '' ? '0.4' : 'none'}
      width={isAuthenticated && user._id !== '' ? 'auto' : 0}
      spacing={4}
      component='aside'
    >
      <Logo />
      <Stack component='nav' spacing={1.5}>
        {links.map(link => (
          <NextLink href={link.href} passHref key={link.id}>
            <Link underline='none'>
              <Box
                padding='0.8rem 3rem 0.8rem 1rem'
                borderRadius='7px'
                color={asPath.includes(link.href) ? '#fff' : blue[50]}
                sx={{
                  background: asPath.includes(link.href)
                    ? 'linear-gradient(to right, #64b5f6, #53aaf2, #439fee, #3193ea, #1e88e5)'
                    : '',

                  '&:hover': {
                    background: blue[300],
                    marginRight: '1rem',
                    color: '#fff',
                  },
                  transition: 'all ease-in-out 300ms',
                }}
              >
                <Stack direction='row' alignItems='center' spacing={2}>
                  {link.icon}
                  <Typography fontWeight='600'>{link.name}</Typography>
                </Stack>
              </Box>
            </Link>
          </NextLink>
        ))}
      </Stack>
    </Stack>
  )
}

export default SideBar
