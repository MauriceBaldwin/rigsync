import { useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';
import {
  Container,
  Stack,
  Typography,
} from '@mui/material';

import { type MainCanopyResponse, mainCanopyList } from '../../api';
import RigSyncTable from '../../components/RigSyncTable';
import RigSyncAddRow from
  '../../components/RigSyncAddRow';
import useListApi from '../../hooks/useListApi';
import usePagination from '../../hooks/usePagination';
import { useNavigate } from 'react-router';
import CreateForm from '../../components/forms/mainCanopy/CreateForm';
import useSuccessTimer from '../../hooks/useSuccess';

const MainCanopies = () => {
  const pagination = usePagination();
  const navigate = useNavigate();
  const { showSuccess, setShowSuccess } = useSuccessTimer();

  const {
    response,
    isLoading,
    error,
    makeRequest,
    append,
  } = useListApi<MainCanopyResponse>();


  const onCreate = (item: MainCanopyResponse) => {
    setShowSuccess(true);
    append(item);
  };

  const fetchMainCanopies = () => {
    makeRequest(
      (options?: AxiosRequestConfig) => mainCanopyList(
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
          <RigSyncAddRow
            columnCount={columns.length + 1}
            entityName="Main canopy"
            showSuccess={showSuccess}
          >
            <CreateForm onCreate={onCreate} />
          </RigSyncAddRow>
        </RigSyncTable>
      </Container>
    </Stack>
  );
};

export default MainCanopies;