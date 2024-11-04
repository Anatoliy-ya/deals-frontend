import styles from './StatusProgress.module.scss';
import { translateStatus } from '../../utils/translateStatus';

interface StatusProgressProps {
  status: string;
}
const StatusProgress: React.FC<StatusProgressProps> = (props) => {
  return (
    <div className={styles.containerStatusProgress}>
      <label htmlFor="">Статус</label>
      <div className={styles.progress}>
        <div className={styles.progressLine}>
          <p className={styles.statusText}>{translateStatus(props.status)}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusProgress;
