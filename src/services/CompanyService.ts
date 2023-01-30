import {
  createApi,
  EndpointDefinitions,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import { ICompany, ICreateCompany, ICreateItem, IItem } from "../features/company/types";
import { RootState } from "../redux/store";

export const companyService = createApi({
  reducerPath: 'companyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token: string | null = (getState() as unknown as RootState).auth.accessToken ?? localStorage.getItem('accessToken');
      if (token) {
        headers.set('authorization', `bearer ${ token }`);
      }
    }
  }),
  endpoints: (builder): EndpointDefinitions => ({
    getAllCompanies: builder.query<ICompany, undefined>({
      query: () => `company/getAll`,
    }),
    createCompany: builder.mutation<ICompany, ICreateCompany>({
      query: (company) => ({
        url: 'company',
        method: 'POST',
        body: company,
      })
    }),
    deleteCompany: builder.mutation<ICompany, Pick<ICompany, "NIT">>({
      query: (companyNIT) => ({
        url: `company/${ companyNIT }`,
        method: 'DELETE'
      })
    }),
    updateCompany: builder.mutation<ICompany, Partial<ICreateCompany>>({
      query: (companyNIT) => ({
        url: `company/${ companyNIT }`,
        method: 'PUT'
      })
    }),
    getCompany: builder.query<ICompany, Pick<ICompany, "NIT">>({
      query: (companyNIT) => `company/getByNIT/${ companyNIT }`,
    }),
    getAllItems: builder.query<IItem, undefined>({
      query: () => `item/getAll`,
    }),
    createItem: builder.mutation<IItem, ICreateItem>({
      query: (item) => ({
        url: 'item',
        method: 'POST',
        body: item,
      })
    }),
    generatePDFAndSendEmail: builder.mutation<{ status: string, fileUrl: string }, { recipientEmail: string }>({
      query: (recipientEmail) => ({
        url: 'item/generatePDFAndSendEmail',
        method: 'POST',
        body: recipientEmail,
      })
    }),
  })
});
// @ts-ignore
export const {
  // @ts-ignore
  useGetAllCompaniesQuery,
  // @ts-ignore
  useCreateCompanyMutation,
  // @ts-ignore
  useDeleteCompanyMutation,
  // @ts-ignore
  useGetCompanyQuery,
  // @ts-ignore
  useGetAllItemsQuery,
  // @ts-ignore
  useCreateItemMutation,
  // @ts-ignore
  useGeneratePDFAndSendEmailMutation,
} = companyService;
