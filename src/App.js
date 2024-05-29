import logo from './logo.svg';
import './App.css';
import styled,{ThemeProvider} from 'styled-components';
import { darkTheme, lightTheme } from './utils/Themes';
import React,{useState} from 'react'
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Routes,Navigate  } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import MenuCategory from './pages/MenuCategory';
import MenuItems from './pages/MenuItems';
import Billing from './pages/Billing';
import Staff from './pages/Staff';
import Tables from './pages/Tables';
import Navbar from './components/Navbar';
import Branches from './pages/Branches';
import Brands from './pages/Brands';
import Currencies from './pages/Currencies';
import TableAssign from './pages/TableAssign';
import Promotions from './pages/Promotions';
import Taxes from './pages/Taxes';
import Visits from './pages/Visits';
import Orders from './pages/Orders';
import Login from './pages/Login';
import GlobalStyle from './pages/Global';

const Container=styled.div`
background:${({theme})=> theme.bg};
width:100%;
height:100vh;
display:flex;
overflow-x:hidden;
overflow-y:hidden;
`;

const Frame=styled.div`
flex-direction:column;
display:flex;
flex:3;
`;

function App() {
  const [darkMode,setDarkMode]=useState(false);
  const[menuOpen,setMenuOpen]=useState(true);
  const [isAuth, setIsAuth] = useState(false);
  return (
    
    <BrowserRouter>
    <ThemeProvider theme={darkMode?darkTheme:lightTheme}>
    <GlobalStyle/>
    {isAuth ? (
    <Container>
      {menuOpen &&(
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} setDarkMode={setDarkMode} darkMode={darkMode}/>
      )}
       <Frame>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} setDarkMode={setDarkMode} darkMode={darkMode} />
   <Routes>
   <Route path='/login' exact element={<Login/>} />
    <Route path='/' exact element={isAuth ? <DashBoard /> : <Navigate to="/login" />}/>
    <Route path='/menuCategory' element={isAuth ? <MenuCategory /> : <Navigate to="/login" />} />
    <Route path='/menuLists'  element={isAuth ? <MenuItems /> : <Navigate to="/login" />} />
    <Route path='/billing'  element={isAuth ? <Billing /> : <Navigate to="/login" />} />
    <Route path='/staff'  element={isAuth ? <Staff /> : <Navigate to="/login" />} />
    <Route path='/tables'  element={isAuth ? <Tables /> : <Navigate to="/login" />} />
    <Route path='/branches'  element={isAuth ? <Branches /> : <Navigate to="/login" />} />
    <Route path='/brands'  element={isAuth ? <Brands /> : <Navigate to="/login" />} />
    <Route path='/currencies'  element={isAuth ? <Currencies /> : <Navigate to="/login" />}/>
    <Route path='/tableAssign'  element={isAuth ? <TableAssign /> : <Navigate to="/login" />} />
    <Route path='/promotions'  element={isAuth ? <Promotions /> : <Navigate to="/login" />} />
    <Route path='/taxes'  element={isAuth ? <Taxes /> : <Navigate to="/login" />} />
    <Route path='/visits'  element={isAuth ? <Visits /> : <Navigate to="/login" />} />
    <Route path='/orders'  element={isAuth ? <Orders /> : <Navigate to="/login" />} />
    
    
   </Routes>
       </Frame>
    </Container>
    ) : (
      <Routes>
        <Route path="/login" element={<Login setAuth={setIsAuth} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    )}
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
