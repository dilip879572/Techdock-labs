import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCardImage,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'
import HvdImage from 'src/assets/images/hvd-logo.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CHeaderToggler
        className="hamburger-icon"
        onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
      >
        <span>
          {/* <CIcon icon={cilMenu} size="lg" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M4.26281 6.56673C4.02438 6.80516 4.02438 7.1907 4.26281 7.4266L8.32119 11.4875C8.55962 11.7259 8.94517 11.7259 9.18106 11.4875C9.41695 11.2491 9.41949 10.8635 9.18106 10.6276L5.55388 6.99793L9.1836 3.37075C9.42203 3.13232 9.42203 2.74677 9.1836 2.51088C8.94517 2.27499 8.55962 2.27245 8.32373 2.51088L4.26281 6.56673Z"
              fill="#313131"
            />
          </svg>
        </span>
      </CHeaderToggler>
      <CSidebarBrand className="mb-4 bg-transparent pt-1" to="/">
        <CCardImage orientation="top px-3" src={HvdImage} />
        <CIcon className="sidebar-brand-full" src={HvdImage} height={50} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={50} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
