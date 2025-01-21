import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { RecoilRoot } from 'recoil'
import { Toaster } from './components/ui/toaster'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
})
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <RecoilRoot>
  <QueryClientProvider client={queryClient}>
  <StrictMode>
    <App />
  <Toaster/>
  </StrictMode>
  </QueryClientProvider>
  </RecoilRoot>
  </BrowserRouter>
)
