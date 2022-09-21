import { delay, put, select } from "redux-saga/effects";

export function* setNewParams(params) {
  const array = yield select(({ arraySettings }) => arraySettings.array);


  for (let index in params) {
    array[index] = params[index];
  }

  yield put({ type: 'ARRAY/SET_ARRAY', value: array });
}

export function* setPause(multiplier = 100) {
  const sortingSpeed = yield select(({ comparison }) => comparison.sortingSpeed);

  yield delay(multiplier / sortingSpeed);
}

export function* startSorting() {
  yield put({ type: 'COMPARISON/RESET' });
  yield put({ type: 'COMPARISON/TOGGLE_SORT', value: true });
}

export function* afterSuccessSorting() {
  const sortedArrayLength = yield select(({ arraySettings }) => arraySettings.arrayLength);

  yield put({type: 'COMPARISON/RESET'});

  for(let length = 1; length <= sortedArrayLength; length++) {
    yield put({ type: 'COMPARISON/SET_SORTED_ELEMENTS', value: Array.from(Array(length).keys()) });
    yield setPause(1);
  }
}