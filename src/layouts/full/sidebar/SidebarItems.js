import React from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router-dom';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import './sidebar.css'

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

  return (
    <div className='sidebar-1'>
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav"  style={{fontFamily:"'Poppins', sans-serif"}} >
        {Menuitems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader}  />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return (
             
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        })}
      </List>
    </Box>
    </div>
  );
};
export default SidebarItems;
