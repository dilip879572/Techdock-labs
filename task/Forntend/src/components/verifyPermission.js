const data = localStorage.getItem('record')
const loginUser = JSON.parse(data)
const userPermission = loginUser?.user?.role?.permission || []
const isAdmin = loginUser?.user?.user_type === 'admin'
export const verifyPer = () => {
  if (isAdmin || loginUser?.user?.isAdminFullRights === 'true') {
    return ['Klientlnnen', 'Dashboard', 'Einstellungen']
  }

  return userPermission?.map((elem) => {
    const { section_name, p_show } = elem
    if (section_name === 'Dashboard' && p_show === 'yes') {
      return 'Dashboard'
    }
    if (section_name === 'Klientlnnen' && p_show === 'yes') {
      return 'Klientlnnen'
    }
    if (section_name === 'Einstellungen' && p_show === 'yes') {
      return 'Einstellungen'
    } else {
      return null
    }
  })
}

// for client permission start
export const verifyEditPer = () => {
  if (isAdmin || loginUser?.user?.isAdminFullRights === 'true') {
    return ['yes']
  }

  return userPermission?.map((elem) => {
    const { section_name, p_edit } = elem
    if (section_name === 'Klientlnnen' && p_edit === 'owned') {
      return 'owned'
    }
    if (section_name === 'Klientlnnen' && p_edit === 'yes') {
      return 'yes'
    }
  })
}

export const verifyDelPer = () => {
  if (isAdmin || loginUser?.user?.isAdminFullRights === 'true') {
    return ['yes']
  }

  return userPermission?.map((elem) => {
    const { section_name, p_delete } = elem
    if (section_name === 'Klientlnnen' && p_delete === 'owned') {
      return 'owned'
    }
    if (section_name === 'Klientlnnen' && p_delete === 'yes') {
      return 'yes'
    }
  })
}

// end client permission

// start setting permission
export const verifySettingEditPer = () => {
  if (isAdmin || loginUser?.user?.isAdminFullRights === 'true') {
    return ['yes']
  }

  return userPermission?.map((elem) => {
    const { section_name, p_edit } = elem
    if (section_name === 'Einstellungen' && p_edit === 'owned') {
      return 'owned'
    }
    if (section_name === 'Einstellungen' && p_edit === 'yes') {
      return 'yes'
    }
  })
}

export const verifySettingDelPer = () => {
  if (isAdmin || loginUser?.user?.isAdminFullRights === 'true') {
    return ['yes']
  }

  return userPermission?.map((elem) => {
    const { section_name, p_delete } = elem
    if (section_name === 'Einstellungen' && p_delete === 'owned') {
      return 'owned'
    }
    if (section_name === 'Einstellungen' && p_delete === 'yes') {
      return 'yes'
    }
  })
}
