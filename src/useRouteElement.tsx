import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/ResgisterLayout'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'

import Lesson from './pages/LessonList'
import FlashCardList from './pages/FlashCardList'
import Quiz from './pages/Quiz'

import MyCanvasDraw from './pages/MyCanvasDraw'
import TestList from './pages/TestList'
import Admin from './pages/Admin'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
function AdminRoute() {
  const { isAdmin } = useContext(AppContext)
  return isAdmin ? <Outlet /> : <Navigate to='/login' />
}
export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },

    {
      path: 'lesson',
      index: true,
      element: (
        <MainLayout>
          <Lesson />
        </MainLayout>
      )
    },
    {
      path: 'lesson/flashcard/:id',
      index: true,
      element: (
        <MainLayout>
          <FlashCardList />
        </MainLayout>
      )
    },
    {
      path: 'lesson/quiz/:id',
      index: true,
      element: (
        <MainLayout>
          <Quiz />
        </MainLayout>
      )
    },

    {
      path: '/writing',
      index: true,
      element: (
        <MainLayout>
          <MyCanvasDraw />
        </MainLayout>
      )
    },
    {
      path: '/testlist',
      index: true,
      element: (
        <MainLayout>
          <TestList />
        </MainLayout>
      )
    },

    {
      path: '',
      element: <AdminRoute />,
      children: [
        {
          path: 'admin',
          index: true,
          element: (
            <MainLayout>
              <Admin />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'profile',
          index: true,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: '/register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElement
}
