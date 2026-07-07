import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Category from '@/pages/Category'
import Cart from '@/pages/Cart'
import Orders from '@/pages/Orders'
import User from '@/pages/User'
import GoodsDetail from '@/pages/GoodsDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="category" element={<Category />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Orders />} />
        <Route path="user" element={<User />} />
      </Route>
      <Route path="/goods/:id" element={<GoodsDetail />} />
    </Routes>
  )
}

export default App