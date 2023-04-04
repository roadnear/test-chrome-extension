import React, { useCallback, useEffect } from 'react';
import { Avatar, Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';

import { SignInForm } from '../components/SignIn';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { getIsAccountInitializedSelector, getIsAuthenticatedSelector } from '../state/account/selectors';
import { reset } from '../state/account/reducer';

function SignInPage() {
  const navigate = useNavigate();
  const isInit = useAppSelector(getIsAccountInitializedSelector());
  const isAuth = useAppSelector(getIsAuthenticatedSelector());
  const dispatch = useAppDispatch();
  const handleReset = useCallback(() => {
    if (isInit) {
      dispatch(
        reset()
      )
    }
    
  }, [isInit])
  const handleSuccess = () => {
    navigate('/app/account-profile');
  }

  useEffect(() => {
    isAuth && handleSuccess()
  }, [isAuth])
  
  return (
    <Grid container spacing={2} p={2} justifyContent="center">
      <Grid item xs={12}>
        <Paper elevation={1} sx={{ p: 4 }}>
          <Stack spacing={2} justifyContent="center">
            <Box display="flex" justifyContent="center">
              <Avatar sx={{ width: 100, height: 100 }}>
                <AccountCircle sx={{ fontSize: 100 }}/>
              </Avatar>
            </Box>
            <SignInForm onSuccess={handleSuccess}/>
            {
              isInit && (
                <Button variant="contained" color="error" onClick={handleReset}>
                  Reset
                </Button>
              )
            }
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default SignInPage;