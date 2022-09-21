import { useDispatch, useSelector } from "react-redux";

import { RangeInput } from "shared";

const changeSpeed = value => ({ type: 'COMPARISON/SET_SORTING_SPEED', value });

const SortingSpeed = () => {
  const sortingSpeed = useSelector(({ comparison }) => comparison.sortingSpeed);

  const dispatch = useDispatch();

  const onChangeSpeed = multiplier => dispatch(changeSpeed(multiplier));

  return(
    <RangeInput
      value={ sortingSpeed }
      title="Скорость сортировки"
      min={ 1 }
      max={ 20 }
      onValueChange={ onChangeSpeed }
    />
  );
};

export default SortingSpeed;