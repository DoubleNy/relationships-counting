import { useQuery } from "react-query";
import { getRelationships } from "../api/services/relationships";

export const useRelationships = () => {
  return useQuery(
    "relationships",
    async () => {
      return getRelationships();
    },
    {
      refetchInterval: 60 * 60,
    }
  );
};
