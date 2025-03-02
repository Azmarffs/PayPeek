import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence } from 'framer-motion';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
  <StrictMode>
    <AnimatePresence>
      <App />
    </AnimatePresence>
  </StrictMode>
);