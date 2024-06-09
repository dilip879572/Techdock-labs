import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CCol, CContainer, CRow, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

const AppContent = () => {
  return (
    <CContainer fluid>
      <CRow>
        <CCol>
          <Suspense fallback={<CSpinner color="primary" />}>
            <Routes>
              {routes.map((route, idx) => {
                return (
                  route.element && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      element={<route.element />}
                    />
                  )
                )
              })}
              <Route path="/" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </Suspense>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default React.memo(AppContent)
