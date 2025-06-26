import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Pagination,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
} from "@mui/material";

interface RigSyncTableColumn {
  title: string;
  fieldKey: string;
}

type RigSyncTableData = Record<string, unknown>;

interface RigSyncTablePagination {
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

interface RigSyncTableProps {
  columns: RigSyncTableColumn[];
  data?: RigSyncTableData[];
  count?: number;
  pagination?: RigSyncTablePagination;
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
  const startIndex = pagination ?
    ((pagination.page - 1) * pagination.limit) + 1
    : undefined;

  const endIndex = pagination && count ?
    Math.min(
      ((pagination.page - 1) * pagination.limit) + pagination.limit,
      count,
    ) : undefined;

  const pageCount = pagination && count ?
    Math.ceil(count / pagination.limit)
    : undefined;

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
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Stack direction="row" spacing={2} alignItems="center">

            <Typography variant="body1">
              Items per page
            </Typography>

            <ToggleButtonGroup
              value={pagination.limit}
              exclusive
              onChange={(_, value: number) => { pagination.setLimit(value); }}
            >
              <ToggleButton value={2}>2</ToggleButton>
              <ToggleButton value={3}>3</ToggleButton>
              <ToggleButton value={5}>5</ToggleButton>
            </ToggleButtonGroup>

          </Stack>


          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Typography variant="body1">
              Showing {startIndex} to {endIndex} of {count}
            </Typography>
            {pageCount && pageCount > 1 && (
              <Pagination
                count={pageCount}
                page={pagination.page}
                onChange={(_, value) => { pagination.setPage(value); }}
              />
            )}
          </Stack>
        </Stack>

      )}

    </Stack>

  );
};

export default RigSyncTable;