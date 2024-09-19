import { StrictMode } from 'react'

import App from './App.tsx'
import './index.css'

import ReactDOM  from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './Context/AppContext.tsx'
import { SearchContextProvider } from './Context/SearchContext.tsx'


 const queryClient= new QueryClient({
   defaultOptions: {
     queries: {
       retry: 0,
      
   },
  },
 })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvider>    
          <App />
          </SearchContextProvider>
        
      </AppContextProvider>
    
    </QueryClientProvider>
    
  </StrictMode>,
)
