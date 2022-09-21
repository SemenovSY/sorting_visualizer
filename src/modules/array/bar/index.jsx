import styles from './styles';

const Bar = ({ width, height, color }) => {
  const barStyles = {
    height: `${ height }px`,
    width: `${ width }px`,
    backgroundColor: color
  };

  return <div className={ styles.bar } style={ barStyles } />;
}

export default Bar;