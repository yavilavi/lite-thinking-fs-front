import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useGeneratePDFAndSendEmailMutation } from "../../../services/CompanyService";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";

interface SendEmailModalProps {

  open: boolean,
  handleClose: () => void

}

export default function SendEmailModal(props: SendEmailModalProps) {
  const { open, handleClose } = props;
  const [ emailValue, setEmailValue ] = React.useState("");

  const [ generatePDFAndSendEmail, { isLoading } ] = useGeneratePDFAndSendEmailMutation();

  const handleSendPDF = async () => {
    const toastId = toast.loading(`Generating PDF y enviando email`);
    try {
      const response = await generatePDFAndSendEmail().unwrap();
      console.log(response);
      toast.update(toastId, {
        render: `PDF generado y enviado por email`,
        type: "success",
        isLoading: false
      });
      setTimeout(() => toast.dismiss(toastId), 3000);
      handleClose();
    }catch (e) {
      // @ts-ignore
      toast.update(toastId, { render: e.data.message, type: "error", isLoading: false });
      setTimeout(() => toast.dismiss(toastId), 3000);
    }
  }

  const handleOnChange = (e: any) => {
    setEmailValue("yildavilla@gmail.com")
  };

  return (
    <div>
      <Dialog open={ open } onClose={ handleClose }>
        <DialogTitle>Send Stock by email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Receive the stock in PDF, please enter your email address here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={ handleOnChange }
            value={ emailValue }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Cancel</Button>
          <LoadingButton loading={ isLoading } onClick={ handleSendPDF }>Subscribe</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
