import classnames from 'classnames/bind';

import styles from './styles';

const cn = classnames.bind(styles);

const Button = ({ text, className, onClick }) => {
  return (
    <button onClick={ onClick } className={cn('button', className) }>{ text }</button>
  )
};

export default Button;