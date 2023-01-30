import DataTable from "../../components/Table/DataTable";
import React, { useState } from "react";
import { useGetAllItemsQuery } from "../../../services/CompanyService";
import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";
import { IItem } from "../types";
import _ from "lodash";
import SendEmailModal from "./SendEmailModal";
import Button from "@mui/material/Button";

export default function Stock() {
  const { data: items, isLoading, isFetching } = useGetAllItemsQuery();
  const [ openSendEmailModal, setOpenSendEmailModal ] = useState(false)

  const toggleSendEmailModal = () => {
    setOpenSendEmailModal(!openSendEmailModal)
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', flex: 0.5, headerAlign: "center", minWidth: 120 },
    { field: 'name', headerName: 'Name', flex: 0.8, headerAlign: "center", minWidth: 200 },
    { field: 'stock', headerName: 'Stock', flex: 0.5, headerAlign: "center", minWidth: 125 },
    { field: 'companyNIT', headerName: 'Company', flex: 0.5, headerAlign: "center", minWidth: 125 },

  ];
  return (
    <Box
      sx={ {
        height: "100%",
        display: "flex",
        flexDirection: "column"
      } }
    >
      <Button
        variant="outlined"
        onClick={ toggleSendEmailModal }
      >
        Send Stock by email
      </Button>
      <DataTable
        rows={ !!items ? (items as IItem[]).map((item) => {
          const aux = _.cloneDeep(item);
          aux.companyNIT = item.company.name
          return aux;
        }) : [] }
        columns={ columns }
        loading={ isLoading || isFetching }
      />
      <SendEmailModal open={ openSendEmailModal } handleClose={ toggleSendEmailModal }/>
    </Box>

  )
};
