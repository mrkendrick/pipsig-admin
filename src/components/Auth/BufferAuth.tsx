import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { ActionTypes } from '../../redux/actions/types';
import { RootState } from '../../redux/reducers';
import { AlertVariant } from '../../redux/reducers/alert.reducer';

const BufferAuth = () => {
  const { replace } = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user, authLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (!authLoading && user._id === '' && !isAuthenticated) {
      dispatch({
        type: ActionTypes.alert,
        payload: {
          id: v4(),
          variant: AlertVariant.error,
          text: 'You are not authenticated. Please login...',
        },
      });
      replace('/auth?type=login');
    }

    // eslint-disable-next-line
  }, [isAuthenticated, user, authLoading]);

  return (
    <>
      {authLoading && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default BufferAuth;
