import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={styles.containerHeader}>
      <h1>Заголовок</h1>
      <h1>Сделки</h1>
    </div>
  );
};

export default Header;
