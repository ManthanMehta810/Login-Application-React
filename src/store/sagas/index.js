import { all } from 'redux-saga/effects';
import { getProfileDataSaga } from '../../components/profile/profile.saga';

export default function* saga() {
  yield all([...Object.values(getProfileDataSaga)]);
}
