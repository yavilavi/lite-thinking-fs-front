import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from "@mui/lab/LoadingButton";
import { FormikHelpers, Formik } from 'formik';
import { createItemSchema } from "./validation/validationSchema";
import Typography from "@mui/material/Typography";
import { ICreateItem } from "../../types";
import { toast } from "react-toastify";
import { useCreateItemMutation } from "../../../../services/CompanyService";

interface AddItemModalProps {
  open: boolean;
  handleClose: () => void;
  updateList: () => void;
  initialData: ICreateItem | null;

  companyNIT: string;
}

export default function AddEditItemModal(props: AddItemModalProps) {
  const { open, handleClose, updateList, initialData, companyNIT } = props;

  const onClose = () => {
    handleClose();
  }

  const [ createItem ] = useCreateItemMutation();
  const handleOnSubmit = async (values: ICreateItem, formikHelpers: FormikHelpers<ICreateItem>) => {
    formikHelpers.setSubmitting(true);
    const toastId = toast.loading(`${ initialData ? "updating" : "creating" } Item...`);
    try {
      await createItem(values).unwrap();
      updateList()
      formikHelpers.setSubmitting(false);
      toast.update(toastId, {
        render: `Item ${ initialData ? "updated" : "created" }`,
        type: "success",
        isLoading: false
      });
      setTimeout(() => toast.dismiss(toastId), 3000);
      onClose();
    } catch (e) {
      console.log(e);
      formikHelpers.setSubmitting(false);
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
          initialValues={ !!initialData ? {
              name: initialData.name,
              stock: initialData.stock,
              companyNIT: companyNIT
            } :
            {
              name: "",
              companyNIT: companyNIT,
              stock: 0
            } }
          validationSchema={ createItemSchema }
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
                id="name"
                label="Item Name"
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
                id="stock"
                label="Item Stock"
                type="number"
                fullWidth
                variant="standard"
                onChange={ handleChange }
                value={ values.stock }
                onBlur={ handleBlur }
              />
              <Typography variant="caption" display="block" gutterBottom color="red">
                <span color="error">{ errors.stock && touched.stock && errors.stock }</span>
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
