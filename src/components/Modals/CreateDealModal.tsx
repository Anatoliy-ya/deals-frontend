import styles from './CreateDealModal.module.scss';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { closeModal } from '../../store/slices/uiSlice';

interface CreateDealModalProps {
  handleCreateDeal: (title: string) => void;
}

const CreateDealModal: React.FC<CreateDealModalProps> = (props) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value.trim()) {
      setHasError(false); // Убираем ошибку, если текст введен
    }
  };

  const handleCreateDeal = () => {
    props.handleCreateDeal(title);
    setHasError(false); // Сбрасываем ошибку, если значение введено
  };

  const handleCloseModal = () => {
    console.log('close modal');
    dispatch(closeModal());
  };

  const handleInputBlur = () => {
    if (!title.trim()) {
      setHasError(true); // Устанавливаем ошибку, если поле пустое после потери фокуса
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
