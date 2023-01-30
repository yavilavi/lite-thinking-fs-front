import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from "@mui/lab/LoadingButton";
import { FormikHelpers, Formik } from 'formik';
import { createCompanyInitialValues, createCompanySchema } from "./validation/validationSchema";
import Typography from "@mui/material/Typography";
import { useCreateCompanyMutation } from "../../../../services/CompanyService";
import { ICreateCompany } from "../../types";
import { toast } from "react-toastify";

interface AddCompanyModalProps {
  open: boolean;
  handleClose: () => void;
  updateList: () => void;
  initialData: ICreateCompany | null;
}

export default function AddEditCompanyModal(props: AddCompanyModalProps) {
  const { open, handleClose, updateList, initialData } = props;

  const onClose = () => {
    handleClose();
  }

  const [ createCompany ] = useCreateCompanyMutation();
  const handleOnSubmit = async (values: ICreateCompany, formikHelpers: FormikHelpers<ICreateCompany>) => {
    formikHelpers.setSubmitting(true);
    const toastId = toast.loading(`${ initialData ? "updating" : "creating" } Company...`);
    try {
      await createCompany(values).unwrap();
      updateList();
      formikHelpers.setSubmitting(false);
      toast.update(toastId, {
        render: `Company ${ initialData ? "updated" : "created" }`,
        type: "success",
        isLoading: false
      });
      setTimeout(() => toast.dismiss(toastId), 3000);
      onClose();
    } catch (e) {
      // @ts-ignore
      toast.update(toastId, { render: e.data.message, type: "error", isLoading: false });
      setTimeout(() => toast.dismiss(toastId), 3000);
    }
  };

  return (
    <Dialog open={ open } onClose={ onClose } fullWidth>
      <DialogTitle>{ `${ initialData ? "Edit " : "Add new " }Item` }</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={ initialData || createCompanyInitialValues }
          validationSchema={ createCompanySchema }
          onSubmit={ handleOnSubmit }
        >
          { ({
               values,
               errors,
               touched,
               handleChange,
               handleBlur,
               handleSubmit,
               isSubmitting,
               resetForm,
             }) => (
            <form
              onSubmit={ handleSubmit }
            >
              <TextField
                autoFocus
                margin="dense"
                id="NIT"
                label="Company NIT"
                type="text"
                fullWidth
                variant="standard"
                onChange={ handleChange }
                value={ values.NIT }
                onBlur={ handleBlur }
              />
              <Typography variant="caption" display="block" gutterBottom color="red">
                <span color="error">{ errors.NIT && touched.NIT && errors.NIT }</span>
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Company Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={ handleChange }
                value={ values.name }
                onBlur={ handleBlur }
              />
              <Typography variant="caption" display="block" gutterBottom color="red">
                <span color="error">{ errors.name && touched.name && errors.name }</span>
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                id="address"
                label="Company address"
                type="text"
                fullWidth
                variant="standard"
                onChange={ handleChange }
                value={ values.address }
                onBlur={ handleBlur }
              />
              <Typography variant="caption" display="block" gutterBottom color="red">
                <span color="error">{ errors.address && touched.address && errors.address }</span>
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                id="phone"
                label="Company phone"
                type="text"
                fullWidth
                variant="standard"
                onChange={ handleChange }
                value={ values.phone }
                onBlur={ handleBlur }
              />
              <Typography variant="caption" display="block" gutterBottom color="red">
                <span color="error">{ errors.phone && touched.phone && errors.phone }</span>
              </Typography>
              <DialogActions>
                <Button onClick={ () => {
                  onClose();
                  resetForm();
                } }
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  loading={ isSubmitting }
                >
                  Save
                </LoadingButton>
              </DialogActions>
            </form>
          ) }
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
