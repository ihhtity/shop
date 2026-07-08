import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Category from '@/pages/Category'
import Cart from '@/pages/Cart'
import User from '@/pages/User'
import GoodsDetail from '@/pages/GoodsDetail'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Orders from '@/pages/Orders'
import Coupons from '@/pages/Coupons'
import Favorites from '@/pages/Favorites'
import Addresses from '@/pages/Addresses'
import Notifications from '@/pages/Notifications'
import Settings from '@/pages/Settings'

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
        <Route path="orders" element={<Orders />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="addresses" element={<Addresses />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/goods/:id" element={<GoodsDetail />} />
    </Routes>
  )
}

export default App
