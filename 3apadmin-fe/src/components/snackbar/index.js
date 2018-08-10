// @flow
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

type Props = {
  state: boolean,
  message: string,
  closeFn: Function
};

const SnackbarMessage = ({ state, closeFn, message }: Props) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    open={state}
    onClose={closeFn}
    ContentProps={{
      'aria-describedby': 'message-id'
    }}
    message={<span id="message-id">{message}</span>}
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={closeFn}
      >
        <CloseIcon />
      </IconButton>
    ]}
  />
);

export default SnackbarMessage;
