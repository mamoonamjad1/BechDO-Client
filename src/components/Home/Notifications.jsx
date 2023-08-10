import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { AppBar, Box, Divider, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CloseIcon from '@mui/icons-material/Close';
import { io } from 'socket.io-client';
const socket = io('http://localhost:4000');

const NotificationDrawer = ({ open, handleNotificationsClose }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected');
    });
  
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  
    socket.on('sendNotification', (data) => {
      // Update the notifications state with the received notification
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: prevNotifications.length + 1, message: data.about },
      ]);
    });
  
    return () => {
      socket.disconnect(); // Clean up the socket connection when the component unmounts
    };
  }, []);
  

  return (
    <Drawer anchor="right" open={open} onClose={handleNotificationsClose}>
      {/* Drawer Content */}
      <AppBar sx={{ width: 300, backgroundColor: '#0C134F' }} position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <NotificationsNoneIcon />
              <Typography variant="h6" sx={{ marginLeft: 1 }}>
                Notifications
              </Typography>
            </Box>
            <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleNotificationsClose} />
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ width: 300 }}>
        <List>
          {notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <ListItem disablePadding>
                <ListItemText primary={notification.message} sx={{ mt: 2, mb: 3, pl: 2 }} />
                <CloseIcon sx={{ cursor: 'pointer', pr: 2 }} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default NotificationDrawer;
