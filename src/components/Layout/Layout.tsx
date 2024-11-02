import styles from './Layout.module.scss';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.containerLayout}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
