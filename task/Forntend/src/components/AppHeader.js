import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CContainer, CHeader, CHeaderNav, CDropdownItem } from '@coreui/react'
import { AiOutlineMail } from 'react-icons/ai'

import { AppBreadcrumb } from './index'
const content = (
  <div style={{ width: '220px' }} className="notification-wrap">
    <p>Benachrichtigungen</p>
    <hr />
    <div className="row">
      <div className="col-sm-2">
        <AiOutlineMail style={{ color: 'black' }} />
      </div>
      <div className="col-sm-10">
        <p>
          Lorem Ipsum ist einfach{' '}
          <Link style={{ textDecoration: 'none', color: '#015291' }}>
            Lorem Ipsum ist einfach ei
          </Link>
        </p>
      </div>
    </div>
    <hr style={{ marginTop: '-10px' }} />
    <div className="row">
      <div className="col-sm-2">
        <AiOutlineMail style={{ color: 'black' }} />
      </div>
      <div className="col-sm-10">
        <p>
          Lorem Ipsum ist einfach ein{' '}
          <Link style={{ textDecoration: 'none', color: '#015291' }}>
            Lorem Ipsum ist einfach ei
          </Link>
        </p>
      </div>
    </div>
    <hr style={{ marginTop: '-10px' }} />
    <div className="row">
      <div className="col-sm-2">
        <AiOutlineMail style={{ color: 'black' }} />
      </div>
      <div className="col-sm-10">
        <p>
          Lorem Ipsum ist einfach{' '}
          <Link style={{ textDecoration: 'none', color: '#015291' }}>
            Lorem Ipsum ist einfach ei
          </Link>
        </p>
      </div>
    </div>
  </div>
)
const AppHeader = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    let a = window.localStorage.clear()
    if (a === undefined) {
      navigate('/')
      window.location.reload()
    }
  }
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <div className="d-flex justify-content-end align-items-center w-100">
          <AppBreadcrumb />
          <CHeaderNav className="ms-3">
            <CDropdownItem onClick={handleLogout}>
              <svg
                width="19"
                height="20"
                viewBox="0 0 19 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_382_11646)">
                  <path
                    d="M17.1469 10.5692C17.4374 10.2545 17.4374 9.74554 17.1469 9.43415L13.1908 5.14509C12.9003 4.83036 12.4305 4.83036 12.1431 5.14509C11.8557 5.45982 11.8526 5.96875 12.1431 6.28013L14.832 9.19308L7.22588 9.19643C6.81482 9.19643 6.48412 9.55469 6.48412 10C6.48412 10.4453 6.81482 10.8036 7.22588 10.8036H14.832L12.1431 13.7165C11.8526 14.0312 11.8526 14.5402 12.1431 14.8516C12.4336 15.1629 12.9034 15.1663 13.1908 14.8516L17.1469 10.5692ZM6.73137 4.10714C7.14243 4.10714 7.47313 3.74888 7.47313 3.30357C7.47313 2.85826 7.14243 2.5 6.73137 2.5H4.25884C2.75678 2.5 1.53906 3.8192 1.53906 5.44643V14.5536C1.53906 16.1808 2.75678 17.5 4.25884 17.5H6.73137C7.14243 17.5 7.47313 17.1417 7.47313 16.6964C7.47313 16.2511 7.14243 15.8929 6.73137 15.8929H4.25884C3.57581 15.8929 3.02258 15.2935 3.02258 14.5536V5.44643C3.02258 4.70647 3.57581 4.10714 4.25884 4.10714H6.73137Z"
                    fill="#005291"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_382_11646">
                    <rect width="18.4615" height="21.6667" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              &nbsp;Logout
            </CDropdownItem>
          </CHeaderNav>
        </div>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
