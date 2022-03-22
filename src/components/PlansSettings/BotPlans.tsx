import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { sortBy } from 'lodash'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SmartToyIcon from '@mui/icons-material/SmartToy'

type Props = {
  setSelectedId: (id: string) => void
  setIsDeletePlanOpen: (state: boolean) => void
  onEditClick: (plan: {
    createdAt: string
    max: number
    min: number
    rfb: number
    roi: number
    title: string
    type: 'self' | 'bot'
    _id: string
  }) => void
}

const BotPlans = ({
  setSelectedId,
  setIsDeletePlanOpen,
  onEditClick,
}: Props) => {
  const { plans } = useSelector((state: RootState) => state.plans)

  const sortedPlans = useMemo(() => {
    return sortBy(plans, plan => plan.min)
  }, [plans])

  return (
    <Stack
      spacing={1}
      justifyContent='space-evenly'
      direction='row'
      alignItems='center'
    >
      {sortedPlans.map(
        plan =>
          plan.type === 'bot' && (
            <Box
              key={plan._id}
              position='relative'
              sx={{
                boxShadow: 3,
                padding: '1rem 1.5rem',
                borderRadius: '5px',
                transition: 'all ease-in-out 300ms',
                '&:hover': {
                  outline: `2px solid ${blue[50]}`,
                  cursor: 'pointer',
                },
              }}
            >
              <Stack
                justifyContent='center'
                direction='row'
                alignItems='center'
                spacing={1}
                mb={0.5}
              >
                <Typography
                  variant='subtitle1'
                  fontWeight='600'
                  textAlign='center'
                >
                  {plan.title}
                </Typography>
                <SmartToyIcon color='success' />
              </Stack>
              <Stack justifyContent='space-between'>
                <Stack
                  justifyContent='space-evenly'
                  direction='row'
                  spacing={1}
                  alignItems='center'
                >
                  <Stack direction='row' alignItems='center'>
                    <AttachMoneyIcon />
                    <Typography fontWeight='600'>
                      {plan.min.toLocaleString()}
                    </Typography>
                  </Stack>
                  <Box>-</Box>
                  <Stack direction='row' alignItems='center'>
                    <AttachMoneyIcon />
                    <Typography fontWeight='600'>
                      {plan.max.toLocaleString()}
                    </Typography>
                  </Stack>
                </Stack>

                <Divider sx={{ marginY: '1rem' }} />

                <Box width='fit-content' mx='auto'>
                  <Typography variant='subtitle2' color='text.secondary'>
                    Return of investments: {plan.roi} %
                  </Typography>

                  <Typography variant='subtitle2' color='text.secondary'>
                    Referral fee bonus: {plan.rfb} %
                  </Typography>
                </Box>
              </Stack>
              <Stack mt={2} spacing={2} direction='row' justifyContent='center'>
                <Button
                  color='error'
                  onClick={() => {
                    setSelectedId(plan._id)
                    setIsDeletePlanOpen(true)
                  }}
                >
                  Delete
                </Button>
                <Button onClick={() => onEditClick(plan)}>Edit</Button>
              </Stack>
            </Box>
          ),
      )}
    </Stack>
  )
}

export default BotPlans
