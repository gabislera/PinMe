import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Routes } from './routes/index.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { ContactsProvider } from './context/ContactsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ContactsProvider>
          <Routes />
        </ContactsProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
