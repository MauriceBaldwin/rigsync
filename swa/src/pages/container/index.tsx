import { useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import { Container, Stack, Typography } from "@mui/material";
import { type ContainerResponse, containerList } from "../../api";
import RigSyncTable from "../../components/RigSyncTable";
import RigSyncAddRow from "../../components/RigSyncAddRow";
import useListApi from "../../hooks/useListApi";
import usePagination from "../../hooks/usePagination";
import { useNavigate } from "react-router";
import CreateForm from "../../components/forms/container/CreateForm";
import useSuccessTimer from "../../hooks/useSuccess";

const Containers = () => {
  const pagination = usePagination();
  const navigate = useNavigate();
  const { showSuccess, setShowSuccess } = useSuccessTimer();

  const {
    response,
    isLoading,
    error,
    makeRequest,
    append,
  } = useListApi<ContainerResponse>();

  const onCreate = (item: ContainerResponse) => {
    setShowSuccess(true);
    append(item);
  };

  const fetchContainers = () => {
    makeRequest(
      (options?: AxiosRequestConfig) =>
        containerList(
          {
            page: pagination.page,
            limit: pagination.limit,
          },
          options,
        ),
    );
  };

  const columns = [
    { title: "Manufacturer", fieldKey: "manufacturer" },
    { title: "Model", fieldKey: "model" },
  ];

  const navigateToContainer = (id: string): void => {
    void navigate(id);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchContainers, [pagination.page, pagination.limit]);

  return (
    <Stack spacing={4} alignItems="baseline">
      <Typography variant="h1" color="primary">
        Containers
      </Typography>

      <Container disableGutters sx={{ width: "100%" }}>
        <RigSyncTable
          columns={columns}
          data={response?.items.map((item) => ({ ...item }))}
          count={response?.count}
          pagination={pagination}
          error={error}
          isLoading={isLoading}
          editable
          onEdit={navigateToContainer}
        >
          <RigSyncAddRow
            columnCount={columns.length + 1}
            entityName="Container"
            showSuccess={showSuccess}
          >
            <CreateForm onCreate={onCreate} />
          </RigSyncAddRow>
        </RigSyncTable>
      </Container>
    </Stack>
  );
};

export default Containers;
