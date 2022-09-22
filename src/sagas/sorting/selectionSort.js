import {
  select,
  put,
  race,
  take,
  takeLatest
} from 'redux-saga/effects';

import { startSorting, setNewParams, setPause } from "./sorting";

const SPEED_MULTIPLIER = 100;

function* selectionSortHelper() {
  const { array, arrayLength } = yield select(({ arraySettings }) => ({
    array: arraySettings.array,
    arrayLength: arraySettings.arrayLength
  }));

  yield startSorting();

  const mainArray = array.slice();

  const { success } = yield race({
    success: selectionSort(mainArray, arrayLength),
    canceled: take('COMPARISON/RESET')
  });

  if(success) {
    yield put({ type: 'COMPARISON/TOGGLE_SORT', value: false });
  }
}

function* selectionSort(array, arrayLength) {
  const completedElements = [];

  for(let step = 0; step < arrayLength; step++) {
    let minElement = array[step];
    let minIdx = step;

    yield put({ type: 'COMPARISON/SET_SORTED_ELEMENTS', value: completedElements });

    for(let compareIndex = step; compareIndex < arrayLength; compareIndex++) {
      yield put({ type: 'COMPARISON/SET_ACTIVE_ELEMENTS', value: [minIdx, compareIndex] });

      const activeElement = array[compareIndex];

      if(activeElement < minElement) {
        minElement = activeElement;
        minIdx = compareIndex
      }

      yield setPause(SPEED_MULTIPLIER);
    }

    const params = {
      [step]:  minElement,
      [minIdx]: array[step]
    }

    const temp = array[step];
    array[step] = minElement;
    array[minIdx] = temp;

    yield setNewParams(params);
    yield setPause(SPEED_MULTIPLIER);

    completedElements.push(step);
  }

  yield put({ type: 'COMPARISON/SET_SORTED_ELEMENTS', value: [...completedElements, arrayLength - 1] });

  return true
}

export default [
  takeLatest('SORTING/SELECTION_SORT', selectionSortHelper),
];