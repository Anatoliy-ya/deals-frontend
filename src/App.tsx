import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import DealsPage from './pages/DealsPage';

import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<DealsPage />} />
          </Routes>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
