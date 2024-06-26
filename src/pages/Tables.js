import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import MUIDataTable from 'mui-datatables';
import { ToastContainer, toast } from 'react-toastify';
import PrintIcon from '@mui/icons-material/UploadFile'; // Importing the print icon from MUI
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import { Download } from '@mui/icons-material';


const Wrapper = styled.div`
  position: relative;
  filter: ${(props) => (props.blur ? 'blur(5px)' : 'none')};
  transition: filter 0.3s ease;
`;

const BoxContainer = styled.div`
border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
  height: 100vh;
  overflow-x:auto;
  overflow-x:auto;

  @media (max-width: 768px) {
    overflow-x: auto;
    width:390px;
    height: 100vh;
   
  }
  @media (min-width: 768px) and (max-width: 991px) {
    overflow-x: auto;
    width:770px;
    height: 100vh;
  }
`;

const EmployeeList = styled.ul`
width: 100%;
overflow-x: auto;
max-width: 100%;
box-sizing: border-box;
`;

const EmployeeItem = styled.li`
  margin-bottom: 10px;

`;

const AddButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  z-index: 1001;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;
const AuthCointainer = styled.div`
 width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
`;

const AuthFormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  height: 400px;
  overflow:scroll;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  
`;

const FormControl = styled.input`
  height: 40px;
  appearance: none;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 2.25rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  position: relative; 
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   align-self:center;
  &:hover {
    background-color: #0056b3;
  }
`;

const TableWrapper = styled.div`
  
  max-width: 100%;
  overflow-x: auto;
 
