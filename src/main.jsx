import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Components/Routes/Routes';
import AuthProvider from './Components/Providers/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {HelmetProvider}  from 'react-helmet-async';
import  {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient();

 ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ToastContainer />
          <div className='max-w-screen-xl mx-auto'>
            <RouterProvider router={router} />
          </div>
        </HelmetProvider>
        <ToastContainer />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
