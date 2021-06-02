import { useQuery } from "react-query";
import { getRelationships } from "../api/services/relationships";
import { getBindings } from "../api/services/bindings";

export const useBindings = () => {
  return useQuery(
    "bindings",
    async () => {
      return getBindings();
    },

     //dsada
    {
      refetchInterval: 60 * 60,
    }
  );
};
