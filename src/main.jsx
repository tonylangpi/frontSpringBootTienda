import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ClientProvider} from './providers/context-auth.jsx'
import { BrowserRouter } from "react-router-dom";
import { SWRProvider } from './swr-provider.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ClientProvider>
        <SWRProvider>
          <App />
        </SWRProvider>
      </ClientProvider>
    </BrowserRouter>
  </StrictMode>
);
