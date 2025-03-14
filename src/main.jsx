import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { IntlProvider } from 'react-intl';
import messages_es from './i18n/messages_es';
import messages_en from './i18n/messages_en';

const messages = {
  es: messages_es,
  en: messages_en
};

const language = navigator.language.split(/[-_]/)[0]; // "es" o "en"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IntlProvider locale={language} messages={messages[language]}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
