import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/Layout'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import GoodsList from '@/pages/Goods/List'
import GoodsAdd from '@/pages/Goods/Add'
import GoodsEdit from '@/pages/Goods/Edit'
import CategoryList from '@/pages/Categories/List'
import CategoryAdd from '@/pages/Categories/Add'
import OrderList from '@/pages/Orders/List'
import OrderDetail from '@/pages/Orders/Detail'
import UserList from '@/pages/Users/List'
import UserDetail from '@/pages/Users/Detail'
import SalesStat from '@/pages/Statistics/Sales'
import UserStat from '@/pages/Statistics/Users'
import GoodsStat from '@/pages/Statistics/Goods'
import Profile from '@/pages/Settings/Profile'
import System from '@/pages/Settings/System'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/goods/list',
        element: <GoodsList />,
      },
      {
        path: '/goods/add',
        element: <GoodsAdd />,
      },
      {
        path: '/goods/edit/:id',
        element: <GoodsEdit />,
      },
      {
        path: '/categories/list',
        element: <CategoryList />,
      },
      {
        path: '/categories/add',
        element: <CategoryAdd />,
      },
      {
        path: '/orders/list',
        element: <OrderList />,
      },
      {
        path: '/orders/detail/:id',
        element: <OrderDetail />,
      },
      {
        path: '/users/list',
        element: <UserList />,
      },
      {
        path: '/users/detail/:id',
        element: <UserDetail />,
      },
      {
        path: '/statistics/sales',
        element: <SalesStat />,
      },
      {
        path: '/statistics/users',
        element: <UserStat />,
      },
      {
        path: '/statistics/goods',
        element: <GoodsStat />,
      },
      {
        path: '/settings/profile',
        element: <Profile />,
      },
      {
        path: '/settings/system',
        element: <System />,
      },
    ],
  },
])

export default router