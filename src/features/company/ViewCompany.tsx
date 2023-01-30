import { useGetCompanyQuery } from "../../services/CompanyService";
import React, { useEffect, useState } from "react";
import { useLayoutContext } from "../../context/layoutContext";
import { useParams } from "react-router-dom";
import ErrorPage from "../error-page/ErrorPage";
import { CardContent, CircularProgress, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import DataTable from "../components/Table/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import AdminRequired from "../wrappers/AdminRequired";
import { ICreateItem, IItem } from "./types";
import Box from "@mui/material/Box";
import AddEditItemModal from "./components/add-edit-item-modal/AddEditItemModal";

export default function ViewCompany() {
  const { NIT } = useParams();
  const { updateLayoutState, resetLayoutState } = useLayoutContext()
  const { data: company, isLoading, isError, isFetching, error, refetch } = useGetCompanyQuery(NIT);
  const [ showAddEditModal, setShowAddEditModal ] = useState<{ open: boolean, data: ICreateItem | null }>({
    open: false,
    data: null
  });

  const toggleAddEditItemModal = (data: ICreateItem | null = null) => {
    setShowAddEditModal({
      open: !showAddEditModal.open,
      data
    })
  }

  useEffect(() => {
    updateLayoutState({
      pageTitle: "Company detail",
      showPageHeaderAddAction: true,
      pageHeaderAddAction: () => toggleAddEditItemModal(null),
      pageHeaderAddActionBtnText: "item"
    })
    return () => {
      resetLayoutState()
    };
  }, []);

  const handleAction = async (data: IItem, type: "view" | "edit" | "delete", e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    try {
      if (type === "delete") {
        alert("Not implemented")
      }
      if (type === "edit") {
        alert("Not implemented")
      }
      if (type === "view") {
        alert("Not implemented")
      }

      throw new Error("Action type not defined");
    } catch (error) {
      console.log(error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', flex: 0.5, headerAlign: "center", minWidth: 120 },
    { field: 'name', headerName: 'Name', flex: 0.8, headerAlign: "center", minWidth: 200 },
    { field: 'stock', headerName: 'Stock', flex: 0.5, headerAlign: "center", minWidth: 125 },
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
    (!isLoading && !isFetching && !isError && !error) ?
      <>
        <CardContent
          sx={ {
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row", lg: "row", xl: "row" },
            justifyContent: { md: "space-around", lg: "space-around", xl: "space-around" },
            height: "100%",
            paddingBottom: "1rem"
          } }
        >
          <Box sx={ {
            display: "flex",
            flexDirection: { xs: "row", sm: "row", md: "column", lg: "column", xl: "column" },
            width: { xs: "100%", sm: "100%", md: "20%" }
          } }>
            <Box
              sx={ {
                width: "100%"
              } }
            >
              <Box sx={ {
                width: "100%"
              } }>
                <Typography
                  sx={ {
                    fontSize: { xs: "1rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1rem" }
                  } }
                  variant="h6"
                  component="div"
                >
                  Company NIT
                </Typography>
                <Typography
                  sx={ {
                    mb: 1,
                    fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem", lg: "1rem", xl: "1rem" },
                  } }
                  color="text.secondary"
                >
                  { company.NIT }
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={ {
                    fontSize: { xs: "1rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1rem" }
                  } }
                  variant="h6"
                  component="div"
                >
                  Company Name
                </Typography>
                <Typography
                  sx={ {
                    mb: 1,
                    fontSize: { xs: "0.89rem", sm: "0.89rem", md: "1rem", lg: "1rem", xl: "1rem" },
                  } }
                  color="text.secondary"
                >
                  { company.name }
                </Typography>
              </Box>
            </Box>

            <Box
              sx={ {
                width: "100%"
              } }>
              <Box>
                <Typography
                  sx={ {
                    fontSize: { xs: "1rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1rem" }
                  } }
                  variant="h6"
                  component="div"
                >
                  Company Address
                </Typography>
                <Typography
                  sx={ {
                    mb: 1,
                    fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem", lg: "1rem", xl: "1rem" },
                  } }
                  color="text.secondary"
                >
                  { company.address }
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={ {
                    fontSize: { xs: "1rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1rem" }
                  } }
                  variant="h6"
                  component="div"
                >
                  Company Phone
                </Typography>
                <Typography
                  sx={ {
                    mb: 1,
                    fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem", lg: "1rem", xl: "1rem" },
                  } }
                  color="text.secondary"
                >
                  { company.phone }
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={ {
            width: { xs: "100%", sm: "100%", md: "70%", lg: "70%", xl: "70%" },
            height: { xs: "70%", sm: "70%", md: "90%", lg: "90%", xl: "90%" }
          } }>
            <Typography
              variant="h6"
              component="div"
              sx={ {
                mb: 1
              } }
            >
              Company Items
            </Typography>
            <DataTable
              rows={ company.items }
              columns={ columns }
              loading={ isLoading || isFetching }
            />
          </Box>
        </CardContent>
        <AddEditItemModal
          open={ showAddEditModal.open && !!NIT }
          handleClose={ toggleAddEditItemModal }
          updateList={ refetch }
          initialData={ showAddEditModal.data }
          companyNIT={ NIT as string }
        />
      </>

      :
      !!error ? <ErrorPage errorCode={ error.status } message={ error.data.message }/> : <CircularProgress/>
  )
}
