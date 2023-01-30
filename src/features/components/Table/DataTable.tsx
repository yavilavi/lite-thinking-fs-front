import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';


interface DataTableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  customRowId?: string;
  loading: boolean;
}

export default function DataTable(props: DataTableProps) {
  return <DataGrid
    rows={ props.rows || [] }
    columns={ props.columns }
    getRowId={ (row) => row[props.customRowId || "id"] }
    pagination
    loading={props.loading}
    density="compact"
    sx={ {
      height: "100%"
    } }
  />
}
