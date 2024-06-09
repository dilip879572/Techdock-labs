import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { MdAdd, MdOutlineEdit } from 'react-icons/md'
import { Divider, Table } from 'antd'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Select from 'react-select'
import { FaEye } from 'react-icons/fa'
import { postFetchUser } from 'src/Api'
import DeleteModal from './DeleteModal'
import Customer from '../Customer'
import EditModal from './EditModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { verifyDelPer, verifyEditPer } from 'src/components/verifyPermission'
import { RiDeleteBinLine } from 'react-icons/ri'
import ViewModel from './ViewModel'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const Document = () => {
  let lgUser = localStorage.getItem('record')
  let loginData = JSON.parse(lgUser)
  let ress = localStorage.getItem('customerRecord')
  // //console.log(ress)
  let resultt = JSON.parse(ress)
  // console.log('lguser', resultt?._id)

  const notify = (dataa) => toast(dataa)
  const [edit, setEdit] = useState(false)
  const [view, setView] = useState(false)
  const columns = [
    {
      title: 'DOKUMENTENTYP',
      dataIndex: 'document_type',
    },
    {
      title: 'TITEL',
      dataIndex: 'document_title',
      render: (text) => <a>{text}</a>,
      width: '20%',
    },
    {
      title: 'DATUM',
      dataIndex: 'created_at',
      render: (text) => {
        const date = new Date(text)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return <a>{`${day}.${month}.${year}`}</a>
      },
      width: '20%',
    },
    {
      title: 'DOKUMENTEN',
      dataIndex: 'document_upload',
      width: '50%',
      render: (_, record) => {
        if (record.document_upload && record.document_upload.filename) {
          return record.document_upload.filename
        }
        return null // Or you can return a default value if filename is not available
      },
    },

    {
      title: 'AKTION',
      dataIndex: 'action',
      render: (_, record) => (
        <>
          {/* {(loginData?.user?._id === record?.added_by && verifyEditPer().includes('owned')) ||
          verifyEditPer().includes('yes') ||
          loginData?.user?.isAdminFullRights === 'true' ? ( */}
          <>
            <button
              style={{ background: 'none', border: 'none' }}
              onClick={() => handleShowDoc(record)}
            >
              <FaEye className="fs-5" style={{ color: '#5C86B4' }} />
              &nbsp;&nbsp;Anzeigen
            </button>
          </>
          {/* ) : (
            ''
          )} */}
          {(loginData?.user?._id === record?.added_by && verifyEditPer().includes('owned')) ||
          verifyEditPer().includes('yes') ||
          loginData?.user?.isAdminFullRights === 'true' ? (
            <>
              <button
                style={{ background: 'none', border: 'none' }}
                onClick={() => handleEdit(record)}
              >
                <MdOutlineEdit className="fs-5" style={{ color: '#5C86B4' }} />
                &nbsp;&nbsp;Bearbeiten
              </button>
            </>
          ) : (
            ''
          )}

          {(loginData?.user?._id === record?.added_by && verifyDelPer().includes('owned')) ||
          verifyDelPer().includes('yes') ||
          loginData?.user?.isAdminFullRights === 'true' ? (
            <>
              <button
                style={{ background: 'none', border: 'none' }}
                onClick={() => handleDelete(record._id)}
              >
                <RiDeleteBinLine className="text-danger text-bold fs-5" /> Löschen
              </button>
            </>
          ) : (
            ''
          )}
        </>
      ),
    },
  ]
  const [hide, setHide] = useState(false)
  const [documentId, setDocumentId] = useState('')
  const [selectionType, setSelectionType] = useState('checkbox')
  const [show, setShow] = useState(false)
  const apiUrl = process.env.REACT_APP_API_URL
  // const [document_type, setDocumentType] = useState()
  // const [document_title, setDocumentTitle] = useState()
  let res = localStorage.getItem('customerRecord')
  let customerRecord = JSON.parse(res)
  const [data, setData] = useState({
    document_title: '',
    document_type: '',
    // document_upload: '',
    customer_id: customerRecord?._id,
    added_by: loginData?.user?._id,
  })

  const [document_upload, setDocumentUpload] = useState(null)
  const fileInputRef = useRef(null)
  const [documentRecord, setDocumentRecord] = useState([])
  const handleEdit = (record) => {
    let recordData = JSON.stringify(record)
    localStorage.setItem('DocumentEditDetails', recordData)
    setEdit(true)
  }
  // console.log('asjhjdgas', document_upload.name)
  const [page, setPage] = useState(1)
  const [countPage, setCountPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState('')
  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const handleChange = (e) => {
    if (e.target) {
      const { name, value } = e.target
      setData({ ...data, [name]: value })
    } else {
      setData({ ...data, document_type: e.label })
    }
  }

  const handleFileInputChange = (e) => {
    // setDocumentUpload([...document_upload, ...e.target.files])
    // fileInputRef.current.value = ''

    // const files = Array.from(e.target.files)
    // console.log('files', files)
    // const pdfFiles = files.filter((file) => file.type === 'application/pdf')

    // if (pdfFiles.length !== files.length) {
    //   toast.warning('Es sind nur PDF-Dateien erlaubt.')
    // }

    // setDocumentUpload([...document_upload, ...pdfFiles])

    // fileInputRef.current.value = ''
    console.log(e.target)
    setDocumentUpload(e.target.file)
  }

  const removeDocument = (index) => {
    // const newDocumentUpload = [...document_upload];
    // newDocumentUpload.splice(index, 1);
    setDocumentUpload([])
  }

  const handleClose = () => {
    setShow(false)
    setData({
      document_title: '',
      document_type: '',
    })
    setDocumentUpload([])
  }
  const handleShow = () => setShow(true)

  const handleDelete = (documentId) => {
    // console.log(`Deleting customer with ID: ${documentId}`)
    setDocumentId(documentId)
    setHide(true)
  }
  const handleShowDoc = async (record) => {
    let recordData = JSON.stringify(record)
    localStorage.setItem('DocumentEditDetails', recordData)
    setView(true)
  }
  console.log('document', document_upload?.name)
  const saveData = async (e) => {
    try {
      if (!data.document_title || !data.document_type) {
        return notify('Bitte füllen Sie alle Angaben aus')
      }

      e.preventDefault()
      const myForm = new FormData()
      // for (let i = 0; i < document_upload?.length; i++) {
      //   myForm.append('document_upload', document_upload[i])
      // }
      myForm.append('document_upload', document_upload)
      myForm.append('document_title', data?.document_title)
      myForm.append('document_type', data?.document_type)
      myForm.append('customer_id', customerRecord?._id)
      myForm.append('added_by', loginData?.user?._id)
      // myForm.append('document_upload', document_upload)

      const url = `${apiUrl}/document/create_document`
      // console.log(myForm)
      // const url = `${apiUrl}/document/create_document?page=${page}`
      // console.log(url)
      const response = await postFetchUser(url, myForm)
      // console.log('ashishdocu', response)
      notify('Dokumentdaten erfolgreich gespeichert')
      setData({
        document_title: '',
        document_type: '',
      })
      setDocumentUpload([])
      handleClose()
      getDetails()
    } catch (error) {
      return error
    }
  }

  const getDetails = async () => {
    try {
      const result = await fetch(
        `${apiUrl}/document/get_document/${resultt?._id}?page=${page}&resultPerPage=${itemsPerPage}`,
      )
      const data = await result.json()
      setCountPage(data?.pageCount)
      const activeRecords = data?.result?.filter((record) => record.is_deleted === 'active')
      setDocumentRecord(activeRecords)
    } catch (error) {
      console.error('Error fetching customer record:', error)
    }
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

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10))
    setPage(1)
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(100%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
    opacity: 0,
    background: 'white',
    width: '100%',
  })

  const Container = styled('div')({
    position: 'relative',
    display: 'inline-block',
    border: '1px solid black',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '400',
    marginBottom: '16px',
    height: '36px',
    color: '#1c1d21',
    width: '100%',
    // textAlign: 'center',
    borderColor: 'hsl(0, 0%, 80%)',
  })

  // console.log('document page', documentRecord)
  useEffect(() => {
    // setId(generateRandomId())
    getDetails()
  }, [page, itemsPerPage])

  return (
    <div style={{ background: '#fff' }}>
      {hide ? (
        <DeleteModal setHide={setHide} documentId={documentId} getDetails={getDetails} />
      ) : (
        ''
      )}
      {edit ? <EditModal setEdit={setEdit} getDetails={getDetails} /> : ''}
      {view ? <ViewModel setView={setView} getDetails={getDetails} /> : ''}
      <Customer />
      <h5 className="mx-3">Dokumente</h5>
      <hr className="mx-3" />
      <div className="row p-3 mx-3" style={{ border: '1px solid lightgray', borderRadius: '5px' }}>
        <div className="col-sm-9">
          <h5 style={{ color: '#005291' }}>Dokumente verwalten</h5>
          {/* <p>
            Senden Sie anpassbare Angebote, Vorschläge und Verträge, um Geschäfte schneller
            abzuschließen.
          </p> */}
        </div>
        {/* <div className="col-sm-2"></div> */}
        <div className="col-sm-3 text-end">
          <button
            type="button"
            className="btn btn text-light"
            style={{ background: '#0b5995' }}
            onClick={handleShow}
          >
            <MdAdd style={{ color: 'white' }} />
            &nbsp; Dokument hochladen
          </button>
          <Modal show={show} onHide={handleClose} centered className="modal-form modal-form-wrap">
            <Modal.Header>
              <Modal.Title>Details zum Dokument</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modal-body modal-form-wrap" style={{ padding: '0px' }}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-3">
                      <label htmlFor="title">Titel</label>
                    </div>
                    <div className="col-md-9">
                      <input
                        id="title"
                        required
                        name="document_title"
                        value={data.document_title}
                        onChange={handleChange}
                        placeholder="Titel"
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  {/* 
                  <div className="row mb-3">
                    <div className="col-md-3 mt-1">
                      <label>Dokumententyp</label>
                    </div>
                    <div className="col-md-9">
                      <Select
                        className="w-100"
                        options={options}
                        onChange={handleChange}
                        value={{
                          label: data.document_type || 'Auswählen',
                          value: data.document_type || 'Auswählen',
                        }}
                        name="document_type"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-3 mt-1">
                      <label htmlFor="fileUpload">Datei-Upload</label>
                    </div>
                    <div className="col-md-9">
                      <div className="file-upload-wrap">
                        <input
                          type="file"
                          className="form-control"
                          name="document_upload"
                          onChange={(e) => setDocumentUpload(e.target.files[0])}
                        />
                        <div className="file-input-wrap">
                          <div className="filename-field">
                            <span>Datei-Upload</span>
                          </div>
                          <div className="file-btn">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
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
                  </div> */}
                  <div className="row mb-3">
                    <div className="col-md-3 mt-1">
                      <label>Dokumententyp</label>
                    </div>
                    <div className="col-md-9">
                      <Select
                        className="w-100"
                        options={options}
                        onChange={handleChange}
                        value={{
                          label: data.document_type || 'Auswählen',
                          value: data.document_type || 'Auswählen',
                        }}
                        name="document_type"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 mt-1">
                      <label htmlFor="fileUpload">Datei-Upload</label>
                    </div>
                    {/* <div className="col-md-9">
                      <div className="file-upload-wrap">
                        <input
                          type="file"
                          className="form-control"
                          name="document_upload"
                          onChange={(e) => {
                            if (data.document_type && data.document_type.length > 0) {
                              setDocumentUpload(e.target.files[0])
                            } else {
                            }
                          }}
                          disabled={!data.document_type || data.document_type.length === 0}
                        />
                        <div className="file-input-wrap">
                          <div className="filename-field">
                            <span>Datei-Upload</span>
                          </div>
                          <div className="file-btn">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
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
                    </div> */}
                    <div className="col-sm-9">
                      <div className="file-input-wrap">
                        <div className="filename-field">
                          <Container>
                            {/* <CloudUploadIcon /> */}
                            <label
                              htmlFor="file-upload"
                              style={{
                                width: '85.1%',
                              }}
                            >
                              <p
                                style={{
                                  paddingTop: '5px',
                                  paddingLeft: '10px',
                                  cursor: 'pointer',
                                }}
                              >
                                Datei-Upload
                              </p>
                            </label>
                            <VisuallyHiddenInput
                              id="file-upload"
                              type="file"
                              name="document_upload"
                              placeholder="Upload File"
                              onChange={(e) => {
                                setDocumentUpload(e.target.files[0])
                              }}
                              // disabled={!data.document_type || data.document_type.length === 0}
                            />
                            {/* <Divider /> */}
                            <svg
                              style={{
                                // marginLeft: '57%',
                                borderLeft: '1px solid hsl(0, 0%, 80%)',
                                height: '100%',
                                paddingLeft: '15px',
                              }}
                              width="34"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
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
                                  <rect
                                    width="24"
                                    height="24"
                                    fill="white"
                                    style={{ marginLeft: '20px' }}
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            {/* <div className="file-input-wrap">
                              <div className="filename-field">
                                <span>Datei-Upload</span>
                              </div>
                            </div> */}
                          </Container>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="file-input-wrap">
                    <div className="filename-field">
                      <span>
                        <>
                          <ul className="d-flex flex-row justify-content-between">
                            <div>{document_upload?.name}</div>
                            {document_upload?.name?.length ? (
                              <button
                                onClick={(index) => removeDocument(index)}
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
                            ) : (
                              ''
                            )}
                          </ul>
                        </>
                      </span>
                    </div>
                    {/* <div className="file-btn">Durchsuche</div> */}
                  </div>
                </div>
              </div>
            </Modal.Body>
            {/* <Modal.Footer className="border-top-0 p-3 pt-0 mt-3">
              <div className="btn-wrapper d-flex w-100 m-0 justify-content-end">
                <button className="btn btn-cancel" onClick={handleClose}>
                  {' '}
                  Abbrechen
                </button>
                <button className="btn btn-save ms-3" onClick={saveData}>
                  Speichern
                </button>
              </div>
            </Modal.Footer> */}
            <Modal.Footer>
              <div className="btn-wrapper d-flex w-100 m-0 justify-content-end">
                <button className="btn btn-cancel" onClick={handleClose}>
                  {' '}
                  Abbrechen
                </button>
                <button className="btn btn-save ms-3" onClick={saveData}>
                  Speichern
                </button>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <br />
      <div className="row mx-2">
        <div className="col-sm-12">
          <Table
            dataSource={documentRecord}
            columns={columns}
            pagination={false}
            responsive="stack"
            // rowKey={(record) => record._id}
            // rowSelection={{
            //   type: 'checkbox',
            //   onChange: (selectedRowKeys, selectedRows) => {
            //     // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
            //   },
            //   getCheckboxProps: (record) => ({
            //     disabled: record.name === 'Disabled User',
            //     name: record.name,
            //   }),
            // }}
          />
        </div>
        <div className="row">
          <div className="col-sm-10">
            <Stack spacing={2}>
              <Pagination
                count={countPage}
                variant="outlined"
                shape="rounded"
                page={page}
                onChange={handlePageChange}
              />
            </Stack>
          </div>
          <div className="col-sm-2 text-end">
            <select
              className="form-control form-select"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={10}>10 pro Seite</option>
              <option value={20}>20 pro Seite</option>
              <option value={50}>50 pro Seite</option>
              <option value={100}>100 pro Seite</option>
            </select>
          </div>
        </div>
        <br />
      </div>
      <br />
      <ToastContainer />
    </div>
  )
}

export default React.memo(Document)
