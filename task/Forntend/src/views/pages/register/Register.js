import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilPhone } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  const notify = (message) => toast(message)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      contact: '',
      user_type: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
      contact: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        let response = await fetch(`${apiUrl}/user/register`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        let result = await response.json()
        toast.success('Register Successfully')

        window.localStorage.setItem('student', JSON.stringify(result))
        navigate('/login')
      } catch (error) {
        console.error('Error:', error)
        toast.error('Something error')
        notify('An error occurred. Please try again later.')
      }
    },
  })

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={formik.handleSubmit}>
                  <h5 style={{ textAlign: 'center', textTransform: 'uppercase' }}>Register</h5>
                  <p className="text-medium-emphasis">Create your account</p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div>{formik.errors.email}</div>
                    ) : null}
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      id="contact"
                      name="contact"
                      type="text"
                      placeholder="Contact"
                      {...formik.getFieldProps('contact')}
                    />
                    {formik.touched.contact && formik.errors.contact ? (
                      <div>{formik.errors.contact}</div>
                    ) : null}
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </div>
  )
}

export default React.memo(Register)
