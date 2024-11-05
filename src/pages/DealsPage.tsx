import styles from './DealsPage.module.scss';
import { useState } from 'react';
import Button from '../components/UI/Button';
import DealTable from '../components/DealTable/DealTable';
import CreateDealModal from '../components/Modals/CreateDealModal';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addDeal } from '../features/deals/dealSlice';
import { selectCompletedDeals } from '../features/deals/selectors';
import { closeModal, openModal } from '../store/slices/uiSlice';
import { StatusKey, statusMap } from '../types/types';

const DealsPage = () => {
  const dispatch = useAppDispatch();
  const deals = useAppSelector((state) => state.deals.deals);
  const isOpenModal = useAppSelector((state) => state.ui.isModalOpen);
  const completedDeals = useAppSelector(selectCompletedDeals);
  const [navButton, setNavButton] = useState('Все');

  const handleCreateDeal = (
    title: string,
    statusDisplay: StatusKey,
    createdAt: Date
  ) => {
    const status = statusMap[statusDisplay];
    dispatch(
      addDeal({
        title,
        status,
        createdAt,
        numberPhone: '',
        budget: 0,
        fullName: '',
      })
    );
    dispatch(closeModal());
  };

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <div className={styles.containerDeals}>
      <Button onClick={handleOpenModal} className={styles.buttonCreateDeal}>
        Создать
      </Button>
      <div className={styles.navButton}>
        <Button
          onClick={() => setNavButton('Все')}
          select={navButton === 'Все' ? false : true}
        >
          Все
        </Button>
        <Button
          onClick={() => setNavButton('Архив')}
          select={navButton === 'Архив' ? false : true}
        >
          Архив
        </Button>
      </div>
      {navButton === 'Все' && <DealTable deals={deals} />}
      {navButton === 'Архив' && <DealTable deals={completedDeals} />}
      {isOpenModal && <CreateDealModal handleCreateDeal={handleCreateDeal} />}
    </div>
  );
};

export default DealsPage;
