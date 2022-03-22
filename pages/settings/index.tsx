import { Box, Stack, Tab, Tabs, Typography } from '@mui/material'
import React, { ReactNode, SyntheticEvent, useState } from 'react'
import Head from 'next/head'
import BufferAuth from '../../src/components/Auth/BufferAuth'
import { GetStaticProps } from 'next'
import SettingsApiService from '../../src/utils/api/settings.api'
import PlansSettings from '../../src/components/PlansSettings'
import MarketApiService from '../../src/utils/api/market.api'
import AccountSettings from '../../src/components/AccountSettings'

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

type Props = {
  market: { id: string; image: string; name: string; symbol: string }[]
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ height: '100%', flex: '1' }}
    >
      {value === index && <Box height='100%'>{children}</Box>}
    </div>
  )
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Settings = ({ market }: Props) => {
  const [value, setValue] = useState(0)

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Stack flex='3' position='relative'>
      <Head>
        <title>Pipsig | Settings</title>
      </Head>
      <BufferAuth />

      <Stack
        justifyContent='space-between'
        direction='row'
        flex='0'
        alignItems='center'
        py={2}
        px={4}
      >
        <Typography sx={{ flex: '1' }} variant='h5' fontWeight='500'>
          Settings
        </Typography>

        <Tabs
          sx={{ width: 'fit-content', flex: '0.6' }}
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          variant='fullWidth'
          selectionFollowsFocus
        >
          <Tab label='Plans Settings' {...a11yProps(0)} />
          <Tab label='Accounts Settings' {...a11yProps(1)} />
        </Tabs>
      </Stack>

      <TabPanel value={value} index={0}>
        <PlansSettings />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AccountSettings market={market} />
      </TabPanel>
    </Stack>
  )
}

export default Settings

export const getStaticProps: GetStaticProps = async context => {
  const res = await MarketApiService.getMarket('usd')

  return {
    props: { market: res.data },
  }
}
