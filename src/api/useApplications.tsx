// ...existing code...
import { useQuery } from "@tanstack/react-query";

import { api } from ".";
import type { Application } from "../types";

const fetchApplications = async (): Promise<Application[]> => {
  const resp = await api.get<Application[]>("/api/applications");
  return resp.data;
};

export const useApplications = () => {
  return useQuery<Application[], Error>({
    queryKey: ["applications"],
    queryFn: fetchApplications,
    staleTime: 1000 * 60,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
