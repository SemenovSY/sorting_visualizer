import { all } from 'redux-saga/effects';

import controls from './controls'
import bubbleSort from "./sorting/bubbleSort";
import shakerSort from "./sorting/shakerSort";
import mergeSort from "./sorting/mergeSort";
import quickSort from "./sorting/quickSort";

export default function* rootSaga() {
  yield all([
    ...controls,
    ...bubbleSort,
    ...shakerSort,
    ...mergeSort,
    ...quickSort
  ]);
};