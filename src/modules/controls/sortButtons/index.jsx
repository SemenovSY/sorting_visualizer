import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ButtonSelect } from "shared";

import styles from './styles';

const mergeSort = () => ({ type: 'SORTING/MERGE_SORT' });
const selectionSort = () => ({ type: 'SORTING/SELECTION_SORT' });
const bubbleSort = () => ({ type: 'SORTING/BUBBLE_SORT' });
const shakerSort = () => ({ type: 'SORTING/SHAKER_SORT' });
const quickSort = () => ({ type: 'SORTING/QUICK_SORT' });

const SortButtons = () => {
  const inProgress = useSelector(({ comparison }) => comparison.inProgress);

  const [method, setMethod] = useState('');

  useEffect(() => {
    if(!inProgress) {
      setMethod('')
    }
  }, [inProgress]);

  const dispatch = useDispatch();

  const onSelectMethod = (method, action) => {
    setMethod(method);
    dispatch(action());
  };

  const buttons = [
    {
      value: 'merge',
      text: 'Слиянием',
      onClick: () => onSelectMethod('merge', mergeSort)
    },
    {
      value: 'selection',
      text: 'Выбором',
      onClick: () => onSelectMethod('selection', selectionSort)
    },
    {
      value: 'bubble',
      text: 'Пузырьком',
      onClick: () => onSelectMethod('bubble', bubbleSort)
    },
    {
      value: 'shaker',
      text: 'Шейкер',
      onClick: () => onSelectMethod('shaker', shakerSort)
    },
    {
      value: 'quick',
      text: 'Быстрая',
      onClick: () => onSelectMethod('quick', quickSort)
    },
  ];

  return(
    <ButtonSelect
      elements={ buttons }
      active={ method }
      disabled={ false }
      wrapperClassName={ styles.wrapper }
    />
  );
};

export default SortButtons;