import {Menu,MenuOpen,Search, LightMode, NotificationImportant, Message, DarkMode, Logout} from '@mui/icons-material';

import React from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton ,Button} from '@mui/material';
import { useNavigate } from "react-router-dom";


const NavBarDiv=styled.div`
display:flex;

padding: 10px 30px;
align-items:center;
color:${({theme})=>theme.text_Primary};
box-shadow:0 4px 30px rgba(0,0,0,0.1);
backdrop-filter:blur(5.7px);
-webkit-backdrop-filter:blur(5.7px);
@media (max-width:768px){
    padding:16px;
    width:100%;
    flex-direction: column;
    align-items: flex-start;
  
}

`;
const CustomButton = styled(Button)`
box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.2);
width: 30px;
height: 50px;
background-color: red;
@media (max-width: 768px) {
  width: 30%;
  height: auto;
  
}

`;

const Container = styled.div`
display: flex;
align-items: center;
width: 100%;
margin-left:2%;
gap:8px;
@media (max-width: 768px) {
  flex-direction: row; 
    margin-left:0;
    margin-top:5%;
    justify-content: center; 
  align-items: center; 
   
}

`;


const ButtonDiv = styled.div`
font-size:14px;
cursor:pointer;
max-width:70px;
display:flex;
align-items:center;
color:${({theme})=>theme.text_Primary};
border:1px solid ${({theme})=>theme.text_Primary};
border-radius:12px;
padding:8px 10px
gap:8px;
`;

const IcoButton = styled(IconButton)`

color:${({theme})=>theme.text_Second} !important;


`;
const SearchBar = styled(IconButton)`



`;
const CustomTextField = styled(TextField)`
width: 100%;

box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.2);
margin-right: 16px; 
 
@media (max-width: 768px) {
  width: 100%;
  margin-right: 0;
  margin-bottom: 8px;
}

    &:hover fieldset {
      border-color: #5894f5;
    }

    &.Mui-focused fieldset {
      border-color: #5894f5;
    }
  }
`;

export default function Navbar({menuOpen,setMenuOpen,setDarkMode,darkMode,setAuth}) {
  const navigate = useNavigate();
  const setLogout=()=>{
    localStorage.removeItem("activeLink")
    localStorage.removeItem("token")
    localStorage.removeItem('refresh_token');
                  localStorage.removeItem('branch_id');
                  localStorage.removeItem('property_folder');
                  localStorage.removeItem('phone_no',);
    setAuth(false)
    navigate('/login')
  }
  return (
    <NavBarDiv>
        <IcoButton onClick={()=>setMenuOpen(!menuOpen)}>
       {menuOpen==true?<MenuOpen/>:<Menu />} 
        </IcoButton>
        <h2 style={{marginRight:'15%',marginLeft:10}}>DashBoard</h2>
        <CustomTextField
      variant="outlined"
      placeholder="Search..."
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchBar>
              <Search/>
            </SearchBar>
          </InputAdornment>
        ),
      }}
    />
    <Container>
        <CustomButton variant="contained" onClick={()=>setDarkMode(!darkMode)}>
         {darkMode==true?<DarkMode/>: <LightMode/>}  
        
        </CustomButton>
        <CustomButton variant="contained" color="primary" >
        <NotificationImportant />
          
        </CustomButton>
        <CustomButton variant="contained" onClick={setLogout} color="primary" >
        <Logout />
          
        </CustomButton>
      </Container>
      
      {/* <ButtonDiv>
        <PersonRounded/>
        Login
      </ButtonDiv> */}
    </NavBarDiv>
  )
}
