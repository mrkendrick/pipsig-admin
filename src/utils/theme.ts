import { createTheme } from '@mui/material/styles'
import { blue } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: ['Encode Sans'].join(','),
  },
  palette: {
    primary: { main: blue[900] },

    text: {
      primary: '#0a0f38',
      secondary: 'rgba(10,15,56,.7)',
    },
  },
})

export default theme
