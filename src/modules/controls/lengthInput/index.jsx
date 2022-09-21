import { useDispatch, useSelector } from "react-redux";

import { RangeInput } from 'shared';

import styles from './styles';

const setArrayLength = value => ({ type: 'CONTROLS/SET_ARRAY_LENGTH', value });

const LengthInput = () => {
  const arrayLength = useSelector(({ arraySettings }) => arraySettings.arrayLength);
  const inProgress = useSelector(({ comparison }) => comparison.inProgress);

  const dispatch = useDispatch();

  const onChangeLength = length => dispatch(setArrayLength(length));

  return(
    <RangeInput
      value={ arrayLength }
      title="Длина массива"
      min={ 15 }
      max={ 180 }
      disabled={ inProgress }
      wrapperClassName={ styles.range }
      onValueChange={ onChangeLength }
    />
  );
};

export default LengthInput;