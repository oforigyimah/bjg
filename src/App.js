import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import SettingsPageV2 from "./pages/SettingsPageV2";
import DemoPage from "@/pages/DemoPage";
import ProductList from "@/components/ProductList";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}>
                    <Route index element={<ProductList/>}/>
                    <Route path="demo" element={<DemoPage/>}/>
                </Route>
                <Route path="sign-in" element={<LoginPage/>}/>
                <Route path="sign-up" element={<SignUpPage/>}/>
                <Route path="settings" element={<SettingsPageV2/>}/>
                <Route path="product/:id" element={<ProductDetailPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}