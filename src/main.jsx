import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ComplaintProvider } from './context/ComplaintContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import './index.css';

// Providers are ordered so Notifications can react to Complaint changes,
// and both depend on knowing who's logged in.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <ComplaintProvider>
            <App />
          </ComplaintProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
