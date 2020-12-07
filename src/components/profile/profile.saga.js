import { takeEvery, put, fork } from 'redux-saga/effects';

function* getProfileData(action) {
  const { ApiCall, Actions } = global;
  try {
    const response = yield ApiCall(
      action.url,
      action.constant,
      action.method,
      action.token,
      action.reqBody,
    );
    yield put(Actions.GetProfileSuccess(response.data));
  } catch (err) {
    console.warn('Error', err.message);
    yield put(Actions.GetProfileFail(err));
  }
}
export default function* watchProfile() {
  yield takeEvery('GETPROFILE', getProfileData);
}

export const getProfileDataSaga = [fork(watchProfile)];
