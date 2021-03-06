import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  IconButton,
  Input,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserDetails,
  selectUserDetailsData,
  selectUserDetailsStatus,
} from '../features/user/userDetailsSlice';
import { selectUser } from '../features/user/userSlice';
import axios from '../utils/axios';
import { useTranslation } from 'react-i18next';
import { updateUserImage } from '../features/user/userImageSlice';
import BasicAlerts from '../components/BasicAlerts';

export default function UserSettings() {
  const dispatch = useDispatch();
  const { location, number, telephone, address } = useSelector(
    selectUserDetailsData,
  );
  const data = useSelector(selectUserDetailsData);
  const status = useSelector(selectUserDetailsStatus);
  const user = useSelector(selectUser);
  const profileImage = useSelector((state) => state.userImage.profileImage);
  const [locationChange, setLocationChange] = useState();
  const [numberChange, setNumberChange] = useState();
  const [telephoneChange, setTelephoneChange] = useState();
  const [addressChange, setAddressChange] = useState();
  const [edit, setEdit] = useState(true);
  const [image, setImage] = useState(profileImage);
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    setLocationChange(location || '');
    setNumberChange(number || '');
    setTelephoneChange(telephone || '');
    setAddressChange(address || '');
    setImage(profileImage || '');
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  }, [number, location, telephone, address, profileImage, errorMessage]);

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

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      if (!e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
        let error = t('errorImageWrongFormat');
        setErrorMessage(error);
      } else {
        dispatch(updateUserImage(e.target.files[0]));
      }
    }
  };

  const createUpdateUserDetails = async () => {
    try {
      if (data === '') {
        await axios.post(`user-details/create-details/user/${user.id}`, {
          location: locationChange,
          number: numberChange.toString(),
          telephone: telephoneChange.toString(),
          address: addressChange,
        });
      } else {
        await axios.patch('users/user/updateUser', {
          firstName: user.firstName,
          lastName: user.lastName,
          location: locationChange,
          number: numberChange.toString(),
          telephone: telephoneChange.toString(),
          address: addressChange,
        });
      }
    } catch (error) {
      setErrorMessage(error);
    }
    dispatch(getUserDetails());
  };
  return (
    <Grid container direction='row' alignItems='center' justifyContent='center'>
      {errorMessage && <BasicAlerts message={errorMessage} />}
      {status !== 'success' ? (
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid item xs={10} md={7}>
            {image && (
              <img
                src={profileImage}
                alt='img'
                style={{ width: '100px', height: '100px' }}
              />
            )}
            <label htmlFor='file'>
              <Typography component='h1' variant='h5'>
                {t('Upload Photo')}
              </Typography>
              <Input
                type='file'
                id='file'
                // ref={hiddenFileInput}
                onChange={handleChangeImage}
                style={{ display: 'none' }}
                inputProps={{ accept: 'image/x-png,image/gif,image/jpeg' }}
              />
            </label>
          </Grid>
          <Grid item xs={10} md={7}>
            <TextField
              sx={{ maxWidth: '500px' }}
              margin='normal'
              label={t('Location')}
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
              label={t('Number')}
              type='number'
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
              label={t('Telephone')}
              type='number'
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
              label={t('Address')}
              type='text'
              fullWidth
              value={addressChange}
              InputLabelProps={{ shrink: true }}
              onChange={handleAddressChange}
              disabled={edit}
            />
          </Grid>
          <Grid item xs={10} md={7}>
            <Button
              sx={{ maxWidth: '500px' }}
              size='large'
              variant='contained'
              onClick={() => createUpdateUserDetails()}
              type='submit'
            >
              {t('Save!')}
            </Button>
            <IconButton
              sx={{ maxWidth: '500px' }}
              onClick={() => setEdit(!edit)}
            >
              <EditIcon />
            </IconButton>
          </Grid>
        </>
      )}
    </Grid>
  );
}
