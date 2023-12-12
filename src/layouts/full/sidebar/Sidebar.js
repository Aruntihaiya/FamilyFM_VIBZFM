import { useMediaQuery, Box, Drawer,createTheme } from '@mui/material';
import Logo from '../shared/logo/Logo';
import SidebarItems from './SidebarItems';
import { Upgrade } from './Updrade';
// import App from 'src/App';
import './sidebar.css'

const Sidebar = (props) => {

// const theme = createTheme({
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 960,
//       lg: 1280, // Adjust the 'lg' breakpoint to your desired value
//       xl: 1920,
//     },
//   },
//   // Add other theme customizations here
// });



  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const sidebarWidth = '270px';

  if (lgUp) {
    return (
      <div className='sidebar-box'  >
      <Box
      className="sidebar"
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          // color:'#red',
          // backgroundColor:'#222 !important'
          
          
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
         className="sidebar"

          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: 'border-box',
              color:'#fff',
        
            },
          }}
        >

          {/* <Box
            
         
          > */}

          
            {/* <Box  > */}
            <div className='sidebar-img'>
              <Logo />
              </div>
            {/* </Box> */}
            
            {/* <Box > */}
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems />
              {/* <Upgrade /> */}
            {/* </Box> */}
          
          {/* </Box> */}
        </Drawer>
      </Box>
      </div>
    );
  }

  return (
    <div className='sidebar-box-1'>
    <Drawer
    
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      // variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          // backgroundColor:"#222"
     
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
    
      {/* <Box px={2}> */}
      <div className='sidebar-img'>
        <Logo />
        </div>
      {/* </Box> */}
  
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
      {/* <Upgrade /> */}
    </Drawer>
    </div>
  );
};

export default Sidebar;
