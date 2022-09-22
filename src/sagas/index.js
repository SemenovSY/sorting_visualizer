import { all } from 'redux-saga/effects';

import controls from './controls';
import mergeSort from './sorting/mergeSort';
import selectionSort from './sorting/selectionSort';
import bubbleSort from './sorting/bubbleSort';
import shakerSort from './sorting/shakerSort';
import quickSort from './sorting/quickSort';

export default function* rootSaga() {
  yield all([
    ...controls,
    ...mergeSort,
    ...selectionSort,
    ...bubbleSort,
    ...shakerSort,
    ...quickSort
  ]);
};