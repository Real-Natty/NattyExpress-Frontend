import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Wishlist from "./pages/Wishlist";
import Payment from "./pages/Payment";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
