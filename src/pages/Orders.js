import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import MUIDataTable from 'mui-datatables';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { CalendarMonth, CleanHands, Clear, Filter } from '@mui/icons-material';
import PrintIcon from '@mui/icons-material/UploadFile'; // Importing the print icon from MUI
import Button from '@mui/material/Button';




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

export default function Orders() {
  const [secondShowPopup, setSecondShowPopup] = useState(false);
  const [getData, setGetData] = useState([])
  const [data, setData] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ]);
  const [date,setDate]=useState({
    startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
  })
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(()=>{
handleFilterEmployee()
  },[])

  const handleAddEmployee = () => {
    if (newEmployeeName.trim() !== '') {
      const newEmployee = {
        id: employees.length + 1,
        name: newEmployeeName,
      };
      setEmployees([...employees, newEmployee]);
      setNewEmployeeName('');
      setShowPopup(false);
    }
  };

  const options = {
    filterType: 'checkbox',
    selectableRows: false,
    rowsPerPage: 4,
    elevation: 0,
    pagination: true,
    rowsPerPageOptions: [1,2,3,4],
    filter: true,
    customFilterDialogFooter: () => (
      <div onClick={() => handleFilterButtonClick()}>
        <button style={{ background: '#007bff', color: 'white', padding: 4, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 16 }}>Filter Button</button>
      </div>
    ),
    customToolbar: () => {
      return (
        <div>
          {/* Default print button */}
          <Button onClick={()=>setSecondShowPopup(true)} style={{marginRight:5}} variant="contained" startIcon={<CalendarMonth />} size="small">
        Filter
      </Button>
          <Button onClick={clearDateRange} variant="contained" startIcon={<Clear />} size="small">
            Clear
          </Button>
         
        </div>
      );
    }
  };

  const handleFilterButtonClick = () => {
    setSecondShowPopup(true)

  }

  const handleFilterEmployee = (e) => {
    console.log(setDate);
   setLoading(true)
    axios.get('https://hu3r9jloh4.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-get-orders', {
      params: {
        branch_id: 1,
        start_date: '2024-05-31',
        end_date: '2024-06-18'
      }
    })
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
        setStartDate(null)
        setEndDate(null)
        setSecondShowPopup(false)
        setLoading(false)
    
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const orderData = data.flatMap((order) =>
  order.items.map((item) => ({
    itemName: item.item_name,
    quantity: item.quantity,
    status: item.item_status,
  }))
);

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
      name: 'itemName',
      label: 'Item Name',
    },
    {
      name: 'quantity',
      label: 'Quantity',
    },
    {
      name: 'status',
      label: 'Status',
    },
  ];

const handleDateChange=(ranges)=>{
  setDate(ranges.selection)
}

const clearDateRange = () => {
  setDate({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
};

  return (
    <div>
      <Wrapper blur={showPopup || secondShowPopup}>
        <BoxContainer>
          <EmployeeList>
            <TableWrapper>
              <MUIDataTable
                columns={columns}
                data={orderData}
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
          animation: 'spin 1s linear infinite' /* spinning animation */
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
          <AddButton onClick={() => setShowPopup(true)}>Add Bill</AddButton>
        </BoxContainer>
      </Wrapper>
      <Overlay show={showPopup || secondShowPopup} onClick={() => { setShowPopup(false); setSecondShowPopup(false) }} />
      <PopupContainer show={showPopup}>
        <AuthFormContainer>
          <form>
            <FormGroup>
              <label>Order Number</label>
              <FormControl
                type="text"
                placeholder="eg:-Mohit"
                value={newEmployeeName}
                onChange={(e) => setNewEmployeeName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Order Quantity</label>
              <FormControl type="text" placeholder="eg:-Mathur" />
            </FormGroup>

            <FormGroup>
              <label>Order Amount</label>
              <FormControl type="text" placeholder="eg:-Housing" />
            </FormGroup>

            <FormGroup>
              <label>Order Status</label>
              <FormControl type="text" placeholder="eg:-Mathur" />
            </FormGroup>


            <FormGroup>
              <label>Special Request</label>
              <FormControl type="text" placeholder="eg:-250" />
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
      <PopupContainer show={secondShowPopup}>
      
          
            
              <DateRangePicker
        ranges={[date]}
        onChange={handleDateChange}
      />
           
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <SubmitButton type="submit" onClick={handleFilterEmployee}>
                Search
              </SubmitButton>
            </div>
         
     
      </PopupContainer>
    </div>
  )
}
