import { createRoot } from 'react-dom/client';
import { App } from './App';
import siteData from 'island:site-data';
import { BrowserRouter } from 'react-router-dom';

function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('Errro');
  }
  createRoot(containerEl).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  console.log(siteData);
}

renderInBrowser();
