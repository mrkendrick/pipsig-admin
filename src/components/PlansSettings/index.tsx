import React, { useEffect, useMemo, useState } from 'react'
import { Box, CircularProgress, Fab, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import NoData from '../NoData'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { bindActionCreators } from 'redux'
import plansActions from '../../redux/actions/plans'
import DeletePlanDialog from './DeletePlanDialog'
import AddPlanDialog from './AddPlanDialog'
import { sortBy } from 'lodash'
import EditPlanDialog from './EditPlanDialog'
import SelfPlans from './SelfPlans'
import BotPlans from './BotPlans'

const PlansSettings = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false)
  const [isDeletePlanOpen, setIsDeletePlanOpen] = useState(false)
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [selectedPlan, setSelectedPlan] = useState<{
    createdAt: string
    max: number
    min: number
    rfb: number
    roi: number
    title: string
    type: 'self' | 'bot'
    _id: string
  }>({
    createdAt: '',
    max: 0,
    min: 0,
    rfb: 0,
    roi: 0,
    title: '',
    type: 'self',
    _id: '',
  })
  const { plans } = useSelector((state: RootState) => state.plans)
  const { authLoading } = useSelector((state: RootState) => state.auth)

  const { _getPlans } = bindActionCreators(plansActions, dispatch)

  const sortedPlans = useMemo(() => {
    return sortBy(plans, plan => plan.min)
  }, [plans])

  const onEditClick = (plan: {
    createdAt: string
    max: number
    min: number
    rfb: number
    roi: number
    title: string
    type: 'self' | 'bot'
    _id: string
  }) => {
    setSelectedPlan(plan)
    setIsEditPlanOpen(true)
  }

  const loadData = async () => {
    setLoading(true)
    await _getPlans(setLoading)
  }

  useEffect(() => {
    loadData()

    // eslint-disable-next-line
  }, [])

  return (
    <Box position='relative' height='100%'>
      <AddPlanDialog
        open={isAddPlanOpen}
        onClose={() => setIsAddPlanOpen(false)}
      />
      {loading && !authLoading && (
        <Box
          position='absolute'
          top='50%'
          left='50%'
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          <CircularProgress />
        </Box>
      )}

      {!loading && !plans.length && <NoData text='No Plans' />}

      <Fab
        onClick={() => setIsAddPlanOpen(true)}
        size='medium'
        sx={{
          position: 'fixed',
          bottom: '15px',
          right: '15px',
          zIndex: 10,
          transition: 'all ease 300ms',
          '&:hover': {
            transform: 'rotate(90deg)',
          },
        }}
        color='primary'
        aria-label='add'
      >
        <AddIcon />
      </Fab>

      {!loading && sortedPlans.length > 0 && (
        <>
          <DeletePlanDialog
            open={isDeletePlanOpen}
            id={selectedId}
            onClose={() => setIsDeletePlanOpen(false)}
          />

          <EditPlanDialog
            open={isEditPlanOpen}
            onClose={() => setIsEditPlanOpen(false)}
            plan={selectedPlan}
          />
          <Stack height='100%' justifyContent='space-evenly'>
            <SelfPlans
              onEditClick={onEditClick}
              setIsDeletePlanOpen={setIsDeletePlanOpen}
              setSelectedId={setSelectedId}
            />
            <BotPlans
              onEditClick={onEditClick}
              setIsDeletePlanOpen={setIsDeletePlanOpen}
              setSelectedId={setSelectedId}
            />
          </Stack>
        </>
      )}
    </Box>
  )
}

export default PlansSettings
