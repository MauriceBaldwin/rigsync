import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AxiosRequestConfig } from 'axios';
import {
  Container,
  Stack,
  Typography,
} from '@mui/material';

import { type AadResponse, aADList } from '../../api';
import CreateForm from '../../components/forms/aad/CreateForm';
import RigSyncAddRow from
  '../../components/RigSyncAddRow';
import RigSyncTable from '../../components/RigSyncTable';
import useListApi from '../../hooks/useListApi';
import usePagination from '../../hooks/usePagination';
import useSuccessTimer from '../../hooks/useSuccess';

const AADs = () => {
  const pagination = usePagination();
  const navigate = useNavigate();
  const { showSuccess, setShowSuccess } = useSuccessTimer();

  const {
    response,
    isLoading,
    error,
    makeRequest,
    append,
  } = useListApi<AadResponse>();


  const onCreate = (item: AadResponse) => {
    setShowSuccess(true);
    append(item);
  };

  const fetchAADs = () => {
    makeRequest(
      (options?: AxiosRequestConfig) => aADList(
        {
          page: pagination.page,
          limit: pagination.limit,
        },
        options,
      ));
  };

  const columns = [
    { title: 'Manufacturer', fieldKey: 'manufacturer' },
    { title: 'Model', fieldKey: 'model' },
  ];

  const navigateToAAD = (id: string): void => {
    void navigate(id);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchAADs, [pagination.page, pagination.limit]);

  return (
    <Stack spacing={4} alignItems="baseline">
      <Typography variant="h1" color="primary">AADs</Typography>

      <Container disableGutters sx={{ width: "100%" }}>
        <RigSyncTable
          columns={columns}
          data={response?.items.map(item => ({ ...item }))}
          count={response?.count}
          pagination={pagination}
          error={error}
          isLoading={isLoading}
          editable
          onEdit={navigateToAAD}
        >
          <RigSyncAddRow
            columnCount={columns.length + 1}
            entityName="AAD"
            showSuccess={showSuccess}
          >
            <CreateForm onCreate={onCreate} />
          </RigSyncAddRow>
        </RigSyncTable>
      </Container>
    </Stack>
  );
};

export default AADs;