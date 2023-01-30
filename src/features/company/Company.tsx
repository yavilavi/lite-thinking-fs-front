import React, { useEffect, useState } from "react";
import DataTable from "../components/Table/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { useGetAllCompaniesQuery, useDeleteCompanyMutation } from "../../services/CompanyService";
import { ICompany, ICreateCompany } from "./types";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import AdminRequired from "../wrappers/AdminRequired";
import { useLayoutContext } from "../../context/layoutContext";
import AddEditCompanyModal from "./components/add-edit-company-modal/AddEditCompanyModal";
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal";
import { useNavigate } from "react-router-dom";

export default function Company() {
  const navigate = useNavigate()
  const { updateLayoutState, resetLayoutState } = useLayoutContext()
  const [ showAddEditModal, setShowAddEditModal ] = useState<{ open: boolean, data: ICreateCompany | null }>({
    open: false,
    data: null
  });
  const [ showConfirmModal, setShowConfirmModal ] = useState<{ open: boolean, data: ICompany }>({
    open: false,
    data: {} as ICompany,
  });

  const toggleAddEditCompanyModal = (data: ICreateCompany | null = null) => {
    setShowAddEditModal({
      open: !showAddEditModal.open,
      data
    })
  }

  useEffect(() => {
    updateLayoutState({
      pageTitle: "Company",
      pageHeaderAddAction: () => toggleAddEditCompanyModal(null),
      showPageHeaderAddAction: true,
      pageHeaderAddActionBtnText: "company"
    })
    return () => {
      resetLayoutState()
    };
  }, []);
  const { data: companies, isLoading, refetch, isFetching } = useGetAllCompaniesQuery();
  const [ deleteCompany ] = useDeleteCompanyMutation();

  const handleConfirmResponse = async (response: boolean) => {
    if (response) {
      const toastId = toast.loading(`Deleting company with NIT: ${ showConfirmModal.data.NIT }`);
      try {
        await deleteCompany(showConfirmModal.data.NIT);
        toast.update(toastId, { render: "Company deleted", type: "success", isLoading: false });
        setTimeout(() => toast.dismiss(toastId), 3000);
        refetch()
      } catch (err) {
        // @ts-ignore
        toast.update(toastId, { render: err.data.message, type: "error", isLoading: false });
        setTimeout(() => toast.dismiss(toastId), 3000);
      }
    }
    setShowConfirmModal({
      open: false,
      data: {} as ICompany,
    });
  }

  const handleAction = async (data: ICompany, type: "view" | "edit" | "delete", e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    try {
      if (type === "delete") {
        setShowConfirmModal({
          open: true,
          data: data,
        });
      }
      if (type === "edit") {
        const { NIT, address, name, phone } = data;
        toggleAddEditCompanyModal({ NIT, address, name, phone })
      }

      if (type === "view") navigate(`/company/view/${ data.NIT }`)

      throw new Error("Action type not defined");
    } catch (error) {
      console.log(error);
    }
  };
  const columns: GridColDef[] = [
    { field: 'NIT', headerName: 'NIT', flex: 0.5, headerAlign: "center", minWidth: 120 },
    { field: 'name', headerName: 'Name', flex: 0.8, headerAlign: "center", minWidth: 200 },
    { field: 'address', headerName: 'Address', flex: 1, headerAlign: "center", minWidth: 300 },
    { field: 'phone', headerName: 'Phone', flex: 0.5, headerAlign: "center", minWidth: 125 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      flex: 0.4,
      headerAlign: "center",
      disableColumnMenu: true,
      minWidth: 120,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={ (e) => handleAction(params.row, "view", e) }
              size="small"
              color="info"
            >
              <Visibility/>
            </IconButton>
            <AdminRequired>
              <IconButton
                onClick={ (e) => handleAction(params.row, "edit", e) }
                size="small"
                color="warning"
              >
                <Edit/>
              </IconButton>
            </AdminRequired>
            <AdminRequired>
              <IconButton
                onClick={ (e) => handleAction(params.row, "delete", e) }
                size="small"
                color="error"
              >
                <Delete/>
              </IconButton>
            </AdminRequired>
          </>
        );
      }
    }
  ];

  return (
    <>
      <DataTable
        rows={ companies }
        columns={ columns }
        customRowId="NIT"
        loading={ isLoading || isFetching }
      />
      <AddEditCompanyModal
        open={ showAddEditModal.open }
        handleClose={ toggleAddEditCompanyModal }
        updateList={ refetch }
        initialData={ showAddEditModal.data }
      />
      <ConfirmModal
        open={ showConfirmModal.open }
        title="Confirm delete action"
        description={ `Are you sure you want to delete company ${ showConfirmModal.data.name } with NIT ${ showConfirmModal.data.NIT }` }
        handleConfirmResponse={ handleConfirmResponse }
      />
    </>
  )
}
