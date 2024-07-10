import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import {ThemeProvider} from "@material-tailwind/react";
import {Toaster} from "@/components/ui/toaster";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <App/>
            <Toaster/>
        </ThemeProvider>
    </React.StrictMode>,
);
