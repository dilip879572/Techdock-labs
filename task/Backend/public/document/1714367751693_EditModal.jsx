import React, { useEffect, useRef, useState } from 'react'
import { putFetch } from 'src/Api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from 'src/components/loader/Loader'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'
import Select from 'react-select'

const EditModal = ({ setEdit, getDetails }) => {
  const apiUrl = process.env.REACT_APP_API_URL
  let res = localStorage.getItem('DocumentEditDetails')
  let response = JSON.parse(res)

  const [data, setData] = useState({
    document_title: response?.document_title,
    document_type: response?.document_type,
  })
  const [document_upload, setDocumentUpload] = useState(response?.document_upload || [])
  const fileInputRef = useRef(null)
  const [validated, setValidated] = useState(false)
  const [loadValue, setLoadValue] = useState(false)

  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target
      setData({ ...data, [name]: value })
    } else {
      setData({ ...data, document_type: e.label })
    }
  }

  const handleFileInputChange = (e) => {
    // without validation
    // setDocumentUpload([...document_upload, ...e.target.files])
    // fileInputRef.current.value = ''

    // adding pdf validation
    const files = Array.from(e.target.files)

    const pdfFiles = files.filter((file) => file.type === 'application/pdf')

    if (pdfFiles.length !== files.length) {
      toast.warning('Es sind nur PDF-Dateien erlaubt.')
    }

    setDocumentUpload([...document_upload, ...pdfFiles])

    fileInputRef.current.value = ''
  }

  const notify = (dataa) => toast(dataa)

  const close = () => {
    setEdit(false)
  }

  const [removedFile, setRemovedFile] = useState([])
  const removeDocument = (index) => {
    const newDocumentUpload = [...document_upload]
    let deletedFile = newDocumentUpload.splice(index, 1)
    setDocumentUpload(newDocumentUpload)
    setRemovedFile((prev) => {
      return [...prev, ...deletedFile]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    const { document_title, document_type } = data
    if (!document_title || !document_type) {
      return toast.error('Bitte füllen Sie alle Angaben aus.')
    }

    try {
      setLoadValue(true)
      const formData = new FormData()
      for (let i = 0; i < document_upload?.length; i++) {
        formData.append('document_upload', document_upload[i])
      }
      formData.append('document_title', document_title)
      formData.append('document_type', document_type)
      formData.append('removedFile', JSON.stringify(removedFile))
      const res = await putFetch(
        `${apiUrl}/document/get_document/update/${response?._id}`,
        formData,
      )
      console.log('document page', res)
      if (res?.status === 200) {
        setLoadValue(false)
        setData({
          document_title: '',
          document_type: '',
          // document_upload: null,
        })
        setDocumentUpload([])
        toast.success('Dokument erfolgreich aktualisiert')
        getDetails()
      } else {
        toast.error('Etwas ist schief gelaufen')
      }
      close()
    } catch (error) {
      console.error(error)
    }
  }
  const cancelData = () => {
    console.log('ash')
    setDocumentUpload([])
    setRemovedFile(response?.document_upload)
  }
  const options = [
    { value: 'Living will', label: 'Patientenverfügung' },
    { value: 'Health care power of attorney', label: 'Gesundheitsvollmacht' },
    { value: 'Power of attorney', label: 'Vorsorgevollmacht' },
    { value: 'care order', label: 'Betreuungsverfügung' },
    { value: 'Feces pass', label: 'Notfallpass' },
    { value: 'Power of attorney digital test', label: 'Vollmacht digitales Erbe' },
    { value: 'Write to', label: 'Anschreiben' },
    { value: 'Personal document', label: 'Persönliches Dokument' },
    { value: 'Other', label: 'Anderes' },
  ]

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
      <div className="modal-dialog modal-form modal-dialog-centered edit-modal-form">
        <div className="modal-content modal-form">
          <div className="modal-header">
            <h5 className="modal-title">Dokument aktualisieren</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={close}
            />
          </div>
          <Form noValidate validated={validated}>
            <div className="modal-body modal-form-wrap">
              <div className="row">
                <label htmlFor="inputPassword" className="col-md-3 col-form-label">
                  Titel
                </label>
                <div className="col-md-9">
                  <input
                    id="title"
                    required
                    name="document_title"
                    value={data.document_title}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="inputPassword" className="col-md-3 col-form-label">
                  Dokumenttyp
                </label>
                <div className="col-md-9">
                  {/* <select
                    id="document_type"
                    name="document_type"
                    value={data.document_type}
                    onChange={handleChange}
                    className="form-control form-select"
                  >
                    <option>--select--</option>
                    <option value="Living will">Patientenverfügung</option>
                    <option value="Health care power of attorney">Gesundheitsvollmacht</option>
                    <option value="Power of attorney">Vorsorgevollmacht</option>
                    <option value="care order">Betreuungsverfügung</option>
                    <option value="Feces pass">Kotfallpass</option>
                    <option value="Power of attorney digital test">Vollmacht digitales Prbe</option>
                    <option value="Write to">Anschreiben</option>
                    <option value="Personal document">Persönliches Dokument</option>
                    <option value="Other">Anderes</option>
                    <option value="Living will">Patientenverfügung</option>
                  </select> */}
                  <Select
                    className="w-100"
                    id="document_type"
                    options={options}
                    onChange={handleChange}
                    value={{
                      label: data.document_type || 'Patientenverfügung',
                      value: data.document_type || 'Patientenverfügung',
                    }}
                    name="document_type"
                  />
                </div>
              </div>
              <div className="row">
                <label htmlFor="inputPassword" className="col-md-3 col-form-label">
                  Datei-Upload
                </label>
                {/* <div className="col-md-8">
                  <input
                    id="fileUpload"
                    type="file"
                    className="form-control"
                    name="document_upload"
                    onChange={handleFileChange}
                  />
                </div> */}

                <div className="col-md-9">
                  <div className="file-upload-wrap">
                    <input
                      ref={fileInputRef}
                      id="fileUpload"
                      type="file"
                      multiple
                      className="form-control"
                      name="document_upload"
                      onChange={handleFileInputChange}
                      // onChange={(e) => setDocumentUpload([...document_upload, ...e.target.files])}
                    />
                    <div className="file-input-wrap">
                      <div className="filename-field">
                        {/* <span>
                          {document_upload?.name
                            ? document_upload?.name
                            : 'Datei-Upload' || response.document_upload
                            ? response.document_upload
                            : 'Datei-Upload'}
                        </span> */}

                        {/* <span>
                          {document_upload?.length
                            ? document_upload.map((file, index) => (
                                <div key={index}>{file.name}</div>
                              ))
                            : 'Datei-Upload' || response.document_upload?.length
                            ? response?.document_upload.map((file, index) => (
                                <div key={index}>{file.filename}</div>
                              ))
                            : 'Datei-Upload'}
                        </span> */}
                        <span>Datei-Upload</span>
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="75"
                          height="75"
                          viewBox="0 0 16 16"
                          fill="none"
                          onClick={cancelData}
                        >
                          <g clipPath="url(#clip0_493_7693)">
                            <path
                              d="M5.89128 5.89128C6.13607 5.64909 6.5319 5.64909 6.75326 5.89128L7.97721 7.11784L9.22461 5.89128C9.4694 5.64909 9.86524 5.64909 10.0866 5.89128C10.3522 6.13607 10.3522 6.5319 10.0866 6.75326L8.88346 7.97721L10.0866 9.22461C10.3522 9.4694 10.3522 9.86524 10.0866 10.0866C9.86524 10.3522 9.4694 10.3522 9.22461 10.0866L7.97721 8.88346L6.75326 10.0866C6.5319 10.3522 6.13607 10.3522 5.89128 10.0866C5.64909 9.86524 5.64909 9.4694 5.89128 9.22461L7.11784 7.97721L5.89128 6.75326C5.64909 6.5319 5.64909 6.13607 5.89128 5.89128ZM14.6673 8.00065C14.6673 11.6829 11.6829 14.6673 8.00065 14.6673C4.31836 14.6673 1.33398 11.6829 1.33398 8.00065C1.33398 4.31836 4.31836 1.33398 8.00065 1.33398C11.6829 1.33398 14.6673 4.31836 14.6673 8.00065ZM8.00065 2.58398C5.00846 2.58398 2.58398 5.00846 2.58398 8.00065C2.58398 10.9928 5.00846 13.4173 8.00065 13.4173C10.9928 13.4173 13.4173 10.9928 13.4173 8.00065C13.4173 5.00846 10.9928 2.58398 8.00065 2.58398Z"
                              fill="#005291"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_493_7693">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg> */}
                      </div>
                      <div className="file-btn">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          // style={{ color: 'white', marginRight: '-60px' }}
                        >
                          <g clipPath="url(#clip0_384_3149)">
                            <path
                              d="M10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16Z"
                              stroke="#005291"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M20 20L15 15"
                              stroke="#005291"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_384_3149">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
          <div className="">
            <div className="filename-field">
              <span>
                {document_upload?.length
                  ? document_upload.map((file, index) => (
                      <>
                        <ul className="d-flex flex-row justify-content-between">
                          <div key={index}>{file.filename || file.name}</div>
                          <button
                            onClick={() => removeDocument(index)}
                            style={{ background: 'white', border: 'none' }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_431_1048)">
                                <path
                                  d="M5 8H19"
                                  stroke="#C20F0F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10 11V16"
                                  stroke="#C20F0F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M14 11V16"
                                  stroke="#C20F0F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6 8L6.85714 18.2857C6.85714 18.7404 7.03775 19.1764 7.35925 19.4979C7.68074 19.8194 8.11677 20 8.57143 20H15.4286C15.8832 20 16.3193 19.8194 16.6408 19.4979C16.9622 19.1764 17.1429 18.7404 17.1429 18.2857L18 8"
                                  stroke="#C20F0F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9 8V5C9 4.73478 9.10536 4.48043 9.29289 4.29289C9.48043 4.10536 9.73478 4 10 4H14C14.2652 4 14.5196 4.10536 14.7071 4.29289C14.8946 4.48043 15 4.73478 15 5V8"
                                  stroke="#C20F0F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_431_1048">
                                  <rect width="24" height="24" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            <span> Löschen</span>
                          </button>
                        </ul>
                      </>
                    ))
                  : ''}
              </span>
            </div>
          </div>
          <div className="modal-footer">
            <div className="btn-wrapper d-flex w-100 m-0 justify-content-end">
              <button
                type="button"
                className="btn btn-cancel"
                data-bs-dismiss="modal"
                onClick={close}
              >
                Abbrechen
              </button>
              <button type="button" className="btn btn-save ms-3" onClick={handleSubmit}>
                {loadValue ? <Loader /> : 'Aktualisieren'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

EditModal.propTypes = {
  setEdit: PropTypes.func.isRequired,
  getDetails: PropTypes.func.isRequired,
}

export default EditModal
