import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createRoutine, promisifyRoutine } from 'redux-saga-routines';

export interface IRegisterTriggerPayload {
  secretKey: string;
  password: string;
}

export interface IRegisterRequestPayload extends IRegisterTriggerPayload {
  salt: string;
};

export const registerRoutine = createRoutine('REGISTER', {
  trigger: (payload: IRegisterTriggerPayload) => payload,
  request: (payload: IRegisterRequestPayload) => payload,
})
export const registerPromiseCreator = promisifyRoutine(registerRoutine);

export interface ISignInTriggerPayload {
  password: string;
}

export const signInRoutine = createRoutine('SIGN_IN', {
  trigger: (payload: ISignInTriggerPayload) => payload,
  failure: (errorMessage: string) => errorMessage,
});
export const signInPromiseCreator = promisifyRoutine(signInRoutine);

interface IInitialState {
  password: string;
  salt: string;
  secretKey: string;
  isAuth: boolean;
}

const initialState: IInitialState = {
  password: '',
  secretKey: '',
  salt: '',
  isAuth: false,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    signOut: (state) => {
      state.isAuth = false
    },
    reset: () => initialState
  },
  extraReducers: (builder) => 
    builder.addCase(registerRoutine.REQUEST, (state, action: PayloadAction<IRegisterRequestPayload>) => {
      const { password, salt, secretKey } = action.payload;

      state.password = password;
      state.salt = salt;
      state.secretKey = secretKey;
    })
    .addCase(signInRoutine.REQUEST, (state) => {
      state.isAuth = true;
    })
    .addDefaultCase(() => {})
})

export const { signOut, reset } = accountSlice.actions

export default accountSlice.reducer;