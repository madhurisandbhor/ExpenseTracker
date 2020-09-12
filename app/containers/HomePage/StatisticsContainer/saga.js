import { takeLatest, call, put } from 'redux-saga/effects';
import { getStatisticData as getStatisticDataAPI } from 'api';
import { LOAD_STATISTICS_DATA } from './constants';

import {
  loadStatisticsDataSuccess,
  loadStatisticsDataError,
} from './actions';

export function* getStatisticData(action) {
  const { params } = action;
  try {
    const result = params
      ? yield call(getStatisticDataAPI, params)
      : yield call(getStatisticDataAPI);
    const { data } = result;
    yield put(loadStatisticsDataSuccess(data));
  } catch (err) {
    yield put(loadStatisticsDataError(err));
  }
}

// Individual exports for testing
export default function* StatisticsContainerSaga() {
  yield takeLatest(LOAD_STATISTICS_DATA, getStatisticData);
}
