import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.jsx";
import "./index.css"

import {ThemeProvider} from "@material-tailwind/react";
import {Toaster} from "@/components/ui/toaster"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <App/>
                <ReactQueryDevtools initalIsOpen={false}/>
            </QueryClientProvider>
            <Toaster/>
        </ThemeProvider>
    </React.StrictMode>,
)
