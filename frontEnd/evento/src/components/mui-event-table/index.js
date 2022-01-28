import React from "react";
import Datagrid from '@mui/material/Button';

// Not using at the moment
function MuiEventTable() {


    return (
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
        />

    )
}

export default MuiEventTable;