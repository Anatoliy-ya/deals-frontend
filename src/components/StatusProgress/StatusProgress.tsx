import styles from './StatusProgress.module.scss';
import { translateStatus } from '../../utils/translateStatus';

interface StatusProgressProps {
  status: string;
}
const StatusProgress: React.FC<StatusProgressProps> = (props) => {
  const getStatusClass = () => {
    switch (props.status) {
      case 'IN_PROGRESS':
        return styles.inProgress;
      case 'ALMOST_FINISHED':
        return styles.almostFinished;
      case 'SUCCESSFUL':
        return styles.successful;
      case 'FAILED':
        return styles.failed;
      default:
        return styles.default; // для статуса NEW или любого другого
    }
  };

  return (
    <div className={styles.containerStatusProgress}>
      <label htmlFor="">Статус</label>
      <div className={styles.progress}>
        <div className={`${styles.progressLine} ${getStatusClass()}`}>
          <p className={styles.statusText}>{translateStatus(props.status)}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusProgress;
