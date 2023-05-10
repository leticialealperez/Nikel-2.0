import { Box } from '@mui/material'
import { background } from '../constants/colors';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ 
      padding: '0px',
      margin: '0px',
      zIndex: '-1',
      height: '100vh',
      background: `linear-gradient(300deg, white 0%, white 50%, ${background} 50%, ${background} 100%)`
     }}>

      {children}
      
    </Box>
  )
}

export default Layout;