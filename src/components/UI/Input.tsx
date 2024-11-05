import styles from './Input.module.scss';
import { useEffect, useState } from 'react';
import Button from './Button';
import MaskedInput from 'react-text-mask';

interface InputProps {
  id: string;
  placeholder: string;
  label: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  error?: boolean;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
  onFocus?: () => void;
  addChangeButton?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  buttonClassName?: string;
  isEdit?: boolean;
  saveEditing?: boolean;
  controlled?: boolean; // Новый проп для управления режимом
}

const Input: React.FC<InputProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(props.value);
  const [isEmpty, setIsEmpty] = useState(false);
  const classInput = `${styles.containerInput} ${props.className}`;
  const maskInput = [
    '+',
    '7',
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ];

  useEffect(() => {
    if (props.isEdit) {
      setIsEditing(false);
      setTempValue(props.value);
      setIsEmpty(props.value.toString().trim() === '');
    }
    if (props.saveEditing) {
      setIsEditing(false);
    }
    if (props.buttonClassName === undefined) {
      setIsEditing(true);
    }
  }, [props.isEdit, props.saveEditing]);

  const toggleEdit = () => {
    if (isEditing) {
      setTempValue(props.value); // Сбросить значение при отмене
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setIsEmpty(newValue.trim() === '');
    if (props.controlled && props.onChange) {
      props.onChange(e); // Управляемый режим, используем props.onChange
    } else {
      setTempValue(newValue); // Неуправляемый режим, обновляем tempValue
    }
  };

  return (
    <div className={classInput}>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      {props.addChangeButton && (
        <Button
          className={`${styles.button} ${props.buttonClassName || ''}`}
          onClick={() => toggleEdit()}
        >
          {isEditing ? 'Отменить' : 'Изменить'}
        </Button>
      )}
      {isEmpty && (
        <p className={styles.error}>Поле обязательно для заполнения</p>
      )}
      {props.id === 'phone' ? (
        <MaskedInput
          mask={maskInput}
          className={
            isEditing ? styles.input : `${styles.input} ${styles.disabled}`
          }
          id={props.id}
          placeholder={props.placeholder}
          value={props.controlled ? props.value : tempValue}
          onChange={handleChange}
          onBlur={props.onBlur}
          onKeyDown={props.onKeyDown}
          disabled={!isEditing}
        />
      ) : (
        <input
          className={
            isEditing ? styles.input : `${styles.input} ${styles.disabled}`
          }
          type={props.type}
          placeholder={props.placeholder}
          value={props.controlled ? props.value : tempValue} // Выбор значения по режиму
          onChange={handleChange}
          onBlur={props.onBlur}
          onKeyDown={props.onKeyDown}
          disabled={!isEditing}
        />
      )}
    </div>
  );
};

export default Input;
