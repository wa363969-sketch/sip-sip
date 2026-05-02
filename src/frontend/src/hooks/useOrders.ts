import { createActor } from "@/backend";
import { OrderStatus } from "@/backend.d";
import type { Order } from "@/backend.d";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

// Stub orders hook — wires to backend when bindgen contract is available.
// Returns empty orders list for now; polling enabled when active orders exist.
export function useOrders() {
  const { actor, isFetching } = useActor(createActor);
  const query = useQuery<Order[]>({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyOrders();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5000,
  });

  const activeOrders =
    query.data?.filter((o) => o.status !== OrderStatus.pickedUp) ?? [];

  return {
    orders: query.data ?? [],
    activeOrders,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useOrderPolling() {
  const { activeOrders } = useOrders();
  const { actor, isFetching } = useActor(createActor);

  useQuery<Order[]>({
    queryKey: ["myOrders", "polling"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyOrders();
    },
    refetchInterval: activeOrders.length > 0 ? 5000 : false,
    enabled: !!actor && !isFetching && activeOrders.length > 0,
  });
}
