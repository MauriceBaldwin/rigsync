import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router';
import {
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material';

import { type MainCanopiesResponse, mainCanopyList } from '../api';
import RigSyncTable from '../components/RigSyncTable';
import CreateMainCanopyTableForm from
  '../components/forms/CreateMainCanopyTableForm';
import useApi from '../hooks/useApi';
import usePagination from '../hooks/usePagination';

const Examples = () => {
  const pagination = usePagination();

  const {
    response,
    isLoading,
    error,
    makeRequest,
  } = useApi<MainCanopiesResponse>();

  const fetchMainCanopies = () => {
    makeRequest(() => mainCanopyList({
      page: pagination.page,
      limit: pagination.limit,
    }));
  };

  const columns = [
    { title: 'Manufacturer', fieldKey: 'manufacturer' },
    { title: 'Model', fieldKey: 'model' },
    { title: 'Size (ft\u00B2)', fieldKey: 'size' },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchMainCanopies, [pagination.page, pagination.limit]);

  return (
    <Container maxWidth="lg">
      <Stack spacing={4} alignItems="baseline">
        <Typography variant="h1">Main canopies</Typography>

        <Container disableGutters sx={{ width: "100%" }}>
          <RigSyncTable
            columns={columns}
            data={response?.items.map(item => ({ ...item }))}
            count={response?.count}
            pagination={pagination}
            error={error}
            isLoading={isLoading}
          >
            <CreateMainCanopyTableForm columnCount={columns.length} />
          </RigSyncTable>
        </Container>

        <Link variant="body1" component={RouterLink} to="/">Home</Link>
      </Stack>
    </Container>
  );
};

export default Examples;