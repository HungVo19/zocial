import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ReactNode } from 'react';

interface AlertOptions {
  openSnackbar: boolean;
  keyName: string;
  message: string | ReactNode;
  isSeverity: boolean;
}

const AlertMessage = ({
  openSnackbar,
  keyName,
  isSeverity,
  message,
}: AlertOptions) => {
  return (
    <Snackbar
      open={openSnackbar}
      key={keyName}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        severity={isSeverity ? 'success' : 'error'}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
