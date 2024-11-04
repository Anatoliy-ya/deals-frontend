import styles from './DealPage.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/UI/Button';
import CommentDeal from '../components/Comments/CommentDeal';
import ModifyDealData from '../components/ModifyDealData/ModifyDealData';
import StatusProgress from '../components/StatusProgress/StatusProgress';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { editDeal, getDealById } from '../features/deals/dealSlice';
import { Deal } from '../types/types';

const DealPage: React.FC = () => {
  const { id } = useParams();
  const selectedId: number | null = id ? parseInt(id) : null;
  const dispatch = useAppDispatch();
  const deal = useAppSelector((state) => state.deals.currentDeal);
  const [editedDeal, setEditedDeal] = useState<Deal | null>(
    deal ? { ...deal } : null
  );
  const [cancelEditing, setCancelEditing] = useState<boolean>(false);
  const [saveEditing, setSaveEditing] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  useEffect(() => {
    if (selectedId !== null && (!deal || deal.id !== selectedId)) {
      dispatch(getDealById(selectedId));
    }
  }, [selectedId]);

  useEffect(() => {
    // Синхронизируем editedDeal с изменениями deal
    if (deal) {
      setEditedDeal({ ...deal });
    }
  }, [deal, cancelEditing, saveEditing]);

  const handleFieldChange = (field: keyof Deal, value: string | number) => {
    setEditedDeal((prev) => (prev ? { ...prev, [field]: value } : null));
    if (!isDirty) setIsDirty(true);
  };

  const prepareDealForSave = (d: Deal) => {
    const { id, comments, ...dealWithoutId } = d;
    return {
      ...dealWithoutId,
      createdAt: new Date(d.createdAt),
      budget: Number(d.budget),
    };
  };

  const handleSave = async () => {
    if (editedDeal !== null && selectedId) {
      const edDeal = prepareDealForSave(editedDeal);
      dispatch(editDeal({ id: selectedId, deal: edDeal }));
      setIsDirty(false);
      setSaveEditing(true);
      setTimeout(() => setSaveEditing(false), 0);
      await dispatch(getDealById(selectedId));
    }
  };

  const handleCancel = () => {
    // Сбрасываем изменения и активируем отмену
    setEditedDeal(deal ? { ...deal } : null);
    setCancelEditing(true);
    setIsDirty(false);
    // Через короткое время сбрасываем флаг, чтобы компоненты смогли "увидеть" изменение
    setTimeout(() => setCancelEditing(false), 0);
  };

  if (!deal) {
    return <div>Deal not found</div>;
  }

  return (
    <div className={styles.containerDeal}>
      <label className={styles.title} htmlFor={deal.title}>
        {deal.title}
      </label>
      <div className={styles.containerStatus}>
        <StatusProgress status={deal.status} />
      </div>
      <div className={styles.containerData}>
        <div className={styles.modifyDeal}>
          <ModifyDealData
            deal={deal}
            onFieldChange={handleFieldChange}
            cancelEditing={cancelEditing}
            saveEditing={saveEditing}
          />
        </div>
        <div className={styles.commentDeal}>
          <CommentDeal comments={deal.comments} dealId={deal.id} />
        </div>
      </div>
      {isDirty && (
        <div className={styles.containerCommentButton}>
          <Button className={styles.button} onClick={handleSave} select={false}>
            Сохранить
          </Button>
          <Button className={styles.button} onClick={handleCancel}>
            Отмена
          </Button>
        </div>
      )}
    </div>
  );
};

export default DealPage;
