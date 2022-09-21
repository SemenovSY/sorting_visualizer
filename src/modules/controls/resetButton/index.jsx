import { useDispatch } from "react-redux";

import { Button } from 'shared';

import styles from './styles';

const resetArray = () => ({ type: 'CONTROLS/RESET_ARRAY' });

const ResetButton = () => {
  const dispatch = useDispatch();

  const onClick = () => dispatch(resetArray());

  return (
    <Button
      text="Пересоздать массив"
      className={ styles.button }
      disabled={ false }
      onClick={ onClick }
    />
  );
};

export default ResetButton;