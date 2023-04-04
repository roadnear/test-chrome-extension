import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../state/hooks';
import { getSecretKeySelector } from '../state/account/selectors';
import { signOut } from '../state/account/reducer';

function AccountProfilePage() {
  const secretKey = useAppSelector(getSecretKeySelector());
  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
  }

  return (
    <Grid container spacing={2} p={2} justifyContent="center">
      <Grid item xs={12}>
        <Paper elevation={0}>
          <Typography variant="h6">
            Register
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={1} 
          sx={{ 
            p: 4, 
            display: 'flex',
            flexDirection: 'column'
          }}>
          <Typography variant="body1" mb={2} textAlign="center">
            Your secret key: {secretKey}
          </Typography>
          <Button variant="contained" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default AccountProfilePage;