import React from 'react';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { registerFieldErrorState } from '../../utils/form';
import { useAppDispatch } from '../../state/hooks';
import { registerPromiseCreator, registerRoutine } from '../../state/account/reducer';

interface FormData {
  secretKey: string;
  password: string;
  confirmPassword: string;
}

const registrationSchema = yup.object({
  secretKey: yup.string().required('Secret key is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().required('Confirm password is required').oneOf([yup.ref('password')], 'Passwords must match'),
});

interface RegistrationFormProps {
  secretKey: string;
  onSuccess?: () => void;
}

function RegistrationForm(props: RegistrationFormProps) {
  const { secretKey, onSuccess } = props;
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      secretKey,
      password: '',
      confirmPassword: '',
    }
  })
  const handleClickSubmitButton = handleSubmit((data) => {
    registerPromiseCreator({
      password: data.password,
      secretKey: data.secretKey,
    }, dispatch).then(
      () => onSuccess && onSuccess()
    )
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
        label="Secret Key" 
        disabled={true} 
        {...register('secretKey')}
        {...registerFieldErrorState(formState, 'secretKey')}/>
      <TextField 
        margin="normal" 
        label="Password" 
        type="password" 
        {...register('password')}
        {...registerFieldErrorState(formState, 'password')}/>
      <TextField 
        margin="normal" 
        label="Confirm Password" 
        type="password" 
        {...register('confirmPassword')}
        error={Boolean(formState.errors.confirmPassword?.message)}
        helperText={formState.errors.confirmPassword?.message}/>
      <Button 
        variant="contained" 
        sx={{ mt: 2 }} 
        onClick={handleClickSubmitButton}>
        Submit
      </Button>
    </Box>
  )
}

export default RegistrationForm;