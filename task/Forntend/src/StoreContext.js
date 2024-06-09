import PropTypes from 'prop-types'
import React, { createContext, useState } from 'react'

export const StoreContext = createContext({
  setEditEmployee: Boolean,
  editEmployee: Boolean,
  setEditUser: Boolean,
  editUser: Boolean,
  setUpdateProfile: Boolean,
  updateProfile: Boolean,
})

const StoreProvider = ({ children }) => {
  const [editEmployee, setEditEmployee] = useState(false)
  const [editUser, setEditUser] = useState(false)
  const [updateProfile, setUpdateProfile] = useState(false)
  return (
    <StoreContext.Provider
      value={{
        setEditEmployee,
        editEmployee,
        setEditUser,
        editUser,
        setUpdateProfile,
        updateProfile,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

StoreProvider.propTypes = {
  children: PropTypes.func.isRequired,
}

export default StoreProvider
