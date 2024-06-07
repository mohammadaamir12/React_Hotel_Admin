import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import axios from 'axios'
import MUIDataTable from 'mui-datatables';

const Wrapper = styled.div`
  position: relative;
  filter: ${(props) => (props.blur ? 'blur(5px)' : 'none')};
  transition: filter 0.3s ease;
`;

const BoxContainer = styled.div`
border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  width: 1050px;
  box-sizing: border-box;
  height: 100vh;

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

export default function Branches() {
  const [getData,setGetData]=useState([])
  useEffect(()=>{
 getStaffDetails();
  },[])

const getStaffDetails=()=>{
  axios.get('https://5z91cttyj8.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-get-branches', {
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
      name: 'branchname',
      label: "Branch Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: 'address',
      label: "Branch Address",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: 'state_province',
      label: "State Province",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: 'country',
      label: "Country",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: 'email',
      label: "State Province",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
        name: 'phone',
        label: "State Province",
      options: {
        filter: true,
        sort: true,
      }
      },
      {
        name: 'propertytype',
        label: "State Province",
      options: {
        filter: true,
        sort: true,
      }
      },
      {
        name: '',
        label: "License Number",
      options: {
        filter: true,
        sort: true,
      }
      },
      {
        name: 'liquorlicense',
        label: "Liquir Licence",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'operatinghours',
        label: "Operating Hours",
      options: {
        filter: true,
        sort: true,
      }
      },
      {
        name: 'deliveryoptions',
        label: "Delivery Options",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'reservationpolicy',
        label: "Reservations",
      options: {
        filter: true,
        sort: true,
      }
      },
      {
        name: 'paymentoptions',
        label: "Payment Options",
      options: {
        filter: true,
        sort: true,
      }
      },
      {
        name: 'description',
        label: "Description",
        options: {
          filter: true,
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
      data={getData}
     options={options}
  />
  </TableWrapper>
    </EmployeeList>
    <AddButton onClick={() => setShowPopup(true)}>Add order</AddButton>
  </BoxContainer>
</Wrapper>
<Overlay show={showPopup} onClick={() => setShowPopup(false)} />
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
</div>
)
}