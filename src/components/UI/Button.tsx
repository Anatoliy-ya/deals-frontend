import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  select?: boolean;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const classButton = `${styles.button} ${props.select === false ? styles.selected : ''} ${
    props.className
  }`;

  return (
    <div className={styles.containerButton}>
      <button className={classButton} onClick={props.onClick} disabled={props.disabled}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
