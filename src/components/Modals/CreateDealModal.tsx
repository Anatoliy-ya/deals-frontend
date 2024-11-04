import styles from './CreateDealModal.module.scss';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { closeModal } from '../../store/slices/uiSlice';
import { StatusKey } from '../../types/types';

interface CreateDealModalProps {
  handleCreateDeal: (
    title: string,
    statusDisplay: StatusKey,
    createdAt: Date
  ) => void;
}

const CreateDealModal: React.FC<CreateDealModalProps> = (props) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [hasError, setHasError] = useState(false);
  console.log('error', hasError);
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value.trim()) {
      setHasError(false); // Убирает ошибку, если текст введен
    }
  };

  const handleCreateDeal = () => {
    props.handleCreateDeal(title, 'Новый', new Date());
    setHasError(false); // Сбрасывает ошибку, если значение введено
  };

  const handleCloseModal = () => {
    console.log('close modal');
    dispatch(closeModal());
  };

  const handleInputBlur = () => {
    if (!title.trim()) {
      console.log('blur');
      setHasError(true); // Устанавливает ошибку, если поле пустое после потери фокуса
    }
  };

  return (
    <div className={styles.containerModal}>
      <div className={styles.modal}>
        <h1>Создать сделку</h1>
        <Input
          id={title + new Date().getTime()}
          placeholder="Введите название"
          label="название"
          value={title}
          onChange={handleChangeTitle}
          type="text"
          error={hasError}
          onBlur={handleInputBlur}
          controlled={true}
        />
        <div className={styles.buttons}>
          <Button onClick={handleCreateDeal} select={false} disabled={hasError}>
            Создать
          </Button>
          <Button onClick={handleCloseModal} select={true}>
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateDealModal;
