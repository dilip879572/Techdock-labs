import React from 'react'
const CustomerList = React.lazy(() => import('./views/customerlist/CustomerList'))
const Login = React.lazy(() => import('./views/pages/login/Login'))

const auth = localStorage.getItem('token')
let routes

if (auth) {
  routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/customerlist', name: 'CustomerList', element: CustomerList },
  ]
} else {
  routes = [{ path: '/login', element: Login }]
}

export default routes
