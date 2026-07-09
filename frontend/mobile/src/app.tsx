import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/order/Home'
import Category from '@/pages/order/Category'
import Cart from '@/pages/order/Cart'
import User from '@/pages/user/User'
import GoodsDetail from '@/pages/order/GoodsDetail'
import Login from '@/pages/user/Login'
import Register from '@/pages/user/Register'
import Orders from '@/pages/order/Orders'
import Coupons from '@/pages/coupons/Coupons'
import Favorites from '@/pages/order/Favorites'
import Addresses from '@/pages/user/Addresses'
import Notifications from '@/pages/news/Notifications'
import Settings from '@/pages/user/Settings'
import OrderCheckout from '@/pages/order/OrderCheckout'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="category" element={<Category />} />
        <Route path="category/:id" element={<Category />} />
        <Route path="cart" element={<Cart />} />
        <Route path="user" element={<User />} />
      </Route>
      <Route path="orders" element={<Orders />} />
      <Route path="coupons" element={<Coupons />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="addresses" element={<Addresses />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="settings" element={<Settings />} />
      <Route path="checkout" element={<OrderCheckout />} />
      <Route path="/goods/:id" element={<GoodsDetail />} />
    </Routes>
  )
}

export default App
