import { createActor } from "@/backend";
import type { Category, Order, OrderStatus, Product } from "@/backend.d";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAdminOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminGetAllOrders();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10_000,
  });
}

export function useAdminUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: bigint;
      status: OrderStatus;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.adminUpdateOrderStatus(id, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminOrders"] }),
  });
}

export function useAdminProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["adminProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMenuItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminAddProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error("Not connected");
      await actor.adminAddProduct(product);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProducts"] }),
  });
}

export function useAdminUpdateProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error("Not connected");
      await actor.adminUpdateProduct(product);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProducts"] }),
  });
}

export function useAdminDeleteProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.adminDeleteProduct(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProducts"] }),
  });
}

export function useAdminSetProductAvailability() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      available,
    }: {
      id: string;
      available: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.adminSetProductAvailability(id, available);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProducts"] }),
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export type { Category, Order, OrderStatus, Product };
