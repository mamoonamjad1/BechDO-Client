import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { AppBar, Box, Button, List, ListItem, ListItemText, Toolbar, Typography, Paper } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import { SetNotificationCount } from '../../redux/actions/notification';

const socket = io('http://localhost:4000');

const NotificationDrawer = ({ open, handleNotificationsClose }) => {
  const [notificationQueue, setNotificationQueue] = useState([]);
  const id = useSelector((state) => state.authReducer.userId);
  const notificationCount = useSelector((state) => state.notificationReducer.notificationCount);
  const dispatchRedux = useDispatch();

  useEffect(() => {
    const handleNotification = (data) => {
      console.log("Socket Notification", data.detail);
      setNotificationQueue((prevQueue) => {
        const existingNotification = prevQueue.find((notification) => notification._id === data._id);

        if (!existingNotification) {
          return [{ ...data, createdAt: moment() }, ...prevQueue];
        }

        return prevQueue;
      });

      dispatchRedux(SetNotificationCount(notificationCount + 0.25));
    };

    socket.on('sendNotification', handleNotification);

    return () => {
      socket.off('sendNotification', handleNotification);
    };
  }, [notificationCount, dispatchRedux]);

  useEffect(() => {
    try {
      axios.get(`http://localhost:4000/notifications/${id}`)
        .then((res) => {
          const sortedNotifications = res.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setNotificationQueue(sortedNotifications);
          dispatchRedux(SetNotificationCount(sortedNotifications.length));
        })
        .catch(() => {
        });
    } catch (error) {
      console.error(error);
    }
  }, [id, dispatchRedux]);

  const handleDeleteSingleNotification = async (notificationId) => {
    try {
      await axios.delete(`http://localhost:4000/notifications/delete/single/${notificationId}`);
      setNotificationQueue((prevQueue) =>
        prevQueue.filter((notification) => notification._id !== notificationId)
      );
      dispatchRedux(SetNotificationCount(notificationCount - 1));
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearNotifications = async () => {
    try {
      await axios.delete(`http://localhost:4000/notifications/delete/${id}`);
      setNotificationQueue([]);
      dispatchRedux(SetNotificationCount(0));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleNotificationsClose}>
      <Paper sx={{ width: 250, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <AppBar sx={{ backgroundColor: '#0C134F' }} position="static">
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <NotificationsNoneIcon />
                <Typography variant="h6" sx={{ marginLeft: 1, color: 'white' }}>
                  Notifications
                </Typography>
              </Box>
              <CloseIcon sx={{ cursor: 'pointer', color: 'white' }} onClick={handleNotificationsClose} />
            </Box>
          </Toolbar>
        </AppBar>
        <List sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
          {notificationQueue.map((notification, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'flex', alignItems: 'center', mb: 1, borderRadius: '5px', border: '1px solid #ccc' }}>
              <NotificationsActiveIcon fontSize='large' sx={{ color: 'red', pr: 1 }} />
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                    {notification.detail}
                  </Typography>
                }
                secondary={moment(notification.createdAt).format('MMMM D, YYYY h:mm A')}
                sx={{ mt: 2, mb: 3 }}
              />
              <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => handleDeleteSingleNotification(notification._id)} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ p: 2 }}>
          <Button onClick={handleClearNotifications} variant='outlined' fullWidth>
            Clear All
          </Button>
        </Box>
      </Paper>
    </Drawer>
  );
};

export default NotificationDrawer;
