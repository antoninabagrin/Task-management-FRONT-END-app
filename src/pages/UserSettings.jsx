import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserDetails,
  selectUserDetails,
} from '../features/user/userDetailsSlice';
import { Box } from '@mui/system';

export default function UserSettings() {
  const dispatch = useDispatch();
  const { location, number, telephone, address } =
    useSelector(selectUserDetails).data;
  const [locationChange, setLocationChange] = useState(location);
  const [numberChange, setNumberChange] = useState(number);
  const [telephoneChange, setTelephoneChange] = useState(telephone);
  const [addressChange, setAddressChange] = useState(address);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

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

  // http://localhost:3000/user-details/create-details/user/b573fc80-2406-4b2e-9bc0-6a6010c9f185

  const updateUserDetails = async () => {
    if (locationChange || numberChange || telephoneChange || addressChange) {
      await axios.post(
        '/user-details/create-details/user/b573fc80-2406-4b2e-9bc0-6a6010c9f185',
        {
          location,
          number,
          telephone,
          address,
        },
      );
      dispatch(getUserDetails());
    }
  };

  return (
    <Grid container>
      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit}
        sx={{
          margin: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          margin='normal'
          label='Location'
          type='text'
          value={locationChange}
          autoFocus
          InputLabelProps={{ shrink: true }}
          onChange={handleLocationChange}
        ></TextField>
        <TextField
          margin='normal'
          label='Number'
          type='text'
          value={numberChange}
          autoFocus
          InputLabelProps={{ shrink: true }}
          onChange={handleNumberChange}
        ></TextField>
        <TextField
          margin='normal'
          label='Telephone'
          type='text'
          value={telephoneChange}
          autoFocus
          InputLabelProps={{ shrink: true }}
          onChange={handleTelephoneChange}
        ></TextField>
        <TextField
          margin='normal'
          id='address'
          label='Address'
          type='text'
          value={addressChange}
          autoFocus
          InputLabelProps={{ shrink: true }}
          onChange={handleAddressChange}
        ></TextField>
        <Button
          variant='contained'
          onClick={() => updateUserDetails()}
          type='submit'
        >
          Save changes!
        </Button>
      </Box>
    </Grid>
  );
}
