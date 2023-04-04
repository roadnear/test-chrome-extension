import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { LoaderFunctionArgs, useLoaderData, useNavigate } from 'react-router-dom';

import { RegistrationForm } from '../components/Registration';

export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  return {
    secretKey: url.searchParams.get('secretKey')
  }
}

function RegistrationPage() {
  const { secretKey } = useLoaderData() as ReturnType<typeof loader>;
  const navigate = useNavigate();
  const handleSuccess = () => navigate('/sign-in');
  
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
        <Paper elevation={1} sx={{ p: 4}}>
          <RegistrationForm 
            secretKey={secretKey || ''}
            onSuccess={handleSuccess}/>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default RegistrationPage;