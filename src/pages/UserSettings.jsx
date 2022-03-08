import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserDetails,
  selectUserDetails,
} from '../features/user/userDetailsSlice';

export default function UserSettings() {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const { t } = useTranslation();
  const headerWeight = { fontWeight: '700' };

  useEffect(() => {
    dispatch(getUserDetails());
    console.log(userDetails, 'details');
  }, [dispatch]);

  return (
    <Grid item xs={12} md={8} style={{ height: '100%' }}>
      <TableContainer component={Paper} sx={{ marginTop: 5 }}>
        <Table sx={{ minWidth: '580px' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={headerWeight} align='center'>
                {t('Location')}
              </TableCell>
              <TableCell sx={headerWeight} align='center'>
                {t('Number')}
              </TableCell>
              <TableCell sx={headerWeight} align='center'>
                {t('Telephone')}
              </TableCell>
              <TableCell sx={headerWeight} align='center'>
                {t('Address')}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userDetails.userDetails.id}
            <TableRow>
              <TableCell align='center'>{userDetails.location}</TableCell>
              <TableCell align='center'>{userDetails.number}</TableCell>
              <TableCell align='center'>{userDetails.telephone}</TableCell>
              <TableCell align='center'>{userDetails.address}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
