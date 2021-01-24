import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from "react-router-dom";
import Layout from './Layout';
import AppRoutes from "./routes";

const App = () => {
  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
}

export default App;
