import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import LoginForm from './LoginForm';

const Login = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <div className='bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 h-screen '>
            <Box
                width="100%"

                p="1rem 6%"
                textAlign="center"
            >
                <Typography fontWeight="bold" fontSize="32px"  color="white">
                    TweterTalk By Dheeraj
                </Typography>

            </Box>
            <Box

                width={isNonMobileScreens ? "40%" : "80%"}

                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    Welcome to TwitterTalk !
                </Typography>

                <LoginForm />


            </Box>





        </div>
    )
}

export default Login