`;


export default function Tables() {
  const [getData, setGetData] = useState([])
  const [tableNo, setTableNo] = useState('')
  const [tableCapacity, setTableCapacity] = useState('')
  const [tableLocation, setTableLocation] = useState('')
  const [tableStatus, setTableStatus] = useState('')
  const [data, setData] = useState([])
  const [file, setFile] = useState(null)
  const [tableType, setTableType] = useState('')
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStaffDetails();
  }, [])

  const getStaffDetails = () => {
    setLoading(true)
    axios.get('https://t0mjhgttr7.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-get-tables', {
      params: {
        branch_id: 1
      }
    })
      .then(function (response) {
        // console.log(response.data);
        setGetData(response.data);
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [showUploadPopUp, setShowUploadPopUp] = useState(false)


  const handleAddEmployee = (e) => {
    e.preventDefault(); // Prevent form submission
    const postData = {
      branch_id: "1",
      tables: [
        { table_number: tableNo, capacity: tableCapacity, location: tableLocation, status: tableStatus, table_type: tableType }
      ]
    }
    if (tableNo.trim() !== '' && tableCapacity.trim() !== '' && tableLocation.trim() !== '' && tableStatus.trim() !== '' && tableType.trim() !== '') {
      axios.post(
        'https://96p9b8hcyh.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-add-tables',
        postData,
        {
          headers: {
            "Content-Type": "application/json",

          },
          // withCredentials: true,
        }
      )
        .then(response => {
          console.log('Response:', response.data);
          toast('Successfully Inserted', {
            autoClose: 500,
            hideProgressBar: true
          });
          setShowPopup(false);
        })
        .catch(error => {
          console.error('Error:', error);
          toast('Failed to Insert', {
            autoClose: 500,
            hideProgressBar: true
          });
        });

      console.log('submit location');

    }

  };



  const columns = [
    {
      name: 'serialNumber',
      label: 'S.No',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => <div style={{ marginLeft:'20%' }}>{value}</div>,
        customBodyRenderLite: (index) => {
          return index + 1;
        },
      },
    },
    {
      name: 'tablenumber',
      label: "Table Number",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => <div style={{ marginLeft:'20%' }}>{value}</div>,
      }
    },
    {
      name: 'capacity',
      label: "Capacity",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => <div style={{ marginLeft:'20%' }}>{value}</div>,
      }
    },
    {
      name: 'location',
      label: "Location",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => <div style={{ marginLeft:'15%' }}>{value}</div>,
      }
    },

    {
      name: 'status',
      label: "Status",
      options: {
        filter: true,
        sort: true,
        
        customBodyRenderLite: (dataIndex) => {
          const status = getData[dataIndex].status;
          return status ? "True" : "False";
        },
       
      }
    },
  ];

  const generateAndDownloadExcel = () => {
    // Sample data, replace it with your actual data
    const data = [
      ['table_number',
        'capacity',
        'location',
        'status',
        'table_type']

    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'table_bulk_upload.xlsx');

  };
  const SampleDownload = () => {
    generateAndDownloadExcel()
  }

  const options = {
    filterType: 'checkbox',
    selectableRows: false,
    rowsPerPage: 4,
    customToolbar: () => {
      return (
        <div>
          {/* Default print button */}
          <Button onClick={SampleDownload} style={{ marginRight: 5 }} variant="contained" startIcon={<Download />} size="small">
            Sample
          </Button>
          <Button onClick={() => setShowUploadPopUp(true)} variant="contained" startIcon={<PrintIcon />} size="small">
            Upload
          </Button>

        </div>
      );
    }
  };


  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    setLoading(true)

    if (!file) {
      console.error("No file selected.");
      setLoading(false)
      return;
    }

    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Remove header row
      excelData.shift();

      const formattedData = excelData.map(row => ({
        table_number: row[0].toString(),
        capacity: row[1],
        location: row[2],
        status: row[3],
        table_type: row[4]
      }));

      // Send data to the API
      setData(formattedData);

      setTimeout(() => {
        handleAddEmployee1()
      }, 15000)
    };

    reader.readAsBinaryString(file);


  };

  const showUpload = () => {
    if (data.length === 0) {
      console.error("No data to send.");
      return;
    }
    else {
      console.log(data, 'excel data');
    }
  }
  const handleAddEmployee1 = (e) => {
    console.log(data[0], 'aamir');
    const postData = {
      branch_id: "1",
      tables: data
    }
    if (data !== '') {
      axios.post(
        'https://96p9b8hcyh.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-add-tables',
        postData,
        {
          headers: {
            "Content-Type": "application/json",

          },
          //  withCredentials: true,
        }
      )
        .then(response => {
          console.log('Response:', response.data);
          toast('Successfully Inserted', {
            autoClose: 500,
            hideProgressBar: true
          });
          setLoading(false)
          setData([])
          setShowUploadPopUp(false)
          setShowPopup(false);
        })
        .catch(error => {
          console.error('Error:', error);
          toast('Failed to Insert', {
            autoClose: 500,
            hideProgressBar: true
          });
          setLoading(false)
        });

      console.log('submit location');

    }

  };

  return (
    <div>
      <Wrapper blur={showPopup || showUploadPopUp}>
        <BoxContainer>
          <EmployeeList>
            <TableWrapper>
              <MUIDataTable
                columns={columns}
                data={getData}
                options={options}
              />
              {loading && (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '3px solid #f3f3f3', /* Light grey */
                    borderTop: '3px solid #3498db', /* Blue */
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-10px',
                    marginLeft: '-10px',
                    animation: 'spin 1s linear infinite' /* Add spinning animation */
                  }}
                ></div>
              )}
              <style>
                {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
              </style>
            </TableWrapper>
          </EmployeeList>
          <AddButton onClick={() => setShowPopup(true)}>Add table</AddButton>
        </BoxContainer>
      </Wrapper>
      <Overlay show={showPopup || showUploadPopUp} onClick={() => { setShowPopup(false); setShowUploadPopUp(false); }} />
      <PopupContainer show={showPopup}>
        <AuthFormContainer>
          <form >
            <FormGroup>
              <label>Table Number</label>
              <FormControl type="text" placeholder="eg:-Housing"
                value={tableNo}
                onChange={(e) => setTableNo(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Table Capacity</label>
              <FormControl type="text" placeholder="eg:-250"
                value={tableCapacity}
                onChange={(e) => setTableCapacity(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Table Location</label>
              <FormControl type="text" placeholder="eg:-250"
                value={tableLocation}
                onChange={(e) => setTableLocation(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Table Status</label>
              <FormControl type="text" placeholder="eg:-250"
                value={tableStatus}
                onChange={(e) => setTableStatus(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Table Type</label>
              <FormControl type="text" placeholder="eg:-250"
                value={tableType}
                onChange={(e) => setTableType(e.target.value)}
              />
            </FormGroup>

            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <SubmitButton type="submit" onClick={handleAddEmployee}>
                ADD
              </SubmitButton>
            </div>
          </form>
        </AuthFormContainer>
      </PopupContainer>
      <PopupContainer show={showUploadPopUp}>
        <AuthCointainer>
          <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }} >
            <input type="file" style={{ marginBottom: 5 }} onChange={handleFileUpload} />
            <SubmitButton style={{ marginTop: 5 }} onClick={handleUpload} disabled={loading}>
              Submit
              {loading && (
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid #f3f3f3', /* Light grey */
                  borderTop: '3px solid #3498db', /* Blue */
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-10px',
                  marginLeft: '-10px',
                  animation: 'spin 1s linear infinite' /* Add spinning animation */
                }}></div>
              )}
              <style>
                {`
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}
              </style>
            </SubmitButton>
            {loading && <div>Uploading...</div>}
          </div>
        </AuthCointainer>
      </PopupContainer>
      <ToastContainer />
    </div>
  )
}
