import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MUIDataTable from 'mui-datatables';
import { ToastContainer, toast } from 'react-toastify';
import PrintIcon from '@mui/icons-material/UploadFile'; // Importing the print icon from MUI
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import { Download } from '@mui/icons-material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Wrapper = styled.div`
  position: relative;
  filter: ${(props) => (props.blur ? 'blur(5px)' : 'none')};
  transition: filter 0.3s ease;
`;

const CustomButton = styled(Button)`
  margin-left: 8px; /* Adjust the margin as needed to align with other buttons */
`;

const BoxContainer = styled.div`
border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
  height: 100vh;

  @media (max-width: 768px) {
    overflow-x: auto;
    width:390px;
    height: 100vh;
   
  }
  @media (min-width: 768px) and (max-width: 991px) {
    overflow-x: auto;
    width:100%;
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
  margin-left:10px;
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

const AuthFormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  
`;

const OrmControl = styled.input`
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
  cursor: pointer;
  position:relative;
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
  height: calc(100vh - 240px);
 
`;

export default function MenuItems() {
  const [getData, setGetData] = useState([])
  const [menuCategory, setMenuCategory] = useState('')
  const [menuItemName, setMenuItemname] = useState('')
  const [menuDesc, setMenuDesc] = useState('')
  const [menuPrice, setMenuPrice] = useState('')
  const [avail, setAvail] = useState('')
  const [taxID, setTaxID] = useState('')
  const [data, setData] = useState([])
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    getStaffDetails();
  }, [])

  const getStaffDetails = () => {
    setLoading(true)
    axios.get('https://m3gr2x1eng.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-get-menuItems', {
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
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showUploadPopUp, setShowUploadPopUp] = useState(false)


  const handleAddEmployee = (e) => {

    e.preventDefault(); // Prevent form submission
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const postData = {
      menu_id: "1",
      items: [
        {
          category_id: menuCategory,
          item_name: menuItemName,
          description: menuDesc,
          price: menuPrice,
          availability: avail,
          tax_id: taxID,
          dietary_choices: ''
        }
      ]
    }
    axios.post(
      'https://hv3fnqiy9a.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-add-menu_items',
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


  };


  const handleChangeCategory = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);

    const category = getData.find(cat => cat.categoryid === selectedCategory);
    if (category) {
      setCategoryData(category.menu_items);
    } else {
      setCategoryData([]);
    }
  };


  const columns = [
    {
      name: 'serialNumber',
      label: 'S.No',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (index) => {
          return index + 1;
        },
      },
    },
    {
      name: "item_name",
      label: "Item Name",
    }

  ];

  const generateAndDownloadExcel = () => {

    const data = [
      ['category_id',
        'item_name',
        'description',
        'price',
        'availability',
        'tax_id',
        'dietary_choices']

    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'MenuItem_bulk_upload.xlsx');

  };
  const SampleDownload = () => {
    generateAndDownloadExcel()
  }


  const options = {
    filterType: 'checkbox',
    selectableRows: false,
    rowsPerPage: 4,
    elevation: 0,
    // 
    pagination: true,
    rowsPerPageOptions: [1, 2, 3, 4],

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
        category_id: row[0],
        item_name: row[1],
        description: row[2],
        price: row[3],
        availability: row[4],
        tax_id: row[5],
        dietary_choices: ""
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
    // console.log(data,'aamir');
    const post = {
      menu_id: "1",
      items: data
    }
    console.log(post);
    if (data !== '') {
      axios.post(
        'https://hv3fnqiy9a.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-add-menu_items',
        post,
        {
          headers: {
            "Content-Type": "application/json",

          },
        }
      )
        .then(response => {
          // console.log('Response:', response.data);
          toast('Successfully Inserted', {
            autoClose: 500,
            hideProgressBar: true
          });
          setData([])
          setShowUploadPopUp(false)
          setLoading(false)
        })
        .catch(error => {
          // console.error('Error:', error);
          toast('Failed to Insert', {
            autoClose: 500,
            hideProgressBar: true
          });
          setLoading(false)
        });

      // console.log('submit location');
      setShowPopup(false);
    }


  };


  return (
    <div>
      <Wrapper blur={showPopup || showUploadPopUp}>
        <BoxContainer>

          <EmployeeList>
            <TableWrapper>
              <FormControl variant="outlined" style={{ width: '20%', marginTop: 10 }}>
                <InputLabel id="category-label">Select Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={selectedCategory}
                  label="Select Category"
                  onChange={handleChangeCategory}
                >
                  {getData.map(category => (
                    <MenuItem key={category.categoryid} value={category.categoryid}>
                      {category.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <MUIDataTable
                columns={columns}
                data={categoryData}
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
                    animation: 'spin 1s linear infinite' /*  spinning animation */
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
          <AddButton onClick={() => setShowPopup(true)}>Add Menu</AddButton>
        </BoxContainer>
      </Wrapper>
      <Overlay show={showPopup || showUploadPopUp} onClick={() => { setShowPopup(false); setShowUploadPopUp(false); }} />
      <PopupContainer show={showPopup}>
        <AuthFormContainer>
          <form>
            <FormGroup>
              <label>Category</label>
              <OrmControl
                type="text"
                placeholder="eg:-Mohit"
                value={menuCategory}
                onChange={(e) => setMenuCategory(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Item Name</label>
              <OrmControl
                type="text"
                placeholder="eg:-Mohit"
                value={menuItemName}
                onChange={(e) => setMenuItemname(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Item Price</label>
              <OrmControl type="text" placeholder="eg:-Mathur"
                value={menuPrice}
                onChange={(e) => setMenuPrice(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <label>Description</label>
              <OrmControl type="text" placeholder="eg:-Housing"
                value={menuDesc}
                onChange={(e) => setMenuDesc(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <label>Availibility</label>
              <OrmControl type="text" placeholder="eg:-Mathur"
                value={avail}
                onChange={(e) => setAvail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Tax ID</label>
              <OrmControl type="text" placeholder="eg:-Mathur"
                value={taxID}
                onChange={(e) => setTaxID(e.target.value)}
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
        <AuthFormContainer>
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
                  animation: 'spin 1s linear infinite' /* spinning animation */
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
        </AuthFormContainer>
      </PopupContainer>
      <ToastContainer />
    </div>
  )
}
