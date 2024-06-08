import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import axios from 'axios'
import MUIDataTable from 'mui-datatables';
import { ToastContainer, toast } from 'react-toastify';

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

export default function Staff() {
  const [getData,setGetData]=useState([])
  const [firstname,setFirstName]=useState('')
  const [lastname,setlastName]=useState('')
  const [phone,setPhone]=useState('')
  const [department,setDepartment]=useState('')
  const [role,setRole]=useState('')
  const [hourlyWages,setHourlyWages]=useState('')
  const [hiredate,setHireDate]=useState('')
  useEffect(()=>{
 getStaffDetails();
  },[])

const getStaffDetails=()=>{
  axios.get('https://d3ck7r5e72.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-get-staff', {
    params: {
      branch_id:1
    }
  })
  .then(function (response) {
    // console.log(response.data);
    setGetData(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

   

      const [showPopup, setShowPopup] = useState(false);
    
      const handleAddEmployee = (e) => {
        e.preventDefault(); // Prevent form submission
        const postData = {
          branchId : "1a",
                firstName : "Jason",
                lastName : "Brown",
                phone : "+918078607216",
                department : "Front of House",
                role: "Server",
                hourlyWage : "$16",
                hireDate : "2023-04-15"
      };
       console.log("hello");
       axios.post('https://fl87ao683b.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-add-staff-cognito', postData,{
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
          setShowPopup(false); // Close the popup after adding employee
        }

      
     
      const columns = [
        {
          name: 'staffid',
          label: "Staff ID",
        options: {
          filter: true,
          sort: true,
        }
        },
        {
          name: 'staffname',
          label: "Staff Name",
        options: {
          filter: true,
          sort: true,
        }
        },
        {
          name: 'phone',
          label: "Phone",
        options: {
          filter: true,
          sort: true,
        }
        },
        {
          name: 'department',
          label: "Department",
        options: {
          filter: true,
          sort: true,
        }
        },
        {
          name: 'role',
          label: "Role",
        options: {
          filter: true,
          sort: true,
        }
        },
        {
          name: 'hourlywage',
          label: "Hourly Wage",
        options: {
          filter: true,
          sort: true,
        }
        },
      ];
      
      const options = {
        filterType: 'checkbox',
        selectableRows:false,
        rowsPerPage:4
      };
     
      
  return (
    <div>
    <Wrapper blur={showPopup}>
      <BoxContainer>
        <EmployeeList>
          <TableWrapper>
        <MUIDataTable
          columns={columns}
          data={getData}
    options={options}
      />
      </TableWrapper>
        </EmployeeList>
        <AddButton onClick={() => setShowPopup(true)}>Add Staff</AddButton>
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
              value={firstname}
              onChange={(e)=>setFirstName(e.target.value)}
             
            />
          </FormGroup>
          <FormGroup>
            <label>Last Name</label>
            <FormControl type="text" placeholder="eg:-Mathur"
            value={lastname}
            onChange={(e)=>setlastName(e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <label>Department</label>
            <FormControl type="text" placeholder="eg:-Housing" 
             value={department}
             onChange={(e)=>setDepartment(e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <label>Employee Role</label>
            <FormControl type="text" placeholder="eg:-Mathur"
             value={role}
             onChange={(e)=>setRole(e.target.value)}
            />
          </FormGroup>
          
         
          <FormGroup>
            <label>Hourly Wage</label>
            <FormControl type="text" placeholder="eg:-250"
             value={hourlyWages}
             onChange={(e)=>setHourlyWages(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label>Hire Date</label>
            <FormControl type="text" placeholder="eg:22-08-2000"
             value={hiredate}
             onChange={(e)=>setHireDate(e.target.value)}
            />
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
