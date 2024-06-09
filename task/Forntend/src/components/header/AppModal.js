import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { putFetch } from 'src/Api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StoreContext } from 'src/StoreContext'

const AppModal = ({ setOpen }) => {
  const { updateProfile, setUpdateProfile } = useContext(StoreContext)
  const notify = (dataa) => toast(dataa)
  const apiUrl = process.env.REACT_APP_API_URL
  let res = localStorage.getItem('record')
  let response = JSON.parse(res)

  const [loadValue, setLoadVale] = useState(false)
  const [data, setData] = useState({
    username: response.user?.username,
    email: response.user?.email,
    lname: response?.user?.lname,
    mobile: response.user?.mobile,
    password: '',
    gender: response.user?.gender,
  })

  const handleChange = (e) => {
    const { name, value, type } = e.target
    const newValue = type === 'radio' ? e.target.value : value
    setData({ ...data, [name]: newValue })
  }

  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoadVale(true)
      const formData = new FormData()
      formData.append('username', data.username)
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('lname', data.lname)
      formData.append('mobile', data.mobile)
      formData.append('gender', data.gender)
      if (selectedFile) {
        formData.append('profileImage', selectedFile)
      }

      const res = await putFetch(`${apiUrl}/user/update/${response.user?._id}`, formData)

      console.log('updatedProfile', res)

      if (res.status === 200) {
        setUpdateProfile(!updateProfile)
        setLoadVale(false)
        notify('Profile Updated Successfully')
        setData({
          username: '',
          lname: '',
          mobile: '',
          password: '',
          gender: '',
        })
        setSelectedFile(null)
        setTimeout(() => {
          setOpen(false)
          // window.location.reload()
        }, 2000)
      } else {
        notify('Something Went Wrong')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className="modal"
      tabIndex={-1}
      style={{
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)',
        maxHeight: '100%',
        color: 'black',
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-form-wrap">
          <div className="modal-header">
            <h5 className="modal-title">Profil MitarbeiterInnen bearbeiten</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="p-3 text-center">
            <div className="upload-avatar-wrap">
              <input type="file" onChange={handleFileChange} ref={fileInputRef} />
              <figure>
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : 'https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg'
                  }
                  alt="Avatar hochladen"
                  onClick={() => fileInputRef.current.click()}
                />
                <figcaption>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_176_8191)">
                      <path
                        d="M19.3596 4.16405L19.8359 4.64036C20.206 5.01038 20.206 5.60872 19.8359 5.97481L18.6904 7.12424L16.8758 5.30955L18.0213 4.16405C18.3913 3.79403 18.9896 3.79403 19.3557 4.16405H19.3596ZM10.2586 11.9306L15.5413 6.644L17.356 8.45869L12.0694 13.7414C11.9552 13.8555 11.8135 13.9382 11.66 13.9815L9.35718 14.6389L10.0146 12.3361C10.0579 12.1826 10.1405 12.0408 10.2547 11.9267L10.2586 11.9306ZM16.6868 2.8296L8.92024 10.5922C8.57777 10.9347 8.32977 11.3559 8.19987 11.8165L7.07405 15.7529C6.97958 16.0836 7.07012 16.4378 7.31418 16.6819C7.55823 16.9259 7.91251 17.0165 8.24317 16.922L12.1796 15.7962C12.6441 15.6624 13.0653 15.4144 13.4038 15.0758L21.1704 7.31319C22.2765 6.20706 22.2765 4.41205 21.1704 3.30591L20.6941 2.8296C19.588 1.72347 17.7929 1.72347 16.6868 2.8296ZM5.46406 4.36481C3.55095 4.36481 2 5.91576 2 7.82886V18.5359C2 20.449 3.55095 22 5.46406 22H16.1711C18.0842 22 19.6352 20.449 19.6352 18.5359V14.1271C19.6352 13.6036 19.214 13.1824 18.6904 13.1824C18.1669 13.1824 17.7457 13.6036 17.7457 14.1271V18.5359C17.7457 19.4059 17.0411 20.1105 16.1711 20.1105H5.46406C4.59411 20.1105 3.88948 19.4059 3.88948 18.5359V7.82886C3.88948 6.95891 4.59411 6.25429 5.46406 6.25429H9.87285C10.3964 6.25429 10.8176 5.8331 10.8176 5.30955C10.8176 4.78601 10.3964 4.36481 9.87285 4.36481H5.46406Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_176_8191">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </figcaption>
              </figure>
            </div>
            <div className="mb-3 px-2 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
                Vorname
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="Vorname"
                  className="form-control"
                  id="inputText"
                />
              </div>
            </div>
            <div className="mb-3 px-2 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
                Nachname
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="lname"
                  value={data.lname}
                  onChange={handleChange}
                  placeholder="Nachname"
                  className="form-control"
                  id="inputText"
                />
              </div>
            </div>
            <div className="mb-3 px-2 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
                Telefon
              </label>
              <div className="col-sm-9">
                <input
                  type="tel"
                  name="mobile"
                  value={data.mobile}
                  onChange={(e) => {
                    const inputValue = e.target.value.replace(/[^0-9+]/g, '') // Allow only digits and the plus sign
                    if (/^\+?[0-9]*$/.test(inputValue)) {
                      handleChange({ target: { name: 'mobile', value: inputValue } })
                    }
                  }}
                  placeholder="e.g., 91+ 8354568464"
                  className="form-control"
                  id="inputPhone"
                  maxLength={10}
                  minLength={3}
                />
              </div>
            </div>
            <div className="mb-3 px-2 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
                Passwort
              </label>
              <div className="col-sm-9">
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="xyz xyz xyz"
                  className="form-control"
                  id="inputPassword"
                />
              </div>
            </div>
            <div className="mb-3 px-2 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
                Mail
              </label>
              <div className="col-sm-9">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Mail"
                  className="form-control"
                  id="inputEmail"
                  disabled
                />
              </div>
            </div>
            <div className="mb-3 px-2 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
                Geschlecht
              </label>
              <div className="col-sm-9">
                <div className="radio-wrap">
                  <div className="radio-input">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={handleChange}
                      checked={data.gender === 'male'}
                      id="male"
                    />{' '}
                    <label htmlFor="male">Männlich</label>
                  </div>
                  <div className="radio-input">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={handleChange}
                      checked={data.gender === 'female'}
                      id="femail"
                    />{' '}
                    <label htmlFor="femail">Weiblich</label>
                  </div>
                  <div className="radio-input">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      onChange={handleChange}
                      checked={data.gender === 'other'}
                      id="other"
                    />
                    <label htmlFor="other">Andere</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer d-flex">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setOpen(false)}
              style={{ background: '#d04545', color: 'white' }}
            >
              Abbrechen
            </button>
            <button
              type="button"
              className="btn"
              onClick={handleSubmit}
              style={{ background: '#005291', color: 'white' }}
            >
              Speichern
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

AppModal.propTypes = {
  setOpen: PropTypes.func.isRequired,
}

export default AppModal
