import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from 'react-redux';
import store from './store/index.ts';
import {QueryClientProvider} from "react-query";
import {queryClient} from "./config/queryClient.ts";


createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </StrictMode>
    </QueryClientProvider>
);
