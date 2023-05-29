import { Box, IconButton, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import useClipboard from 'react-use-clipboard'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { bindActionCreators } from 'redux'
import { nftActions } from '../../redux/actions/nft'
import { useDispatch } from 'react-redux'
import EditAsset from '../EditAsset'

type Props = {
  _id: string
  image: string
  uuid: number
  price: number
  min: number
  max: number
  percentageChange: number
  collection: string
}

const AssetItem = ({
  _id,
  image,
  price,
  percentageChange,
  min,
  max,
  uuid,
  collection,
}: Props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [editAsset, setEditAsset] = useState(false)
  const [isCopied, setCopied] = useClipboard(
    `https://pipsigfx.com/collection/${collection}/asset/${_id}`,
    {
      successDuration: 2000,
    },
  )

  const { _deleteAsset } = bindActionCreators(nftActions, dispatch)

  const onDelete = async () => {
    setLoading(true)
    await _deleteAsset(collection, _id, setLoading)
  }

  return (
    <Box
      overflow='hidden'
      boxShadow={3}
      sx={{ background: '#fff' }}
      borderRadius={3}
      minHeight={200}
    >
      <EditAsset
        isOpen={editAsset}
        onClose={() => setEditAsset(false)}
        collectionId={collection}
        asset={{ _id, image, price, percentageChange, min, max, uuid }}
      />
      <Image
        alt={uuid.toString()}
        src={image}
        width='100%'
        height='100%'
        layout='responsive'
      />
      <Stack
        pt={2}
        px={2}
        direction='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <Stack>
          <Typography variant='subtitle2'>${price.toLocaleString()}</Typography>
          <Typography variant='subtitle2'>
            {percentageChange.toLocaleString()}%
          </Typography>
        </Stack>
        <Stack alignItems='end'>
          <Typography variant='subtitle2' color='text.secondary'>
            #{uuid}
          </Typography>
          <Stack direction='row' alignItems='center'>
            <Typography variant='subtitle2'>${min.toLocaleString()}</Typography>{' '}
            ~{' '}
            <Typography variant='subtitle2'>${max.toLocaleString()}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        p={1}
      >
        <IconButton
          onClick={() => setEditAsset(true)}
          size='large'
          color='success'
        >
          <EditRoundedIcon />
        </IconButton>
        <IconButton onClick={setCopied} size='large' color='info'>
          {isCopied ? <CheckRoundedIcon /> : <FilePresentRoundedIcon />}
        </IconButton>
        <IconButton
          disabled={loading}
          onClick={onDelete}
          size='large'
          color='error'
        >
          <DeleteRoundedIcon />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default AssetItem
