import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

interface PopupConfirmItf {
  openConfirm: any;
  handleConfirm: any;
  handleCloseConfirm: any;
  title: string;
  buttonSubmit: string;
  buttonCancel: string;
}

const PopupConfirm = ({
  openConfirm,
  handleConfirm,
  handleCloseConfirm,
  title,
  buttonSubmit,
  buttonCancel,
}: PopupConfirmItf) => {
  return (
    <Dialog open={openConfirm} onClose={handleCloseConfirm}>
      <DialogTitle sx={{ width: '400px' }}>{title}</DialogTitle>
      <DialogActions sx={{ padding: '16px' }}>
        <Button onClick={handleConfirm} variant='contained'>
          {buttonSubmit}
        </Button>
        <Button onClick={handleCloseConfirm} variant='outlined'>
          {buttonCancel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupConfirm;
