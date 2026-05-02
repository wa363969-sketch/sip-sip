import { e as useActor, p as useQuery, i as createActor } from "./index-YPr-t_r6.js";
import { O as OrderStatus } from "./backend.d-D8GxpAUG.js";
function useOrders() {
  var _a;
  const { actor, isFetching } = useActor(createActor);
  const query = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyOrders();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5e3
  });
  const activeOrders = ((_a = query.data) == null ? void 0 : _a.filter((o) => o.status !== OrderStatus.pickedUp)) ?? [];
  return {
    orders: query.data ?? [],
    activeOrders,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch
  };
}
export {
  useOrders as u
};
