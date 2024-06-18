import React, { useState,useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
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
 
`;


export default function Menu() {
    const [getData,setGetData]=useState([])
    const [menuId,setMenuId]=useState('')
    const [menuName,setMenuname]=useState('')
    const [menudescription,setMenuDescription]=useState('')
    const [status,setStatus]=useState('')
    const [data,setData]=useState([])
    const [file,setFile]=useState(null)
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
   getStaffDetails();
    },[])
  
  const getStaffDetails=()=>{
    setLoading(true)
    axios.get('https://mogy5y6i7k.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-get-menus', {
      params: {
        branch_id:1
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
        const [showUploadPopUp,setShowUploadPopUp]=useState(false)
      
    
        const handleAddEmployee = (e) => {
         
          e.preventDefault(); // Prevent form submission
          const postData =
          {
                          branch_id : "1",
                          menu_name : menuName,
                          description : menudescription,
                          status : status
          }
        
         axios.post('https://suycollenb.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-add-menus', postData,{
              headers: {
                "Content-Type":'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            },
            mode: 'cors'
            })
      .then(response => {
          console.log('Response:', response.data);
          toast('Successfully Inserted',{
            autoClose: 500,
            hideProgressBar: true
        })
      })
      .catch(error => {
          console.error('Error:', error);
          toast('Failed to Insert',{
            autoClose: 500,
            hideProgressBar: true
        })
      });
    
          console.log('submit location');
            setShowPopup(false);
        };
  
      
      
        const columns = [
          {
            name: 'menuid',
            label: "Menu ID",
            options: {
              filter: true,
              sort: true,
            }
          },
         
          {
            name: 'menu_name',
            label: "Menu Name",
            options: {
              filter: false,
              sort: true,
              
            }
          },
          {
            name: 'description',
            label: "Description",
            options: {
              filter: false,
              sort: true,
             
            }
          },
          {
            name: 'status',
            label: "Status",
            options: {
              filter: true,
              sort: true,
            }
          },
         
         
        ];
  
        // const generateAndDownloadExcel = () => {
        //   // Sample data, replace it with your actual data
        //   const data = [
        //     [ 'category_id',
        //     'item_name',
        //     'description',
        //     'price',
        //     'availability',
        //     'tax_id',
        //     'dietary_choices']
            
        //   ];
      
        //   const ws = XLSX.utils.aoa_to_sheet(data);
        //   const wb = XLSX.utils.book_new();
        //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      
        //   XLSX.writeFile(wb, 'MenuItem_bulk_upload.xlsx');
        
        //     };
        //     const SampleDownload =()=>{
        //       generateAndDownloadExcel()
        //     }
        
  
        const options = {
          filterType: 'checkbox',
          selectableRows:false,
          rowsPerPage:2,
          elevation:0,
          // 
          pagination: true,
      rowsPerPageOptions: [], 
     
      // customToolbar: () => {
      //   return (
      //     <div>
      //       {/* Default print button */}
      //       <Button onClick={SampleDownload} style={{marginRight:5}} variant="contained" startIcon={<Download />} size="small">
      //         Sample
      //       </Button>
      //       <Button onClick={() =>setShowUploadPopUp(true)} variant="contained" startIcon={<PrintIcon />} size="small">
      //         Upload
      //       </Button>
           
      //     </div>
      //   );
      // }
        };
  
        // const handleFileUpload = (e) => {
        //   setFile(e.target.files[0]);
        // };
  
        // const handleUpload = () => {
        //   setLoading(true)
        //   if (!file) {
        //     console.error("No file selected.");
        //     setLoading(false)
        //     return;
        //   }
      
        //   const reader = new FileReader();
      
        //   reader.onload = (evt) => {
        //     const bstr = evt.target.result;
        //     const workbook = XLSX.read(bstr, { type: 'binary' });
        //     const sheetName = workbook.SheetNames[0];
        //     const worksheet = workbook.Sheets[sheetName];
        //     const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
        //     // Remove header row
        //     excelData.shift();
      
        //     const formattedData = excelData.map(row => ({
        //       category_id: row[0],
        //       item_name: row[1],
        //       description: row[2],
        //       price: row[3],
        //       availability:row[4],
        //       tax_id:row[5],
        //       dietary_choices:""
        //     }));
      
        //     // Send data to the API
        //     setData(formattedData);
        //     setTimeout(()=>{
        //       handleAddEmployee1()
        //     },10000)
        //   };
          
        //   reader.readAsBinaryString(file);
        // };
      
        // const showUpload = () => {
        //   if (data.length === 0) {
        //     console.error("No data to send.");
        //     return;
        //   }
        //   else{
        //  console.log(data,'excel data');
        //   }
        // } 
  
        // const handleAddEmployee1 = (e) => {
        //   console.log(data,'aamir');
        //   const postData = {menu_id: "1",
        //   items:data
        //  }
        //   if (data !== null && data.length > 0) {
        //     axios.post(
        //       'https://hv3fnqiy9a.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-add-menu_items',
        //       postData,
        //       {
        //           headers: {
        //               "Content-Type": "application/json",
        //               // Remove Access-Control headers from client request
        //           },
        //           withCredentials: true, // Consider adding this if dealing with cookies or sessions
        //       }
        //   )
        //   .then(response => {
        //       console.log('Response:', response.data);
        //       toast('Successfully Inserted', {
        //           autoClose: 500,
        //           hideProgressBar: true
        //       });
        //       setData([])
        //       showUploadPopUp(false)
        //       setLoading(false)
        //   })
        //   .catch(error => {
        //       console.error('Error:', error);
        //       toast('Failed to Insert', {
        //           autoClose: 500,
        //           hideProgressBar: true
        //       });
        //       setLoading(false)
        //   });
    
        //   console.log('submit location');
        //     setShowPopup(false); // Close the popup after adding employee
        //   }
        //   else{
        //     toast('Failed to Upload', {
        //       autoClose: 500,
        //       hideProgressBar: true
        //   });
        //   }
      
        // };
      
     
    return (
      <div>
      <Wrapper blur={showPopup || showUploadPopUp }>
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
          <AddButton onClick={() => setShowPopup(true)}>Add Menu</AddButton>
        </BoxContainer>
      </Wrapper>
      <Overlay show={showPopup || showUploadPopUp } onClick={() => {setShowPopup(false); setShowUploadPopUp(false); }} />
      <PopupContainer show={showPopup}>
        <AuthFormContainer>
          <form>
          <FormGroup>
              <label>Menu ID</label>
              <FormControl
                type="text"
                placeholder="eg:-Mohit"
                value={menuId}
                onChange={(e) => setMenuId(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>menu Name</label>
              <FormControl
                type="text"
                placeholder="eg:-Mohit"
                value={menuName}
                onChange={(e) => setMenuname(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Description</label>
              <FormControl type="text" placeholder="eg:-Mathur" 
              value={menudescription}
              onChange={(e) => setMenuDescription(e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Status</label>
              <FormControl type="text" placeholder="eg:-Housing" 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
      
      
    </div>
    )
  }
