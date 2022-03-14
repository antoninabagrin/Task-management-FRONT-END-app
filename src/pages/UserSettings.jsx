import { Button, Grid, IconButton, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from '../utils/axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserDetails,
  selectUserDetailsData,
  selectUserDetailsStatus,
} from '../features/user/userDetailsSlice';
import { selectUser } from '../features/user/userSlice';
import EditIcon from '@mui/icons-material/Edit';

export default function UserSettings() {
  const dispatch = useDispatch();
  const { location, number, telephone, address } = useSelector(
    selectUserDetailsData,
  );
  const status = useSelector(selectUserDetailsStatus);
  const { firstName, lastName, userId } = useSelector(selectUser);
  const [locationChange, setLocationChange] = useState();
  const [numberChange, setNumberChange] = useState();
  const [telephoneChange, setTelephoneChange] = useState();
  const [addressChange, setAddressChange] = useState();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    setLocationChange(location || '');
    setNumberChange(number || '');
    setTelephoneChange(telephone || '');
    setAddressChange(address || '');
  }, [number, location, telephone, address]);

  const handleLocationChange = (event) => {
    setLocationChange(event.target.value);
  };

  const handleTelephoneChange = (event) => {
    setTelephoneChange(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumberChange(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddressChange(event.target.value);
  };

  const createUpdateUserDetails = async () => {
    if (
      !locationChange &&
      !numberChange &&
      !telephoneChange &&
      !addressChange
    ) {
      await axios.post(`user-details/create-details/user/${userId}`, {
        location: locationChange,
        number: numberChange.toString(),
        telephone: telephoneChange,
        address: addressChange,
      });
    } else {
      await axios.patch('users/user/updateUser', {
        firstName: firstName,
        lastName: lastName,
        location: locationChange,
        number: numberChange.toString(),
        telephone: telephoneChange,
        address: addressChange,
      });
    }
    dispatch(getUserDetails());
  };

  return (
    <Grid container direction='row' alignItems='center' justifyContent='center'>
      {status !== 'success' ? (
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid item xs={10} md={7}>
            <TextField
              sx={{ maxWidth: '500px' }}
              margin='normal'
              label='Location'
              type='text'
              value={locationChange}
              autoFocus
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={handleLocationChange}
              disabled={edit}
            />
          </Grid>
          <Grid item xs={10} md={7}>
            <TextField
              sx={{ maxWidth: '500px' }}
              margin='normal'
              label='Number'
              type='text'
              fullWidth
              value={numberChange}
              InputLabelProps={{ shrink: true }}
              onChange={handleNumberChange}
              disabled={edit}
            />
          </Grid>
          <Grid item xs={10} md={7}>
            <TextField
              sx={{ maxWidth: '500px' }}
              margin='normal'
              label='Telephone'
              type='text'
              fullWidth
              value={telephoneChange}
              autoFocus
              InputLabelProps={{ shrink: true }}
              onChange={handleTelephoneChange}
              disabled={edit}
            />
          </Grid>
          <Grid item xs={10} md={7}>
            <TextField
              sx={{ maxWidth: '500px' }}
              margin='normal'
              id='address'
              label='Address'
              type='text'
              fullWidth
              value={addressChange}
              InputLabelProps={{ shrink: true }}
              onChange={handleAddressChange}
              disabled={edit}
            />
          </Grid>
          <Grid
            container
            spacing={3}
            justifyContent='space-evenly'
            alignItems='center'
          >
            <Grid item xs={2}>
              <Button
                sx={{ maxWidth: '500px' }}
                variant='contained'
                onClick={() => createUpdateUserDetails()}
                type='submit'
              >
                Save!
              </Button>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                sx={{ maxWidth: '500px' }}
                onClick={() => setEdit(!edit)}
              >
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
