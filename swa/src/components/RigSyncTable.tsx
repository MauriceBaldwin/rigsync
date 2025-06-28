import { PropsWithChildren, useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import RigSyncPagination from "./RigSyncPagination";
import { UsePagination } from "../hooks/usePagination";

interface RigSyncTableColumn {
  title: string;
  fieldKey: string;
}

type RigSyncTableData = Record<string, unknown>;

interface RigSyncTableProps extends PropsWithChildren {
  columns: RigSyncTableColumn[];
  data?: RigSyncTableData[];
  count?: number;
  pagination?: UsePagination;
  error?: string
  isLoading?: boolean
  editable?: boolean
  onEdit?: (id: string) => void
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
  editable,
  onEdit,
  children,
}: RigSyncTableProps) => {
  const [columnCount, setColumnCount] = useState(0);

  useEffect(() => {
    setColumnCount(editable ? columns.length + 1 : columns.length);
  }, [editable, columns]);

  return (
    <Stack spacing={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.fieldKey}>{column.title}</TableCell>
              ))}

              {editable && <TableCell></TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading &&
              <TableRow>
                <TableCell align="center" colSpan={columnCount}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            }

            {data?.map(item => (
              <TableRow
                key={getItemId(item)}
                hover={editable}
                sx={editable ? { cursor: 'pointer' } : {}}
                onClick={() => {
                  if (editable && onEdit) onEdit(getItemId(item));
                }}
              >
                {columns.map((column) => (
                  <TableCell key={`${getItemId(item)}_${column.fieldKey}`}>
                    {getItemField(item, column.fieldKey)}
                  </TableCell>
                ))}

                {editable &&
                  <TableCell>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                }
              </TableRow>
            ))}

            {error &&
              <TableRow>
                <TableCell align="center" colSpan={columnCount}>
                  <Typography variant="body1" color="error">
                    Error: {error}
                  </Typography>
                </TableCell>
              </TableRow>
            }

            {children}
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