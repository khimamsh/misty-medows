import { Box, Grid, Typography } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    return (
      <Box >
        <Grid rowGap={2} direction={'column'} marginTop={45} container alignItems={'center'} justifyContent={'center'}>
        <Typography>Hola! Please Login To Continue</Typography>
        <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
        </Grid>
    

      </Box>
     
    );
};
export default Login;