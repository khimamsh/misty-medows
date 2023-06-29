import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    width: '25vw',
    height: '20vh',
    borderRadius: 1,
    alignItems: "center",
    justifyContent: "center",
  };
const ScoreCard:FC<{score:number;}>=({score})=>(
        <Box sx={style}>
            <Stack margin={6} alignItems={'center'} justifyContent={'centerx'}>
        
            <Typography fontSize={'18px'}  >Answers submitted successfully.</Typography>
            <Typography fontSize={'20px'} fontWeight={'Bold'}>Your Score is {score}!</Typography>
            

            </Stack>
        </Box>
    )
export default ScoreCard;