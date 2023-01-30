import * as Yup from 'yup';

export const createItemSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is to short')
    .max(40, 'Name is to long')
    .required('Item name is required'),
  companyNIT: Yup.number()
    .required('company NIT is required')
    .test('len', 'company NIT is too long', (val) => !val ? false : val.toString().length <= 12)
    // @ts-ignore
    .test('len', 'company NIT Requires at least 6 digits', (val) => !val ? false : val.toString().length >= 6)
    .typeError('company NIT must be a number'),
  stock: Yup.number()
    .required('Stock is required')
    .min(0, "Stock can not be empty")
    .typeError('Stock must be a number'),
});
