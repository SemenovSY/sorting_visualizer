import {
  select,
  put,
  race,
  take,
  takeLatest
} from 'redux-saga/effects';

import { startSorting, setNewParams, setPause } from "./sorting";

const SPEED_MULTIPLIER = 60;

function* shakerSortHelper() {
  const { array, arrayLength } = yield select(({ arraySettings }) => ({
    array: arraySettings.array,
    arrayLength: arraySettings.arrayLength
  }));

  yield startSorting();

  const { success } = yield race({
    success: shakerSort(array, arrayLength),
    canceled: take('COMPARISON/RESET')
  });

  if(success) {
    yield put({ type: 'COMPARISON/TOGGLE_SORT', value: false });
  }
}

function* swap(array, i, j) {
  const params = {
    [i]: array[j],
    [j]: array[i]
  };

  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  yield setNewParams(params);
  yield setPause(SPEED_MULTIPLIER);
}

function* shakerSort(array, arrayLength) {

  let completedElements = [];

  let left = 0;
  let right = arrayLength - 1;

  let leftSwap = 0;
  let rightSwap = arrayLength - 1;

  while (left < right) {
    for (let i = left; i < right; i++) {

      yield put({ type: 'COMPARISON/SET_ACTIVE_ELEMENTS', value: [i, i + 1] });
      yield setPause(SPEED_MULTIPLIER);

      if (array[i] > array[i + 1]) {
        yield swap(array, i, i + 1);

        rightSwap = i;
      }
    }

    if(rightSwap === right) {
      completedElements = Array.from(Array(arrayLength).keys());

      yield put({ type: 'COMPARISON/SET_SORTED_ELEMENTS', value: completedElements });

      return true;
    }

    right = rightSwap;

    completedElements = [...Array.from(Array(left).keys()), ...Array.from(Array(arrayLength).keys()).splice(right + 1)];

    yield put({ type: 'COMPARISON/SET_SORTED_ELEMENTS', value: completedElements });

    for (let i = right; i > left; i--) {
      yield put({ type: 'COMPARISON/SET_ACTIVE_ELEMENTS', value: [i - 1, i] });
      yield setPause(SPEED_MULTIPLIER);

      if (array[i] < array[i - 1]) {
        yield swap(array, i, i - 1);

        leftSwap = i;
      }
    }

    left = leftSwap;

    completedElements = [...Array.from(Array(left).keys()), ...Array.from(Array(arrayLength).keys()).splice(right + 1)];

    yield put({ type: 'COMPARISON/SET_SORTED_ELEMENTS', value: completedElements });
  }

  yield put({ type: 'COMPARISON/SET_SORTED_ELEMENTS', value: Array.from(Array(arrayLength).keys()) });

  return true;
}

export default [
  takeLatest('SORTING/SHAKER_SORT', shakerSortHelper),
];