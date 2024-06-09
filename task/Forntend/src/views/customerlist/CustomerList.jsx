import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'

const CustomerList = () => {
  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center' }}>Welcome to Home Page</h1>
        {/* Add your JSX elements or components here */}

        <img
          src="https://t4.ftcdn.net/jpg/03/41/47/73/360_F_341477352_FPoRvWnWWqdzVFnIWn3on34gYWaSEX2K.jpg"
          style={{ height: '400px', width: '100%' }}
        />
      </div>
      <ToastContainer />
    </>
  )
}

export default React.memo(CustomerList)
