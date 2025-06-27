import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router';
import {
  Link,
  Stack,
  Typography,
} from '@mui/material';

import { type MainCanopiesResponse, mainCanopyList } from '../api';
import useApi from '../hooks/useApi';
import RigSyncTable from '../components/RigSyncTable';
import usePagination from '../hooks/usePagination';
import CreateMainCanopyForm from '../components/forms/CreateMainCanopyForm';

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
    <Stack spacing={4}>
      <Typography variant="h1">Main canopies</Typography>

      <RigSyncTable
        columns={columns}
        data={response?.items.map(item => ({ ...item }))}
        count={response?.count}
        pagination={pagination}
        error={error}
        isLoading={isLoading}
      />

      <Link variant="body1" component={RouterLink} to="/">Home</Link>

      <CreateMainCanopyForm />
    </Stack>
  );
};

export default Examples;