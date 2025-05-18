import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Routes } from './routes/index.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { ContactsProvider } from './context/ContactsContext.tsx';
import { ToastProvider } from './context/ToastContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <ThemeProvider>
        <AuthProvider>
          <ContactsProvider>
            <Routes />
          </ContactsProvider>
        </AuthProvider>
      </ThemeProvider>
    </ToastProvider>
  </StrictMode>
);
