import React from "react";
import { Visibility } from '@mui/icons-material'
import { IconButton } from "@mui/material";

interface TableRowActionsProps {
  enabledActions: ("view" | "edit" | "delete")[];
}

export default function TableRowActions(props: TableRowActionsProps) {
  const { enabledActions } = props
  return (
    <div>
      {
        enabledActions.map(actionName => {
          if (actionName === "view") {
            return (
              <IconButton>
                <Visibility/>
              </IconButton>
            )
          }
        })
      }
    </div>
  )
}
