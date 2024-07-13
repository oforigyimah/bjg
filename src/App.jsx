import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "@/pages/LandingPage.jsx";
import LoginPage from "@/pages/LoginPage.jsx";
import SignUpPage from "@/pages/SignUpPage.jsx";
import ProductDetailPage from "@/pages/ProductDetailPage.jsx";
import SettingsPageV2 from "./pages/SettingsPageV2.jsx";
import DemoPage from "@/pages/DemoPage.jsx";
import ProductList from "@/components/ProductList.jsx";

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