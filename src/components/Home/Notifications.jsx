import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { AppBar, Box, Button, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import { SetNotificationCount } from '../../redux/actions/notification'; // Update the path if needed

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
        // Check if the notification with the same _id already exists in the queue
        const existingNotification = prevQueue.find((notification) => notification._id === data._id);

        if (!existingNotification) {
          // Add the new notification to the front of the queue
          return [{ ...data, createdAt: moment() }, ...prevQueue];
        }

        // If the notification with the same _id exists, return the previous state
        return prevQueue;
      });

      // Update notification counter in Redux state
      dispatchRedux(SetNotificationCount(notificationCount + 1));
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
          dispatchRedux(SetNotificationCount(sortedNotifications.length)); // Update count
        })
        .catch(() => {
          toast.error("Error Fetching Notifications");
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
      // Update notification counter in Redux state
      dispatchRedux(SetNotificationCount(notificationCount - 1)); // Decrement count
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearNotifications = async () => {
    try {
      await axios.delete(`http://localhost:4000/notifications/delete/${id}`);
      setNotificationQueue([]);
      // Reset notification counter in Redux state
      dispatchRedux(SetNotificationCount(0));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleNotificationsClose}>
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
          {notificationQueue.map((notification, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding sx={{ display: 'flex', alignItems: 'center', borderRadius: '10px', mb: 1, backgroundColor: '#F5F5F5', px: 2 }}>
                <NotificationsActiveIcon sx={{ color: 'red', pr: 1 }} />
                <ListItemText primary={notification.detail} secondary={moment(notification.createdAt).format('MMMM D, YYYY h:mm A')} sx={{ mt: 2, mb: 3 }} />
                <CloseIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleDeleteSingleNotification(notification._id)}
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, position: 'absolute', bottom: 0, width: '100%' }}>
          <Button onClick={handleClearNotifications} variant='outlined' fullWidth>Clear All</Button>
        </Box>
      </div>
    </Drawer>
  );
};

export default NotificationDrawer;
