import React from 'react';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { registerFieldErrorState } from '../../utils/form';
import { useAppDispatch } from '../../state/hooks';
import { signInPromiseCreator } from '../../state/account/reducer';

interface FormData {
  password: string;
}

const signInSchema = yup.object({
  password: yup.string().required('Password is required'),
});

interface SignInFormProps {
  onSuccess?: () => void;
}

function SignInForm(props: SignInFormProps) {
  const { onSuccess } = props;
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, ...formContext } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
    mode: 'all',
    defaultValues: {
      password: '',
    }
  })
  const handleClickSubmitButton = handleSubmit((data) => {
    signInPromiseCreator({
      password: data.password,
    }, dispatch).then(
      () => onSuccess && onSuccess(),
      (errorMessage) => {
        formContext.setError('password', { message: errorMessage });
      }
    );
  });

  return (
    <Box 
      component="form"
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
      <TextField 
        margin="normal" 
        label="Password" 
        type="password" 
        {...register('password')}
        {...registerFieldErrorState(formState, 'password')}/>
      <Button 
        variant="contained" 
        sx={{ mt: 2 }} 
        onClick={handleClickSubmitButton}>
        Sign In
      </Button>
    </Box>
  )
}

export default SignInForm;