import { HomeRounded,ArrowRight,Menu,CloudUpload,AutoGraph,Star,Favorite,Print,AutoStories,TableRows,Widgets, CloseRounded } from '@mui/icons-material';
import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import LogoImage from '../images/Logoimg.png'
import { Link } from 'react-router-dom';

const Menucontainer=styled.div`
flex:0.6;
flex-direction:column;
height:100vh;
display:flex;
background-color:${({theme})=>theme.bg};
color:${({theme})=>theme.text_Primary};
@media (max-width:1100px){

  position:fixed;
  z-index:1000;
  width:100%;
  max-width:250px;
  left:${({menuOpen})=>(menuOpen? "0":"-100%")}
}
`;

const Flex=styled.div`
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-between;
padding:0px 12px;
`;
const Logo=styled.div`
width:100%;
color:${({theme})=>theme.primary};
display:flex;
align-items:center;
justify-content:center;
gap:6px;
font-weight:bold;
font-size:24px;
margin:16px 0px;
`;
const Close=styled.div`
display:none;
@media(max-width:1100px){
    display:block;
}
margin-right:40px;

`;
const Elements=styled.div`
padding: 4px 16px;
display:flex;
flex-direction:row;
justify-content:flex-start;
align-items:center;
gap:12px;
cursor:pointer;
width:100%;
color:${({theme})=>theme.text_Second};

`;
const NavText=styled.div`
padding: 12px 0px;
flex:1;

&:hover{
    color:${({theme})=>theme.white};
}
font-weight:bold;

`;
const Image=styled.img`
height:40px;
`;

const scrollableDivStyle = {
  overflowY: 'auto',
  overflowX: 'hidden',
  height: '100%',
  msOverflowStyle: 'none',  // Internet Explorer 10+
  scrollbarWidth: 'none'    // Firefox
};

const hideScrollBarStyle = {
  '::-webkit-scrollbar': {
    display: 'none'  // Safari and Chrome
  }
};

export default function Sidebar({setMenuOpen,setDarkMode,darkMode,menuOpen}) {
  const [activeLink, setActiveLink] = useState(localStorage.getItem('activeLink') || '/');
  useEffect(() => {
    localStorage.setItem('activeLink', activeLink);
  }, [activeLink]);
  const handleSetActive = (link) => {
    setActiveLink(link);
  };

 
  return (
    <Menucontainer menuOpen={menuOpen}>
        <Flex>
            
        <Logo>
        <Image src={LogoImage}/>
            InnApp</Logo>
      <Close onClick={()=>setMenuOpen(false)}>
        <CloseRounded/>
      </Close>
        </Flex>
        <div style={{ ...scrollableDivStyle, ...hideScrollBarStyle }}>
      <Link to={'/'}
      onClick={() => handleSetActive('/')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%'}}>
      <Elements style={{ backgroundColor: activeLink === '/' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2 }}>
        <HomeRounded />
        <NavText>Dashboard</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/menuCategory'}
      onClick={() => handleSetActive('Menu Category')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%'}}>
      <Elements style={{ backgroundColor: activeLink === 'Menu Category' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2  }}>
        <CloudUpload />
        <NavText>Menu Category</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/menuLists'} 
      onClick={() => handleSetActive('Menu List')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%'}}>
      <Elements style={{ backgroundColor: activeLink === 'Menu List' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2  }}>
        <AutoGraph />
        <NavText>Menu Items</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/billing'}
       onClick={() => handleSetActive('Billing')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%'}}>
      <Elements style={{ backgroundColor: activeLink === 'Billing' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2  }}>
        <Star />
        <NavText>Billing</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/staff'}
       onClick={() => handleSetActive('/staff')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%'}}>
      <Elements style={{ backgroundColor: activeLink === '/staff' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2  }}>
        <Favorite />
        <NavText>Staff</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/tables'}
       onClick={() => handleSetActive('Tables')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%'}}>
      <Elements style={{ backgroundColor: activeLink === 'Tables' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2  }}>
        <Widgets />
        <NavText>Tables</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/branches'}
      onClick={() => handleSetActive('Branches')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%'}}>
      <Elements style={{ backgroundColor: activeLink === 'Branches' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2  }}>
        <Print />
        <NavText>Branches</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/brands'}
      onClick={() => handleSetActive('Brands')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%' }}>
      <Elements style={{ backgroundColor: activeLink === 'Brands' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2  }}>
        <Print />
        <NavText>Brands</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/currencies'}
      onClick={() => handleSetActive('Currencies')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%' }}>
      <Elements style={{ backgroundColor: activeLink === 'Currencies' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2  }}>
        <Print />
        <NavText>Currencies</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/tableAssign'}
      onClick={() => handleSetActive('TableAssign')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%'}}>
      <Elements style={{ backgroundColor: activeLink === 'TableAssign' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2  }}>
        <Print />
        <NavText>TableAssign</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/promotions'}
      onClick={() => handleSetActive('Promotions')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%' }}>
      <Elements style={{ backgroundColor: activeLink === 'Promotions' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2  }}>
        <Print />
        <NavText>Promotions</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/taxes'}
      onClick={() => handleSetActive('Taxes')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%' }}>
      <Elements style={{ backgroundColor: activeLink === 'Taxes' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2  }}>
        <Print />
        <NavText>Taxes</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/visits'}
      onClick={() => handleSetActive('Visits')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%' }}>
      <Elements style={{ backgroundColor: activeLink === 'Visits' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2  }}>
        <Print />
        <NavText>Visits</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/orders'}
      onClick={() => handleSetActive('Orders')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%' }}>
      <Elements style={{ backgroundColor: activeLink === 'Orders' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2  }}>
        <Print />
        <NavText>Orders</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/customer'}
      onClick={() => handleSetActive('Customer')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%' }}>
      <Elements style={{ backgroundColor: activeLink === 'Customer' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2  }}>
        <Print />
        <NavText>Customer</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/menu'}
      onClick={() => handleSetActive('Menus')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%' }}>
      <Elements style={{ backgroundColor: activeLink === 'Menus' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2,transition: 'background-color 0.3s ease'}} >
        <Print />
        <NavText>Menus</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/feedback'}
      onClick={() => handleSetActive('Feedback')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%' }}>
      <Elements style={{ backgroundColor: activeLink === 'Feedback' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2  }}>
        <Print />
        <NavText>Feedback</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <Link to={'/reservation'}
      onClick={() => handleSetActive('Reservation')}
      style={{textDecoration:'none',color:'#c9c9c9',width:'90%' }}>
      <Elements style={{ backgroundColor: activeLink === 'Reservation' ? '#5894f5' : 'transparent',borderRadius:5,width:'85%',marginLeft:2  }}>
        <Print />
        <NavText>Customer Reservation</NavText>
        <ArrowRight/>
      </Elements>
      </Link>
      <a
    href="https://public.tableau.com/app/profile/mridul.miglani/viz/Dashboard_17160211508670/SalesAnalytics"
    onClick={(e) => {
        e.preventDefault(); // Prevent default navigation
        handleSetActive('report');
        window.open('https://public.tableau.com/app/profile/mridul.miglani/viz/Dashboard_17160211508670/SalesAnalytics', '_blank'); // Open the URL in a new tab
    }}
    style={{ textDecoration: 'none', color: '#c9c9c9', width: '90%' }}
>
    <Elements style={{ backgroundColor: activeLink === 'report' ? '#5894f5' : 'transparent', borderRadius: 5, width: '85%', marginLeft: 2 }}>
        <Print />
        <NavText>Report</NavText>
        <ArrowRight />
    </Elements>
</a>

      </div>
    </Menucontainer>
  )
}
