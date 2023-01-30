import * as Yup from 'yup';

export const createCompanySchema = Yup.object().shape({
  NIT: Yup.number()
    .required('NIT is required')
    .test('len', 'NIT is too long', (val) => !val ? false : val.toString().length <= 12)
    // @ts-ignore
    .test('len', 'Requires at least 6 digits', (val) => !val ? false : val.toString().length >= 6)
    .typeError('NIT must be a number'),
  name: Yup.string()
    .min(2, 'Name is to short')
    .max(40, 'Name is to long')
    .required('Company name is required'),
  address: Yup.string()
    .min(8, 'Address is to short')
    .max(50, 'Address is to long')
    .required('Address is required'),
  phone: Yup.number()
    .required('Phone is required')
    .test('len', 'Phone is too long', (val) => !val ? false : val.toString().length <=10)
    .test('len', 'Remember to add 60+indicative if you are registering a landing phone', (val) => !val ? false : val.toString().length >= 10)
    .typeError('Phone must be a number'),
});

export const createCompanyInitialValues = {
  NIT: "",
  name: "",
  address: "",
  phone: "",
};
