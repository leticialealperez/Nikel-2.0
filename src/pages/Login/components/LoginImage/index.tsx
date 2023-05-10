import { Box } from '@mui/material'

interface ImageProps {
    src : string
}

export const LoginImage: React.FC<ImageProps> = ({src}) => {
    return <>
        <Box sx={{
          display: 'flex',
          alignSelf: 'flex-end'
        }}>
          <Box component={'img'} src={src} />
        </Box>
    </>
}