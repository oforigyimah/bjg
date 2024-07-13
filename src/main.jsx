import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.jsx";
import "./index.css"

import {ThemeProvider} from "@material-tailwind/react";
import {Toaster} from "@/components/ui/toaster"

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <App/>

            <Toaster/>
        </ThemeProvider>
    </React.StrictMode>,
)
