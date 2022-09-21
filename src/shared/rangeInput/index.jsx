import classnames from "classnames/bind";

import styles from './styles';

const cn = classnames.bind(styles);

const RangeInput = ({
  value,
  title,
  min,
  max,
  disabled,
  wrapperClassName,
  onValueChange
}) => {
  const onInput = (value) => {
    if (disabled) {
      return
    }

    onValueChange(value);
  };

  return(
    <div className={ cn('wrapper', wrapperClassName) }>
      { title && <div className={ styles.title }>{ title }</div> }
      <input
        type='range'
        value={ value }
        min={ min }
        max={ max }
        onInput={ (event) => onInput(Number(event.target.value)) }
        className={ cn('range', { disabled }) }
      />
    </div>
  );
};

export default RangeInput;