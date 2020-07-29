import { takeLatest, call, put } from 'redux-saga/effects';
import { getCatgeoryStatisticData as getCatgeoryStatisticDataAPI } from 'api';
import { LOAD_CATEGORY_STATISTICS } from './constants';

import {
  loadCategoryStatisticsSuccess,
  loadCategoryStatisticsError,
} from './actions';

export function* getCategeoryStatisticData(action) {
  const { params } = action;
  try {
    const result = params
      ? yield call(getCatgeoryStatisticDataAPI, params)
      : yield call(getCatgeoryStatisticDataAPI);
    const { data } = result;
    yield put(loadCategoryStatisticsSuccess(data));
  } catch (err) {
    yield put(loadCategoryStatisticsError(err));
  }
}

// Individual exports for testing
export default function* homeTopContainerSaga() {
  yield takeLatest(LOAD_CATEGORY_STATISTICS, getCategeoryStatisticData);
}
