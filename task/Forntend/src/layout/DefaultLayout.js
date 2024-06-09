import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
const DefaultLayout = () => {
  return (
    <div className="page-wrap">
      {/* <AppSidebar /> */}
      <div className="wrapper min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-md-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
