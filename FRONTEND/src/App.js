import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import './Style/index.css';
import HomePage from "./Pages/HomePage";
import Category from "./Pages/Category";
import CarDetails from "./Pages/CarDetails";
import Auth from "./Pages/Auth";
import Login from "./Components/Login";
import Register from "./Components/Register";
import UpdateProduct from "./Pages/UpdateProduct";
import { useState } from "react";
import CartPage from "./Pages/CartPage";
import ReservPage from "./Pages/ReservPage";
import OrderDetail from "./Pages/OrderDetail";

function App() {
  const [login, setLogin] = useState("false")
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout setLogin={setLogin} login={login}/>} >
          <Route index element={<HomePage/>}/>
          <Route path="update" element={<UpdateProduct />} />
          <Route path="cart" element={<CartPage/>}/>
          <Route path="reserv" element={<ReservPage />} />
          <Route path="order" element={<OrderDetail />} />
          <Route path="auth" element={<Auth />}>
            <Route index element={<Login setLogin={setLogin}/>} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path=":category" element={<Category/>}>
            <Route path=":id" element={<CarDetails login={login}/>}/>
          </Route> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
