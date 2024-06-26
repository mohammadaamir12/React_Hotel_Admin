import React, { useState } from 'react';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import MUIDataTable from "mui-datatables";
import * as XLSX from 'xlsx';


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



export default function DashBoard() {
  

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
      name: 'firstname',
      label: "Name",
      options: {
      filter: true,
      sort: true,
       }},
       {
        name: 'department',
        label: "Department",
        options: {
        filter: true,
        sort: true,
         }},
         {
          name: 'role',
          label: "Role",
          options: {
          filter: true,
          sort: true,
           }},
           {
            name: 'Wages',
            label: "Hourly Wages",
            options: {
            filter: true,
            sort: true,
             }},
  ];

  const data = [
  	{
		id: 1,
		firstname: 'Beetlejuice',
    lastname:'Yadav',
    department:'Housing',
    role:'Cleaner',
    Wages:'2000',
	},
	{
		id: 1,
		firstname: 'Aamir',
    lastname:'Khan',
    department:'Developer',
    role:'React Native',
    Wages:'3000',
	},
]
const options = {
  filterType: 'checkbox',
  selectableRows:false,
};
  
  
  return (
    <div>
      <Wrapper blur={showPopup}>
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
          <AddButton onClick={() => setShowPopup(true)}>Add Employee</AddButton>
        </BoxContainer>
      </Wrapper>
      <Overlay show={showPopup} onClick={() => setShowPopup(false)} />
      <PopupContainer show={showPopup}>
        <AuthFormContainer>
          <form>
            <FormGroup>
              <label>First Name</label>
              <FormControl
                type="text"
                placeholder="eg:-Mohit"
                value={newEmployeeName}
                onChange={(e) => setNewEmployeeName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Last Name</label>
              <FormControl type="text" placeholder="eg:-Mathur" />
            </FormGroup>
            
            <FormGroup>
              <label>Department</label>
              <FormControl type="text" placeholder="eg:-Housing" />
            </FormGroup>
            
            <FormGroup>
              <label>Employee Role</label>
              <FormControl type="text" placeholder="eg:-Mathur" />
            </FormGroup>
            
           
            <FormGroup>
              <label>Hourly Wage</label>
              <FormControl type="text" placeholder="eg:-250" />
            </FormGroup>
            <FormGroup>
              <label>Mobile Otp</label>
              <FormControl type="text" placeholder="eg:-250" />
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
    </div>
   
  )
}
