import { all, spawn, call } from 'typed-redux-saga';
import { routinePromiseWatcherSaga } from 'redux-saga-routines';

import generateAccountSagas from "./account/sagas";

export default function* sagas() {
  const sagaList = [generateAccountSagas, routinePromiseWatcherSaga];

  yield* all(
    sagaList.map(saga => spawn(function* () {
      while (true) {
        try {
          yield* call(saga);
          break;
        } catch (error) {
          console.error(error);
        }
      }
    }))
  )
}