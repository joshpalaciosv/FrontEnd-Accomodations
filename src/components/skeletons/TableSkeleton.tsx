import { Box, Skeleton } from "@mui/joy";

interface TableSkeletonProps {
  rowCount?: number;
  columnCount?: number;
}

const TableSkeleton = ({
  rowCount = 5,
  columnCount = 3,
}: TableSkeletonProps) => {
  return (
    <Box sx={{ width: "100%", overflow: "hidden", maxHeight: 500 }}>
      {/* Simula el encabezado de la tabla */}
      <Box sx={{ display: "flex", mb: 1 }}>
        {[...Array(columnCount)].map((_, index) => (
          <Box key={index} sx={{ flex: 1, px: 1 }}>
            <Skeleton variant="rectangular" width="100%" height={70} />
          </Box>
        ))}
      </Box>
      {/* Simula el cuerpo de la tabla */}
      {[...Array(rowCount)].map((_, rowIndex) => (
        <Box key={rowIndex} sx={{ display: "flex", mb: 0.5 }}>
          {[...Array(columnCount)].map((_, colIndex) => (
            <Box key={colIndex} sx={{ flex: 1, px: 1 }}>
              <Skeleton variant="rectangular" width="100%" height={35} />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default TableSkeleton;
