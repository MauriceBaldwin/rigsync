import { useEffect } from 'react';
import {
  Container,
  Stack,
  Typography,
} from '@mui/material';

import { type MainCanopyResponse, mainCanopyList } from '../../api';
import RigSyncTable from '../../components/RigSyncTable';
import CreateMainCanopyTableForm from
  '../../components/forms/CreateMainCanopyTableForm';
import useListApi from '../../hooks/useListApi';
import usePagination from '../../hooks/usePagination';
import { useNavigate } from 'react-router';

const MainCanopies = () => {
  const pagination = usePagination();
  const navigate = useNavigate();

  const {
    response,
    isLoading,
    error,
    makeRequest,
    append,
  } = useListApi<MainCanopyResponse>();

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

  const navigateToMainCanopy = (id: string): void => {
    void navigate(id);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchMainCanopies, [pagination.page, pagination.limit]);

  return (
    <Stack spacing={4} alignItems="baseline">
      <Typography variant="h1" color="primary">Main canopies</Typography>

      <Container disableGutters sx={{ width: "100%" }}>
        <RigSyncTable
          columns={columns}
          data={response?.items.map(item => ({ ...item }))}
          count={response?.count}
          pagination={pagination}
          error={error}
          isLoading={isLoading}
          editable
          onEdit={navigateToMainCanopy}
        >
          <CreateMainCanopyTableForm
            columnCount={columns.length + 1}
            onCreate={append}
          />
        </RigSyncTable>
      </Container>
    </Stack>
  );
};

export default MainCanopies;