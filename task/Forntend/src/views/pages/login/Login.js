import React from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const navigate = useNavigate()

  const notify = (message) => toast(message)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${apiUrl}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })

        const result = await response.json()

        if (result.success === true) {
          toast.success('Login Successfully')
          const token = result?.user?.tokens[0]?.token
          window.localStorage.setItem('token', token)
          window.localStorage.setItem('record_id', result?.user?._id)
          navigate('/customerList')
          window.location.reload()
        } else {
          notify('Something error')
        }
      } catch (error) {
        console.error('Error:', error)
        toast.error('Something error')
      }
    },
  })

  const Register = () => {
    navigate('/register')
  }

  return (
    <div
      className="min-vh-100 d-flex flex-row align-items-center"
      style={{ background: '#015291' }}
    >
      <CContainer className="form-container">
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup className="mt-3">
              <CCard className="p-4">
                <CCardBody className="p-0">
                  <Form noValidate onSubmit={formik.handleSubmit}>
                    <h4 className="h4-heading">Login</h4>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="12" controlId="validationCustom01">
                        <Form.Label>E-Mail Address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="E-Mail Address"
                          {...formik.getFieldProps('email')}
                          isInvalid={formik.touched.email && formik.errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-2">
                      <Form.Group as={Col} md="12" controlId="validationCustom02">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          {...formik.getFieldProps('password')}
                          isInvalid={formik.touched.password && formik.errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <div>
                      <br />
                      <div className="d-flex">
                        <Button
                          className="form-control form-btn w-50 mx-2"
                          style={{ background: '#005291', color: 'white' }}
                          type="submit"
                        >
                          Login
                        </Button>
                        <Button
                          className="form-control form-btn w-50"
                          style={{ background: '#005291', color: 'white' }}
                          onClick={Register}
                        >
                          Register
                        </Button>
                      </div>
                    </div>
                  </Form>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </div>
  )
}

export default React.memo(Login)
