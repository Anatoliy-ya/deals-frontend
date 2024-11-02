import Button from './Button';
import styles from './Input.module.scss';

interface InputProps {
  id: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  className?: string;
  disabled?: boolean;
  error: boolean;
  onBlur: () => void;
  onFocus?: () => void;
  changeButton?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const classInput = `${styles.input} ${props.className}`;
  console.log('@Input', props);
  return (
    <div className={styles.containerInput}>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      {props.changeButton && (
        <Button
          className={styles.button}
          onClick={() => console.log('click change button')}
          disabled={props.error}>
          Изменить
        </Button>
      )}
      {props.error && <p className={styles.error}>Поле обязательно для заполнения</p>}
      <input
        className={classInput}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
