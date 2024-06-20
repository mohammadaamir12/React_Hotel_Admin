import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import MUIDataTable from 'mui-datatables';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';


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


export default function MenuCategory() {
  const [getData,setGetData]=useState([])
  const [loading, setLoading] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [categories, setCategories] = useState([]);
  useEffect(()=>{
 getStaffDetails();
  },[])

const getStaffDetails=()=>{
  setLoading(true)
  axios.get('https://nes8zw0dfh.execute-api.ap-south-1.amazonaws.com/default/lambda-get-manuCategory', {
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

    
    
      const columns = [{
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
        name: "category",
        label: "Category",
    }];

      const options = {
          selectableRows: false, 
          responsive: 'standard',
          rowsPerPage:4,
        elevation:0,
        // 
        pagination: true,
    rowsPerPageOptions: [1,2,3,4], 
      };
  
      const handleChangeMenu = (event) => {
          const selectedMenuId = event.target.value;
          setSelectedMenu(selectedMenuId);
        
          const menu = getData.find(menu => menu.menuid === selectedMenuId);
          if (menu) {
              setCategories(menu.categories.map(category => [category.categoryid, category.category])); // Format data as required by MUIDataTable
          } else {
              setCategories([]);
          }
      };
   
    return (

        <div>
        <Wrapper blur={showPopup}>
          <BoxContainer>
            <EmployeeList>
              <TableWrapper>
              <FormControl variant="outlined" style={{width:'20%',marginTop:10}}>
              <InputLabel id="menu-label">Select Menu</InputLabel>
                <Select
                    labelId="menu-label"
                    id="menu-select"
                    value={selectedMenu}
                    label="Select Menu"
                    onChange={handleChangeMenu}
                >
                    {getData.map(menu => (
                        <MenuItem key={menu.menuid} value={menu.menuid}>
                            {menu.menu_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <MUIDataTable
              columns={columns}
              data={categories}
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
            <AddButton onClick={() => setShowPopup(true)}>Add Category</AddButton>
          </BoxContainer>
        </Wrapper>
        <Overlay show={showPopup} onClick={() => setShowPopup(false)} />
        <PopupContainer show={showPopup}>
          <AuthFormContainer>
            <form>
              <FormGroup>
                <label>Category</label>
                <OrmControl
                  type="text"
                  placeholder="eg:-Drink"
                  value={newEmployeeName}
                  onChange={(e) => setNewEmployeeName(e.target.value)}
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
