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
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
 getStaffDetails();
  },[])

const getStaffDetails=()=>{
  setLoading(true)
  axios.get('https://5z91cttyj8.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-get-branches', {
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
  

  const handleAddEmployee = (e) => {
       setLoading(true)
    e.preventDefault(); // Prevent form submission
    const postData ={menu_id: '193798766431917026969992930715165520777',
    items: [
          {category: "Appetizers", item_name: "Dahi ke Sholey",  description: "Hung Curd wrapped mixed with Indian Spices wrapped in bread and Deep Fried", price: 250, availability: "true", tax_id: "T1"},
                 ]
   }
   console.log("hello");
   axios.post('https://f5aj3ocx37.execute-api.ap-south-1.amazonaws.com/default/lambda-admin-add-branches', postData,{
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
  setLoading(false)
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
    rowsPerPage:2,
    elevation:0,
    // 
    pagination: true,
rowsPerPageOptions: [1,2],
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
