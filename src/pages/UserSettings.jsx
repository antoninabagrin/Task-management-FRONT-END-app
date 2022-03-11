import { Button, Grid, TextField } from '@mui/material';
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

export default function UserSettings() {
  const dispatch = useDispatch();
  const { location, number, telephone, address } = useSelector(
    selectUserDetailsData,
  );
  const status = useSelector(selectUserDetailsStatus);
  const [locationChange, setLocationChange] = useState();
  const [numberChange, setNumberChange] = useState();
  const [telephoneChange, setTelephoneChange] = useState();
  const [addressChange, setAddressChange] = useState();

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    setLocationChange(location);
    setNumberChange(number);
    setTelephoneChange(telephone.toString());
    setAddressChange(address);
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

  const updateUserDetails = async () => {
    if (locationChange || numberChange || telephoneChange || addressChange) {
      await axios.patch('/users/user/updateUser', {
        firstName: 'firstName',
        lastName: 'lastname',
        location: locationChange,
        number: numberChange.toString(),
        telephone: telephoneChange,
        address: addressChange,
      });
      dispatch(getUserDetails());
    }
  };

  return (
    <Grid
      container
      sx={{
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {status !== 'success' ? (
        <Grid item>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid item xs={10} md={7}>
            <TextField
              style={{ minWidth: 300 }}
              margin='normal'
              label='Location'
              type='text'
              value={locationChange}
              autoFocus
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={handleLocationChange}
            />
          </Grid>
          <Grid item xs={10} md={7}>
            <TextField
              style={{ minWidth: 300 }}
              margin='normal'
              label='Number'
              type='text'
              fullWidth
              value={numberChange}
              InputLabelProps={{ shrink: true }}
              onChange={handleNumberChange}
            />
          </Grid>
          <Grid item xs={10} md={7}>
            <TextField
              style={{ minWidth: 300 }}
              margin='normal'
              label='Telephone'
              type='text'
              fullWidth
              value={telephoneChange}
              autoFocus
              InputLabelProps={{ shrink: true }}
              onChange={handleTelephoneChange}
            />
          </Grid>
          <Grid item xs={10} md={7}>
            <TextField
              style={{ minWidth: 300 }}
              margin='normal'
              id='address'
              label='Address'
              type='text'
              fullWidth
              value={addressChange}
              InputLabelProps={{ shrink: true }}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={10} md={7}>
            <Button
              variant='contained'
              onClick={() => updateUserDetails()}
              type='submit'
            >
              Save changes!
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
}
