import React, { useCallback, useState } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import CryptoJS from 'crypto-js';
import { createSearchParams, useNavigate } from 'react-router-dom';

function GetStartedPage() {
  const [generatedKey, setGeneratedKey] = useState('');
  const navigate = useNavigate();
  const handleButtonClick = useCallback(() => {
    if (generatedKey) {
      navigate({
        pathname: '/registration',
        search: createSearchParams({
          secretKey: generatedKey
        }).toString(),
      })
    } else {
      const newKey = CryptoJS.lib.WordArray.random(64/8);
      setGeneratedKey(newKey.toString());
    }
  }, [generatedKey]);

  return (
    <Grid container spacing={2} p={2} justifyContent="center">
      <Grid item xs={12}>
        <Paper elevation={0}>
          <Typography variant="h6">
            Get started
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
            {generatedKey}
          </Typography>
          <Button variant="contained" onClick={handleButtonClick}>
            {generatedKey ? 'Continue' : 'Generate Key'}
          </Button>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default GetStartedPage;