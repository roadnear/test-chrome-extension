import { createSelector } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

import { RootState } from "../store";

export const getAccountSelector = (state: RootState) => state.account;

export const getIsAccountInitializedSelector = () => {
  return createSelector(getAccountSelector, (account) => {
    return Boolean(account.secretKey) && Boolean(account.password);
  });
}

export const getIsAuthenticatedSelector = () => {
  return createSelector(getAccountSelector, (account) => account.isAuth)
}

export const getSecretKeySelector = () => {
  return createSelector(getAccountSelector, (account) => {
    const { secretKey, password } = account;

    return CryptoJS.AES.decrypt(secretKey, password).toString(CryptoJS.enc.Utf8);
  })
}