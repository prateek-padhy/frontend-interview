import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from ".";
import type { Application } from "../types";

type FetchResult = {
  items: Application[];
  nextPage?: number;
};

type FetchParams = {
  page?: number;
  limit?: number;
};

const fetchApplications = async ({
  page = 1,
  limit = 5,
}: FetchParams): Promise<FetchResult> => {
  const resp = await api.get<Application[]>(
    `/api/applications?_page=${page}&_limit=${limit}`
  );
  return { items: resp.data, nextPage: page + 1 };
};

export const useApplications = (limit = 5) => {
  return useInfiniteQuery<FetchResult, Error>({
    queryKey: ["applications", limit],
    queryFn: ({ pageParam = 1 }) =>
      fetchApplications({ page: pageParam as number, limit }),
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
    initialPageParam: 1,
  });
};
