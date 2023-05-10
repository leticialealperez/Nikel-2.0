import { Container, Grid } from "@mui/material"
import { LoginImage } from "./components/LoginImage"
import { PhrasesProps } from "./types/PhrasesProps"

import LoginPhrases from './components/LoginPhrases'
import pocket from '../../../public/assets/images/pocket.png'

export const Login = () => {

  const phrases: PhrasesProps[] = [
    {phrase: 'Organize suas finâncias de uma forma fácil.'},
    {phrase: 'Controle seu dinheiro e investimentos.'},
    {phrase: 'Economize e atinja seus objetivos.'}
  ]

    return (
      <Container sx={{ height: '100vh'  }}>
        <Grid container>
          <Grid xs={6} item sx={{
            display: 'flex',
            flexDirection : 'column',
            alignItems: 'center',
            justifyContent:'center',
            height: '100vh'
          }}
          gap={3}
          >
            <LoginPhrases phrases={phrases} />
            <LoginImage src={pocket} />
          </Grid>
          <Grid xs={6} item></Grid>
        </Grid>
      </Container>
    )
}