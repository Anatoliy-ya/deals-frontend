import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import DealsPage from './pages/DealsPage';

import Layout from './components/Layout/Layout';
import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import { getDeals } from './features/deals/dealSlice';
import DealPage from './pages/DealPage';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDeals());
  }, [dispatch]);

  return (
    <div className="App">
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<DealsPage />} />
            <Route path="/deals/:id" element={<DealPage />} />
          </Routes>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
