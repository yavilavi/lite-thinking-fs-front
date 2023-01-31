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
import { ChangeEvent } from "react";
import * as Yup from 'yup';
import Typography from "@mui/material/Typography";

interface SendEmailModalProps {

  open: boolean,
  handleClose: () => void

}

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email format")
    .required()
})

export default function SendEmailModal(props: SendEmailModalProps) {
  const { open, handleClose } = props;
  const [ emailValue, setEmailValue ] = React.useState("");
  const [ validationError, setValidationError ] = React.useState(false);

  const [ generatePDFAndSendEmail, { isLoading } ] = useGeneratePDFAndSendEmailMutation();

  const handleSendPDF = async () => {
    const valid = emailSchema.isValidSync(emailValue);
    if (!valid) {
      const toastId = toast.loading(`Generating PDF and sending to mail`);
      setTimeout(async () => {
        try {
          await generatePDFAndSendEmail({ recipientEmail: emailValue });
          toast.update(toastId, {
            render: `PDF generated and sent`,
            type: "success",
            isLoading: false
          });
          setTimeout(() => toast.dismiss(toastId), 3000);
          handleClose();
        } catch (e) {
          // @ts-ignore
          toast.update(toastId, { render: e.data.message, type: "error", isLoading: false });
          setTimeout(() => toast.dismiss(toastId), 3000);
        }

      }, 500)
    } else {
      setValidationError(!valid);
    }
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const valid = emailSchema.isValidSync({ email: event.currentTarget.value });
    console.log(valid);
    setValidationError(!valid);
    setEmailValue(event.currentTarget.value)
  }

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
          <Typography variant="caption" display="block" gutterBottom color="red">
            <span color="error">{ validationError && "Email not valid" }</span>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Cancel</Button>
          <LoadingButton loading={ isLoading } onClick={ handleSendPDF }>Send mail</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
