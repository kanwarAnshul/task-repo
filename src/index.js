import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout/index.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<Dashboard />} />
    </Route>,
  ),
)

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

