import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.jsx";
import { SearchProvider } from "./context/Search.jsx";
import { CartProvider } from "./context/Cart.jsx";
import SoilMonitoring from "./pages/SoilMonitoring.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        
        <BrowserRouter>
          <App />
        </BrowserRouter>
        
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
