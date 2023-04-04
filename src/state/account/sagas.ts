import { PayloadAction } from "@reduxjs/toolkit";
import { takeLatest, put, select } from "typed-redux-saga";
import CryptoJS from "crypto-js";

import { IRegisterTriggerPayload, ISignInTriggerPayload, registerRoutine, signInRoutine } from "./reducer";
import { getAccountSelector } from "./selectors";

const pbkdf2Config = {
  keySize: 512 / 32,
  iterations: 1000
};

function* registerSaga(action: PayloadAction<IRegisterTriggerPayload>) {
  const { password, secretKey } = action.payload;
  const salt = CryptoJS.lib.WordArray.random(128/8);
  const result = CryptoJS.PBKDF2(password, salt.toString(), pbkdf2Config);
  const hashedPassword = result.toString();
  const encrypedSecretKey = CryptoJS.AES.encrypt(secretKey, hashedPassword);

  yield* put(registerRoutine.request({
    password: hashedPassword,
    salt: salt.toString(),
    secretKey: encrypedSecretKey.toString(),
  }));
  yield* put(registerRoutine.success())
}

function* signInSaga(action: PayloadAction<ISignInTriggerPayload>) {
  const { password } = action.payload;
  const { password: hashedPassword, salt } = yield* select(getAccountSelector)
  const result = CryptoJS.PBKDF2(password, salt, pbkdf2Config);

  if (result.toString() === hashedPassword) {
    yield* put(signInRoutine.request())
    yield* put(signInRoutine.success())
  } else {
    yield* put(signInRoutine.failure('Invalid password'))
  }
}

export default function* generateAccountSagas() {
  yield* takeLatest(registerRoutine.TRIGGER, registerSaga);
  yield* takeLatest(signInRoutine.TRIGGER, signInSaga);
}