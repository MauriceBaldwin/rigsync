import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import RigSyncPagination, { PaginationProps } from "./RigSyncPagination";

interface RigSyncTableColumn {
  title: string;
  fieldKey: string;
}

type RigSyncTableData = Record<string, unknown>;

interface RigSyncTableProps {
  columns: RigSyncTableColumn[];
  data?: RigSyncTableData[];
  count?: number;
  pagination?: PaginationProps;
  error?: string
  isLoading?: boolean
}

const getItemId = (item: RigSyncTableData): string => {
  if (typeof item.id !== 'string') {
    throw new Error("RigSyncTable data must have a string 'id' property");
  }

  return item.id;
};

const getItemField = (
  item: RigSyncTableData,
  fieldKey: string,
): string | number => {
  if (
    typeof item[fieldKey] !== 'string' &&
    typeof item[fieldKey] !== 'number'
  ) {
    throw new Error(
      `RigSyncTable does not support field of type ${typeof item[fieldKey]}`,
    );
  }

  return item[fieldKey];
};

const RigSyncTable = ({
  columns,
  data,
  count,
  pagination,
  error,
  isLoading,
}: RigSyncTableProps) => {
  return (
    <Stack spacing={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.fieldKey}>{column.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading &&
              <TableRow key="loading">
                <TableCell align="center" colSpan={columns.length}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            }

            {data?.map(item => (
              <TableRow key={getItemId(item)}>
                {columns.map((column) => (
                  <TableCell key={`${getItemId(item)}_${column.fieldKey}`}>
                    {getItemField(item, column.fieldKey)}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {error &&
              <TableRow key="error">
                <TableCell align="center" colSpan={columns.length}>
                  <Typography variant="body1" color="error">
                    Error: {error}
                  </Typography>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && count && (
        <RigSyncPagination
          page={pagination.page}
          limit={pagination.limit}
          count={count}
          setPage={pagination.setPage}
          setLimit={pagination.setLimit}
        />
      )}
    </Stack>
  );
};

export default RigSyncTable;