import { useEffect, useState } from 'react';
import Button from './Button';
import styles from './Dropdown.module.scss';

type DropdownProps = {
  id: string;
  className?: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  addChangeButton?: boolean;
  buttonClassName?: string;
  disabled?: boolean;
  isEdit?: boolean;
  saveEditing?: boolean;
  controlled?: boolean;
};

const Dropdown: React.FC<DropdownProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(props.value);
  const classInput = `${styles.containerDropdown} ${props.className}`.trim();

  useEffect(() => {
    setTempValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (props.isEdit) {
      setIsEditing(false);
      setTempValue(props.value);
    }
    if (props.saveEditing) {
      setIsEditing(false);
    }
    if (props.buttonClassName === undefined) {
      setIsEditing(true);
    }
  }, [props.isEdit, props.saveEditing, tempValue]);

  const toggleEdit = () => {
    if (isEditing) {
      setTempValue(props.value); // Сбросить значение при отмене
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
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
      <select
        className={
          isEditing
            ? styles.selectStatus
            : `${styles.selectStatus} ${styles.selected}`
        }
        id={props.id}
        value={tempValue}
        onChange={handleChange}
        disabled={!isEditing}
      >
        <option value="NEW">Новый</option>
        <option value="IN_PROGRESS">В работе</option>
        <option value="ALMOST_FINISHED">Почти завершен</option>
        <option value="SUCCESSFUL">Успешный</option>
        <option value="FAILED">Провал</option>
      </select>
    </div>
  );
};

export default Dropdown;
