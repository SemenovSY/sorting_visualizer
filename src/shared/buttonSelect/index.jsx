import classnames from 'classnames/bind';

import styles from './styles';

const cn = classnames.bind(styles);

const ButtonSelect = ({ elements, active, disabled, wrapperClassName }) => {

  const onSelect = callback => {
    if(disabled) {
      return
    }

    callback();
  };

  return (
    <div className={ cn('wrapper', wrapperClassName) }>
      {
        elements.map(({ value, text, onClick }, index) => (
          <button
            key={ index }
            className={ cn('button', { 'button--disabled': disabled, 'button--active': value === active  }) }
            onClick={ () => onSelect(onClick) }
          >
            { text }
          </button>
        ))
      }
    </div>
  );
};

export default ButtonSelect;