import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ ref } { ...props } />;
});

interface ConfirmModalProps {
  open: boolean
  title: string,
  description: string,

  handleConfirmResponse: (response: boolean) => Promise<void>;
}

export default function ConfirmModal(props: ConfirmModalProps) {
  const { open, title, description, handleConfirmResponse } = props;

  return (
    <div>
      <Dialog
        open={ open }
        TransitionComponent={ Transition }
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{ title }</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            { description }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => handleConfirmResponse(false) } color="success">Cancel</Button>
          <Button onClick={ () => handleConfirmResponse(true) } color="error">Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
