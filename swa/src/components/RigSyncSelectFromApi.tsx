import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import useListApi, { RigSyncListResponse } from "../hooks/useListApi";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect } from "react";

interface RigSyncSelectFromApiProps<T, K extends string | number> {
  label: string;
  value: K;
  setValue: (value: K) => void;
  getKey: (item: T) => K;
  renderOption: (item: T) => React.ReactNode;
  listRequest: (
    params: { page: number; limit: number },
    options?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<RigSyncListResponse<T>>>;
  page?: number;
  limit?: number;
}

const RigSyncSelectFromApi = <T, K extends string | number>({
  label,
  value,
  setValue,
  listRequest,
  getKey,
  renderOption,
  page = 1,
  limit = 10,
}: RigSyncSelectFromApiProps<T, K>) => {
  const {
    response,
    isLoading,
    error,
    makeRequest,
  } = useListApi<T>();

  const fetchItems = () => {
    makeRequest((options?: AxiosRequestConfig) =>
      listRequest({ page, limit }, options),
    );
  };

  // keep the dependencies minimal; callers can control page/limit themselves
  // if they want to trigger refetches.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchItems, [page, limit]);

  const slug = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      {isLoading && <CircularProgress />}

      {!isLoading && !error && response && (
        <FormControl required variant="standard" sx={{ m: 1, minWidth: 140 }}>
          <InputLabel id={`${slug}-select-label`}>{label}</InputLabel>
          <Select
            labelId={`${slug}-select-label`}
            id={`${slug}-select`}
            value={value}
            onChange={(e) => {
              setValue(e.target.value as K);
            }}
            label={label}
          >
            {response.items.map((item) => (
              <MenuItem key={getKey(item)} value={getKey(item)}>
                {renderOption(item)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {error && (
        <Typography variant="body1" color="error">
          Error: {error}
        </Typography>
      )}
    </>
  );
};

export default RigSyncSelectFromApi;
