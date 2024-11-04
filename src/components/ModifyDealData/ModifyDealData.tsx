import styles from './ModifyDealData.module.scss';
import Input from '../UI/Input';
import { Deal } from '../../types/types';
import { formatDateString } from '../../utils/dateUtils';
import Dropdown from '../UI/Dropdown';
import { useEffect, useState } from 'react';

interface ModifyDealDataProps {
  deal: Deal;
  onFieldChange: (field: keyof Deal, value: string | number) => void;
  cancelEditing: boolean;
  saveEditing: boolean;
}

const ModifyDealData: React.FC<ModifyDealDataProps> = (props) => {
  const [editedDeal, setEditedDeal] = useState<Deal>({ ...props.deal });

  useEffect(() => {
    if (!props.cancelEditing) {
      setEditedDeal({ ...props.deal });
    }
  }, [props.cancelEditing]);

  const handleFieldChange = (field: keyof Deal, value: string | number) => {
    console.log(field, value);
    setEditedDeal((prev) => ({ ...prev, [field]: value }));
    props.onFieldChange(field, value); // Сообщаем изменения в родительский компонент (DealPage)
  };

  return (
    <form
      className={styles.containerModify}
      onSubmit={(e) => e.preventDefault()}
    >
      <Dropdown
        id={'status'}
        className={styles.input}
        placeholder="Статус"
        value={editedDeal.status}
        onChange={(e) => handleFieldChange('status', e.target.value)}
        label="Статус"
        addChangeButton={true}
        buttonClassName={styles.customButtonStyle}
        controlled={true}
        isEdit={props.cancelEditing}
        saveEditing={props.saveEditing}
      />
      <Input
        id={'phone'}
        className={styles.input}
        type="text"
        placeholder="Номер телефона"
        value={editedDeal.numberPhone}
        onChange={(e) => handleFieldChange('numberPhone', e.target.value)}
        label="Номер телефона"
        addChangeButton={true}
        buttonClassName={styles.customButtonStyle}
        isEdit={props.cancelEditing}
        controlled={true}
        saveEditing={props.saveEditing}
      />
      <Input
        id={'budget'}
        className={styles.input}
        type="number"
        placeholder="Бюджет"
        value={editedDeal.budget}
        onChange={(e) => handleFieldChange('budget', e.target.value)}
        label="Бюджет"
        addChangeButton={true}
        buttonClassName={styles.customButtonStyle}
        isEdit={props.cancelEditing}
        controlled={true}
        saveEditing={props.saveEditing}
      />
      <Input
        id={'fullName'}
        className={styles.input}
        type="text"
        placeholder="ФИО"
        value={editedDeal.fullName}
        onChange={(e) => handleFieldChange('fullName', e.target.value)}
        label="ФИО"
        addChangeButton={true}
        buttonClassName={styles.customButtonStyle}
        isEdit={props.cancelEditing}
        controlled={true}
        saveEditing={props.saveEditing}
      />
      <Input
        id={'date'}
        className={styles.input}
        type="text"
        placeholder="Дата создания"
        value={formatDateString(editedDeal.createdAt)}
        onChange={(e) => handleFieldChange('fullName', e.target.value)}
        label="Дата создания"
        addChangeButton={true}
        buttonClassName={styles.customButtonStyle}
        isEdit={props.cancelEditing}
        controlled={true}
      />
    </form>
  );
};

export default ModifyDealData;
