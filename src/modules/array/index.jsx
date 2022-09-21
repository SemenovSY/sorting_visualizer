import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Bar from './bar';

import styles from './styles';

const WIDTH_MULTIPLIER = window.screen.width;

const ACTIVE_COLOR = '#FF6A59';
const SORTED_COLOR = '#41A262';
const AUXILIARY_COLOR = '#2C7EE7';
const DEFAULT_COLOR = '#F1A217';

const resetArray = () => ({ type: 'CONTROLS/RESET_ARRAY' });

const Array = () => {
  const {
    activeElements,
    auxiliaryElements,
    sortedElements
  } = useSelector(({ comparison }) => ({
    activeElements: comparison.activeElements,
    auxiliaryElements: comparison.auxiliaryElements,
    sortedElements: comparison.sortedElements
  }), shallowEqual);
  const array = useSelector(({ arraySettings }) => arraySettings.array);

  const dispatch = useDispatch();
  const createArray = () => dispatch(resetArray());

  useEffect(() => {
    createArray()
  }, []);

  const barWidth = WIDTH_MULTIPLIER / array.length || 0;

  return (
    <div className={ styles.array }>
      {
        array.map((height, index) => {
            const barColor = sortedElements.includes(index) && SORTED_COLOR
              || activeElements.includes(index) && ACTIVE_COLOR
              || auxiliaryElements.includes(index) && AUXILIARY_COLOR
              || DEFAULT_COLOR;

            return (
              <Bar
                key={ index }
                width={ barWidth }
                height={ height }
                color={ barColor }
              />
            )
          }
        )
      }
    </div>
  );
}

export default Array;