import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  ModuleRegistry,
  RowSelectionOptions,
} from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { Box } from "@mui/joy";
import { useMemo } from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface EnhancedTableProps<T> {
  rowData: T[];
  columnDefs: ColDef[];
  defaultColDef?: ColDef;
  rowSelection?: RowSelectionOptions;
  paginationPageSize?: number;
}

const EnhancedTable = <T,>({
  rowData,
  columnDefs,
  defaultColDef,
  rowSelection = { mode: "multiRow", headerCheckbox: false },
  paginationPageSize = 5,
}: EnhancedTableProps<T>) => {
  const mergedDefaultColDef = useMemo(
    () => ({
      filter: "agTextColumnFilter",
      floatingFilter: true,
      sortable: true,
      flex: 1, // Distribuye el ancho equitativamente entre todas las columnas
      resizable: true, // Permite ajustar el ancho de las columnas manualmente
      minWidth: 140, // Ajusta el ancho mínimo de las columnas
      ...defaultColDef,
    }),
    [defaultColDef],
  );

  return (
    <Box
      className="ag-theme-quartz"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      sx={{
        width: "100%",
        height: "500px",
        maxWidth: {
          xs: "85vw",
          md: "100%",
        },
      }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={mergedDefaultColDef}
        rowSelection={rowSelection}
        pagination={true}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={[5, 10, 15, 20]}
        domLayout="autoHeight" // Ajusta automáticamente la altura de la tabla
      />
    </Box>
  );
};

export default EnhancedTable;
