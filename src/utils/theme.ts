import { blue, yellow } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: ['Encode Sans'].join(','),
  },

  palette: {
    primary: {
      main: yellow[600],
    },

    text: {
      primary: '#0a0f38',
      secondary: 'rgba(10,15,56,.7)',
    },
  },
})

export default theme
