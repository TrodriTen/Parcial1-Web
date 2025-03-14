import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { IntlProvider } from 'react-intl';
import messagesEs from './i18n/messages_es.js';
import messagesEn from './i18n/messages_en.js';

const messages = {
  es: messagesEs,
  en: messagesEn,
};

const Root = () => {
  const [locale, setLocale] = useState('es');

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {/* Selector visible en toda la app */}
      <div className="language-selector text-end px-3 pt-2">
        <select value={locale} onChange={(e) => setLocale(e.target.value)} className="form-select-sm">
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>
      <App />
    </IntlProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
