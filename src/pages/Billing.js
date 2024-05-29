import React, { useState } from 'react';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';

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
          name: 'Payment Method',
          selector: row => row.paymentmethod,
          sortable:true
        },
        {
          name: 'Total Amount',
          selector: row => row.totalAmount,
          sortable:true
        },
        {
          name: 'Tax Amount',
          selector: row => row.taxamount,
          sortable:true
        },
        {
          name: 'Tip Amount',
          selector: row => row.tipamount,
          sortable:true
        },
        {
          name: 'Discount',
          selector: row => row.discount,
          sortable:true
        },
      ];
    
      const data = [
          {
            id: 1,
            paymentmethod: 'Card',
        totalAmount:'2200',
        taxamount:'188',
        tipamount:'12',
        discount:'20%',
        },
        {
            id: 2,
            paymentmethod: 'Cash',
        totalAmount:'4000',
        taxamount:'300',
        tipamount:'100',
        discount:'20%',
        },
    ]
      
      
      return (
        <div>
          <Wrapper blur={showPopup}>
            <BoxContainer>
              <EmployeeList>
                <TableWrapper>
              <DataTable
                columns={columns}
                data={data}
          pagination
            />
            </TableWrapper>
              </EmployeeList>
              <AddButton onClick={() => setShowPopup(true)}>Add Bill</AddButton>
            </BoxContainer>
          </Wrapper>
          <Overlay show={showPopup} onClick={() => setShowPopup(false)} />
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
        </div>
      )
}
