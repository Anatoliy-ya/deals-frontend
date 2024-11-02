import styles from './DealTable.module.scss';
import { Deal } from '../../types/types';
import DealItem from '../DealItem/DealItem';

interface DealTableProps {
  deals: Deal[];
  loading: boolean;
}

const DealTable: React.FC<DealTableProps> = (props) => {
  return (
    <div className={styles.containerTable}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>id</th>
            <th>Название</th>
            <th>Статус</th>
            <th>Дата создания</th>
          </tr>
        </thead>
        <tbody>
          {props.deals.map((deal: Deal) => (
            <DealItem key={deal.id} deal={deal} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DealTable;
