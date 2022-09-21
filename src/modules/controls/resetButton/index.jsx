import { useDispatch } from "react-redux";

import { Button } from 'shared';

const resetArray = () => ({ type: 'CONTROLS/RESET_ARRAY' });

const ResetButton = () => {
  const dispatch = useDispatch();

  const onClick = () => dispatch(resetArray());

  return (
    <Button
      text="Пересоздать массив"
      disabled={ false }
      onClick={ onClick }
    />
  );
};

export default ResetButton;
