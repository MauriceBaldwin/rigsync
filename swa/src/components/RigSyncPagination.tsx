import {
  Stack,
  Pagination,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { PAGINATION_LIMITS, UsePagination } from "../hooks/usePagination";

export interface RigSyncPaginationProps extends UsePagination {
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

  // find the first limit that is higher than the total count
  const maxLimit = PAGINATION_LIMITS.filter(limit => limit > count).at(0);

  // show limits up to and including the first that is higher than total count
  const limitOptions = maxLimit ?
    PAGINATION_LIMITS.filter(limit => limit <= maxLimit) :
    PAGINATION_LIMITS;

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
          size="small"
          onChange={(_, value: number) => { setLimit(value); }}
          aria-label="Items per page"
        >
          {limitOptions.map(limit => (
            <ToggleButton key={limit} value={limit} sx={{ px: 2 }}>
              {limit}
            </ToggleButton>),
          )}
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