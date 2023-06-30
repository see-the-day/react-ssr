import { createRoot } from 'react-dom/client';
import { App, initPageData } from './App';
import siteData from 'island:site-data';
import { BrowserRouter } from 'react-router-dom';
import { DataContext } from './hooks';
async function renderInBrowser() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('Error');
  }
  const pageData = await initPageData(location.pathname);
  createRoot(containerEl).render(
    <DataContext.Provider value={pageData}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataContext.Provider>
  );
}

renderInBrowser();
