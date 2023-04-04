import { FieldValues, FormState } from 'react-hook-form';

export const registerFieldErrorState = <TFieldValues extends FieldValues>(formState: FormState<TFieldValues>, key: string) => {
  const error = formState.errors[key];

  return {
    error: Boolean(error),
    helperText: error?.message,
  }
}