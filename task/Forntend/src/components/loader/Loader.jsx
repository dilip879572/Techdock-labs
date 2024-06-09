import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

const Loader = () => {
  return (
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      {/* <CircularProgress color="secondary" /> */}
      <CircularProgress color="success" size={20} />
      {/* <CircularProgress color="inherit" /> */}
    </Stack>
  )
}

export default Loader
