import ResetButton from "./resetButton";
import SortButtons from "./sortButtons";
import LengthInput from "./lengthInput";
import SortingSpeed from "./sortingSpeed";

import styles from './styles';

const Controls = () => {
  return (
    <div className={ styles.controls }>
      <div className={ styles.controls__buttons }>
        <ResetButton />
        <SortButtons />
      </div>
      <div className={ styles.controls__sliders }>
        <LengthInput />
        <SortingSpeed />
      </div>
    </div>
  );
};

export default Controls;