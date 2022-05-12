import {
  AppBar,
  Button,
  Container,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import React, { forwardRef, ReactElement, Ref, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Box } from '@mui/system'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import Image from 'next/image'
import VerifiedIcon from '@mui/icons-material/Verified'
import { blue, grey } from '@mui/material/colors'
import { round } from 'lodash'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import AddAsset from '../AddAsset'
import AssetItem from '../AssetItem'
import useClipboard from 'react-use-clipboard'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement
  },
  ref: Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const CollectionDialog = ({ isOpen, onClose }: Props) => {
  const { collection } = useSelector((state: RootState) => state.nfts)
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false)
  const [isCopied, setCopied] = useClipboard(
    `https://pipsig.com/collection/${collection.slug}`,
    {
      successDuration: 2000,
    },
  )

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AddAsset
        isOpen={isAddAssetOpen}
        onClose={() => setIsAddAssetOpen(false)}
        collectionId={collection._id}
      />
      <AppBar sx={{ position: 'fixed', top: 0 }}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={onClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h5'>{collection.name}</Typography>
        </Toolbar>
      </AppBar>
      <Box mt={8}>
        <Box
          position='relative'
          sx={{
            background: `url(${collection.coverImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          minHeight='200px'
        >
          <Box
            width='100px'
            height='100px'
            borderRadius='50%'
            position='absolute'
            bottom='-50px'
            left='50%'
            overflow='hidden'
            sx={{
              transform: 'translateX(-50%)',
              zIndex: 100,
            }}
          >
            <Image
              alt={collection.name}
              src={collection.image}
              width='100%'
              height='100%'
            />
          </Box>
        </Box>

        <Stack
          direction='row'
          alignItems='center'
          justifyContent='center'
          mt={8}
          spacing={1}
        >
          <Typography fontWeight='600' variant='h4'>
            {collection.name}
          </Typography>
          <VerifiedIcon sx={{ color: blue[700] }} fontSize='large' />
          <IconButton onClick={setCopied} size='large' color='info'>
            {isCopied ? <CheckRoundedIcon /> : <FilePresentRoundedIcon />}
          </IconButton>
        </Stack>
        <Stack
          mx='auto'
          width='fit-content'
          mt={5}
          border={`1px solid ${grey[200]}`}
          divider={<Divider orientation='vertical' flexItem />}
          direction='row'
          alignItems='center'
          borderRadius={2}
        >
          <Stack alignItems='center' py={2.5} px={3}>
            <Typography fontWeight='600' variant='h6'>
              {round(collection.totalVolume / 1000, 2)}k
            </Typography>
            <Typography variant='subtitle2' color='text.secondary'>
              volume traded
            </Typography>
          </Stack>
          <Stack alignItems='center' py={2.5} px={3}>
            <Typography fontWeight='600' variant='h6'>
              {round(collection.owners / 1000, 1)}k
            </Typography>
            <Typography variant='subtitle2' color='text.secondary'>
              owners
            </Typography>
          </Stack>
          <Stack alignItems='center' py={2.5} px={3}>
            <Typography fontWeight='600' variant='h6'>
              {collection.floorPrice} ETH
            </Typography>
            <Typography variant='subtitle2' color='text.secondary'>
              floor price
            </Typography>
          </Stack>
          <Stack alignItems='center' py={2.5} px={3}>
            <Typography fontWeight='600' variant='h6'>
              {round(collection.totalSupply / 1000, 1)}k
            </Typography>
            <Typography variant='subtitle2' color='text.secondary'>
              items
            </Typography>
          </Stack>
        </Stack>
        <Box mt={4}>
          <Container maxWidth='md'>
            <Typography textAlign='center' color='text.secondary'>
              {collection.description}
            </Typography>
          </Container>
        </Box>

        <Divider sx={{ marginTop: 10 }} />
        <Box p={3}>
          <Button
            onClick={() => setIsAddAssetOpen(true)}
            startIcon={<AddRoundedIcon />}
            variant='outlined'
          >
            Add Asset
          </Button>

          <Grid mt={2} container spacing={4}>
            {collection.assets.map(asset => (
              <Grid item xs={12} sm={6} md={3} key={asset._id}>
                <AssetItem collection={collection._id} {...asset} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Dialog>
  )
}

export default CollectionDialog
