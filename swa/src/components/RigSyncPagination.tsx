import {
  Stack,
  Pagination,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

export interface PaginationProps {
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

interface RigSyncPaginationProps extends PaginationProps {
  count: number;
}

const RigSyncPagination = ({
  page,
  limit,
  count,
  setPage,
  setLimit,
}: RigSyncPaginationProps) => {
  const startIndex = ((page - 1) * limit) + 1;
  const endIndex = Math.min(((page - 1) * limit) + limit, count);
  const pageCount = Math.ceil(count / limit);

  return (
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
          value={limit}
          exclusive
          onChange={(_, value: number) => { setLimit(value); }}
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
            page={page}
            onChange={(_, value) => { setPage(value); }}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default RigSyncPagination;