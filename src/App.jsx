import "./App.css";
import HomePage from "./components/layouts/HomePage/HomePage";
import SingleProductView from "./components/layouts/SingleProductView/SingleProductView";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/layouts/Cart/Cart";
import Products from "./components/layouts/Products/Products";
import Login from "./components/layouts/Login/Login";
import Signup from "./components/layouts/Signup/Signup";
import CheckoutSuccess from "./components/layouts/CheckoutSuccess/CheckoutSuccess";
import NotFound from "./components/layouts/NotFound/NotFound";
import CurrentlyOrdered from "./components/layouts/CurrentlyOrdered/CurrentlyOrdered";
import AdminLogin from "./components/layouts/AdminLogin/AdminLogin";
import AdminHome from "./components/layouts/AdminHome/AdminHome";
import AdminSubCategory from "./components/layouts/AdminSubCategory/AdminSubCategory";
import AdminProducts from "./components/layouts/AdminProducts/AdminProducts";
import AdminUserDisplayer from "./components/layouts/AdminUserDisplayer/AdminUserDisplayer";
import AdminUserMore from "./components/layouts/AdminUserMore/AdminUserMore";
import UserOrders from "./components/layouts/UserOrders/UserOrders";
import AdminAllOrders from "./components/layouts/AdminAllOrders/AdminAllOrders";
import Banner from "./components/layouts/Banners/Banners";

function App() {
  return (
    <div className="container">
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/singleProduct/:id"
            element={<SingleProductView />}
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/products/:id" element={<Products />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/checkout-success" element={<CheckoutSuccess />}></Route>
          <Route
            path="/currently-ordered"
            element={<CurrentlyOrdered />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/admin-login" element={<AdminLogin />}></Route>
          <Route path="/admin-home" element={<AdminHome />}></Route>
          <Route
            path="/admin-subCategory/:id"
            element={<AdminSubCategory />}
          ></Route>
          <Route path="/admin-products/:id" element={<AdminProducts />}></Route>
          <Route path="/admin-users" element={<AdminUserDisplayer />}></Route>
          <Route
            path="/admin-user-more/:id"
            element={<AdminUserMore />}
          ></Route>
          <Route path="/user-orders" element={<UserOrders />}></Route>
          <Route path="/admin-allOrders" element={<AdminAllOrders />}></Route>
          <Route path="/banner" element={<Banner />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
