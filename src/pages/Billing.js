import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import MUIDataTable from 'mui-datatables';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
 
`;



export default function Billing() {
  const [secondShowPopup, setSecondShowPopup] = useState(false);
  const [getData,setGetData]=useState([])
  const [data,setData]=useState([])
  const [startDate,setStartDate]=useState(null)
  const [endDate,setEndDate]=useState(null)
  useEffect(()=>{
    getStaffDetails();
     },[])
   
   const getStaffDetails=()=>{
     axios.get('https://1inwmj2h77.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-get-billing', {
       params: {
         branch_id:1,
         start_date:"2024-05-01",
         end_date:"2024-06-19"
       }
     })
     .then(function (response) {
       console.log(response.data);
       setGetData(response.data);
     })
     .catch(function (error) {
       console.log(error);
     });
   }

   const options = {
    filterType: 'checkbox',
    selectableRows:false,
    rowsPerPage:2,
    elevation:0,
    // 
    pagination: true,
rowsPerPageOptions: [1,2], 
filter: true,
customFilterDialogFooter: () => (
  <div onClick={() => handleFilterButtonClick()}>
  <button style={{background: '#007bff', color: 'white', padding:4, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 16}}>Filter Button</button>
</div>
)
  };

  const handleFilterButtonClick = () => {
   setSecondShowPopup(true)
   
  };


  const handleFilterEmployee=(e)=>{
    // e.preventDefault(); 
    axios.get('https://1inwmj2h77.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-get-billing', {
       params: {
         branch_id:1,
         start_date:startDate,
         end_date:endDate
       }
     })
     .then(function (response) {
       console.log(response.data);
       setData(response.data);
       setStartDate('')
       setEndDate('')
       setSecondShowPopup(false)
     })
     .catch(function (error) {
       console.log(error);
     });
  }

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
      name: 'menu_items',
      label: "Item Name",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <ul>
            {value.map(category => (
              <li key={category.item_name}>{category.item_name}</li>
            ))}
          </ul>
        )
      }
    },
   
  ];
    const [employees, setEmployees] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ]);
      const [newEmployeeName, setNewEmployeeName] = useState('');
      const [showPopup, setShowPopup] = useState(false);
    
      const handleAddEmployee = () => {
        if (newEmployeeName.trim() !== '') {
          const newEmployee = {
            id: employees.length + 1,
            name: newEmployeeName,
          };
          setEmployees([...employees, newEmployee]);
          setNewEmployeeName('');
          setShowPopup(false); // Close the popup after adding employee
        }
      };
      
      
      return (
        <div>
          <Wrapper blur={showPopup || secondShowPopup}>
            <BoxContainer>
              <EmployeeList>
                <TableWrapper>
              <MUIDataTable
                columns={columns}
                data={data}
          options={options}
            />
            </TableWrapper>
              </EmployeeList>
              <AddButton onClick={() => setShowPopup(true)}>Add Bill</AddButton>
            </BoxContainer>
          </Wrapper>
          <Overlay show={showPopup || secondShowPopup} onClick={() => {setShowPopup(false); setSecondShowPopup(false)}} />
          <PopupContainer show={showPopup}>
            <AuthFormContainer>
              <form>
                <FormGroup>
                  <label>Payment Method</label>
                  <FormControl
                    type="text"
                    placeholder="eg:-Card"
                    value={newEmployeeName}
                    onChange={(e) => setNewEmployeeName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Total Amount</label>
                  <FormControl type="text" placeholder="eg:-1000" />
                </FormGroup>
                
                <FormGroup>
                  <label>Tax Amount (Gst)</label>
                  <FormControl type="text" placeholder="eg:-200" />
                </FormGroup>
                
                <FormGroup>
                  <label>Tipped Amount</label>
                  <FormControl type="text" placeholder="eg:-10" />
                </FormGroup>
                
               
                <FormGroup>
                  <label>Discount Percent</label>
                  <FormControl type="text" placeholder="eg:-10" />
                </FormGroup>
               
                
                <div
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <SubmitButton type="submit" onClick={handleAddEmployee}>
                    Submit
                  </SubmitButton>
                </div>
              </form>
            </AuthFormContainer>
          </PopupContainer>
          <PopupContainer show={secondShowPopup}>
        <AuthFormContainer>
          <form>
            <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select end date"
              />
            </FormGroup>
            <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
              <label>End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select end date"
                minDate={startDate || undefined}
              />

            </FormGroup>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <SubmitButton type="submit" onClick={handleFilterEmployee}>
                Search
              </SubmitButton>
            </div>
          </form>
        </AuthFormContainer>
      </PopupContainer>
        </div>
      )
}
