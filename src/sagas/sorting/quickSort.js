import {
  select,
  put,
  race,
  take,
  takeLatest
} from 'redux-saga/effects';

import {
  startSorting,
  setNewParams,
  setPause,
  afterSuccessSorting
} from "./sorting";

const SPEED_MULTIPLIER = 100;

function* quickSortHelper() {
  const { array, arrayLength } = yield select(({ arraySettings }) => ({
    array: arraySettings.array,
    arrayLength: arraySettings.arrayLength
  }));

  yield startSorting();

  const { success } = yield race({
    success: quickSort(array, 0, arrayLength - 1),
    canceled: take('COMPARISON/RESET')
  });

  if(success) {
    yield afterSuccessSorting();
  }
}

function* swap(items, firstIndex, secondIndex){
  const params = {
    [firstIndex]: items[secondIndex],
    [secondIndex]: items[firstIndex]
  };

  let temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;

  yield setNewParams(params);
  yield setPause(SPEED_MULTIPLIER);
}

function* partition(items, left, right, pivot) {

  let i = left;
  let j = right;

  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }

    while (items[j] > pivot) {
      j--;
    }

    if (i <= j) {
      yield put({ type: 'COMPARISON/SET_ACTIVE_ELEMENTS', value: [i,j] });

      yield setPause(SPEED_MULTIPLIER);
      yield swap(items, i, j);
      yield setPause(SPEED_MULTIPLIER);

      i++;
      j--;
    }
  }

  return i;
}

function* quickSort(items, left, right) {

  const pivotIndex = Math.floor((right + left) / 2);
  const pivot = items[pivotIndex];

  yield put({ type: 'COMPARISON/SET_AUXILIARY_ELEMENTS', value: [pivotIndex] });

  const index = yield partition(items, left, right, pivot);

  if (left < index - 1) {
    yield quickSort(items, left, index - 1);
  }

  if (index < right) {
    yield quickSort(items, index, right);
  }

  return items;
}

export default [
  takeLatest('SORTING/QUICK_SORT', quickSortHelper),
];