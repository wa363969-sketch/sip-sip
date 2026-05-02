import { type Order, OrderStatus, type Product } from "@/backend.d";
import { AdminProductForm } from "@/components/AdminProductForm";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAdminAddProduct,
  useAdminDeleteProduct,
  useAdminOrders,
  useAdminProducts,
  useAdminSetProductAvailability,
  useAdminUpdateOrderStatus,
  useAdminUpdateProduct,
  useIsAdmin,
} from "@/hooks/useAdmin";
import {
  CATEGORY_LABELS,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
  formatPrice,
} from "@/types";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

// ---------- helpers ----------

function truncate(s: string, n = 12) {
  if (!s) return "—";
  return s.length > n ? `${s.slice(0, n)}…` : s;
}

function tsToDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleString();
}

const STATUS_FLOW: OrderStatus[] = [
  OrderStatus.placed,
  OrderStatus.preparing,
  OrderStatus.ready,
  OrderStatus.pickedUp,
];

// ---------- Products Tab ----------

function ProductsTab() {
  const { data: products = [], isLoading } = useAdminProducts();
  const addMut = useAdminAddProduct();
  const updateMut = useAdminUpdateProduct();
  const deleteMut = useAdminDeleteProduct();
  const availMut = useAdminSetProductAvailability();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (p: Product) => {
    setEditing(p);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleSubmit = (product: Product) => {
    if (editing) {
      updateMut.mutate(product, { onSuccess: closeModal });
    } else {
      addMut.mutate(product, { onSuccess: closeModal });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 p-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-14 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4" data-ocid="admin.products_tab">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-muted-foreground">
          {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
        <Button
          type="button"
          size="sm"
          className="bg-primary text-primary-foreground rounded-xl gap-1.5"
          onClick={openAdd}
          data-ocid="admin.add_product_button"
        >
          <Plus size={14} />
          Add Product
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-muted/60">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Name</th>
              <th className="text-left px-4 py-3 font-semibold">Category</th>
              <th className="text-right px-4 py-3 font-semibold">Price</th>
              <th className="text-center px-4 py-3 font-semibold">Available</th>
              <th className="text-right px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p, idx) => (
              <tr
                key={p.id}
                className="bg-card hover:bg-muted/30 transition-colors"
                data-ocid={`admin.product.item.${idx + 1}`}
              >
                <td className="px-4 py-3 font-medium max-w-[200px] truncate">
                  {p.name}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {CATEGORY_LABELS[p.category]}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {formatPrice(Number(p.priceInCents))}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <Switch
                      checked={p.available}
                      onCheckedChange={(val) =>
                        availMut.mutate({ id: p.id, available: val })
                      }
                      aria-label={`Toggle availability for ${p.name}`}
                      data-ocid={`admin.product.available_switch.${idx + 1}`}
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={`Edit ${p.name}`}
                      onClick={() => openEdit(p)}
                      data-ocid={`admin.product.edit_button.${idx + 1}`}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={`Delete ${p.name}`}
                      className="text-destructive hover:text-destructive"
                      onClick={() => deleteMut.mutate(p.id)}
                      data-ocid={`admin.product.delete_button.${idx + 1}`}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-12 text-muted-foreground"
                  data-ocid="admin.products.empty_state"
                >
                  No products yet. Add your first product.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto scrollbar-green"
          data-ocid="admin.product.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editing ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>
          <AdminProductForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            isPending={addMut.isPending || updateMut.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- Order Row ----------

function OrderRow({ order, idx }: { order: Order; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  const updateStatus = useAdminUpdateOrderStatus();

  return (
    <>
      <tr
        className="bg-card hover:bg-muted/30 transition-colors cursor-pointer"
        onClick={() => setExpanded((v) => !v)}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && setExpanded((v) => !v)
        }
        data-ocid={`admin.order.item.${idx + 1}`}
        tabIndex={0}
      >
        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
          #{String(order.id)}
        </td>
        <td className="px-4 py-3 font-mono text-xs">
          {truncate(order.customerId.toString(), 14)}
        </td>
        <td className="px-4 py-3 text-center tabular-nums">
          {order.items.reduce((s, i) => s + Number(i.quantity), 0)}
        </td>
        <td className="px-4 py-3 text-right tabular-nums">
          {formatPrice(Number(order.totalInCents))}
        </td>
        <td className="px-4 py-3">
          <Badge
            className={`text-xs rounded-full px-2.5 py-0.5 ${
              ORDER_STATUS_COLORS[
                order.status as keyof typeof ORDER_STATUS_COLORS
              ]
            }`}
          >
            {
              ORDER_STATUS_LABELS[
                order.status as keyof typeof ORDER_STATUS_LABELS
              ]
            }
          </Badge>
        </td>
        <td
          className="px-4 py-3"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Select
            value={order.status}
            onValueChange={(val) =>
              updateStatus.mutate({
                id: order.id,
                status: val as OrderStatus,
              })
            }
          >
            <SelectTrigger
              className="h-8 text-xs w-36"
              data-ocid={`admin.order.status_select.${idx + 1}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_FLOW.map((s) => (
                <SelectItem key={s} value={s} className="text-xs">
                  {ORDER_STATUS_LABELS[s as keyof typeof ORDER_STATUS_LABELS]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </td>
        <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
          {tsToDate(order.createdAt)}
        </td>
        <td className="px-3 py-3 text-muted-foreground">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </td>
      </tr>
      {expanded && (
        <tr className="bg-muted/20">
          <td colSpan={8} className="px-6 py-3">
            <ul className="flex flex-col gap-1">
              {order.items.map((item, ii) => (
                <li
                  key={`${item.productName}-${ii}`}
                  className="flex items-center justify-between text-xs text-muted-foreground"
                >
                  <span>
                    <span className="font-medium text-foreground">
                      {item.productName}
                    </span>{" "}
                    × {String(item.quantity)}
                  </span>
                  <span>
                    {formatPrice(
                      Number(item.priceInCents) * Number(item.quantity),
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </td>
        </tr>
      )}
    </>
  );
}

// ---------- Orders Tab ----------

function OrdersTab() {
  const { data: orders = [], isLoading } = useAdminOrders();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 p-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-14 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4" data-ocid="admin.orders_tab">
      <p className="text-sm text-muted-foreground px-1">
        {orders.length} order{orders.length !== 1 ? "s" : ""} · auto-refreshes
        every 10s
      </p>

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[780px] text-sm">
          <thead className="bg-muted/60">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">ID</th>
              <th className="text-left px-4 py-3 font-semibold">Customer</th>
              <th className="text-center px-4 py-3 font-semibold">Items</th>
              <th className="text-right px-4 py-3 font-semibold">Total</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
              <th className="text-left px-4 py-3 font-semibold">
                Update Status
              </th>
              <th className="text-left px-4 py-3 font-semibold">Date</th>
              <th className="px-3 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order, idx) => (
              <OrderRow key={String(order.id)} order={order} idx={idx} />
            ))}
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-12 text-muted-foreground"
                  data-ocid="admin.orders.empty_state"
                >
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- Unauthorized ----------

function Unauthorized() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center px-4"
      data-ocid="admin.unauthorized"
    >
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center text-3xl">
        🔒
      </div>
      <p className="font-display text-2xl font-bold">Access Denied</p>
      <p className="text-muted-foreground text-sm max-w-xs">
        You don't have admin permissions to view this page.
      </p>
      <Button
        asChild
        variant="outline"
        className="rounded-xl"
        data-ocid="admin.unauthorized.home_link"
      >
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
}

// ---------- Admin Body ----------

function AdminBody() {
  const { data: isAdmin, isLoading } = useIsAdmin();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-8 max-w-4xl mx-auto mt-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (!isAdmin) return <Unauthorized />;

  return (
    <div
      className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6"
      data-ocid="admin.page"
    >
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
          ☕
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold leading-tight">
            Admin Panel
          </h1>
          <p className="text-xs text-muted-foreground">
            Starbucks Miniature Store
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="products" data-ocid="admin.tabs">
        <TabsList className="rounded-xl bg-muted mb-4">
          <TabsTrigger
            value="products"
            className="rounded-lg"
            data-ocid="admin.products_tab_trigger"
          >
            Products
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="rounded-lg"
            data-ocid="admin.orders_tab_trigger"
          >
            Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <ProductsTab />
        </TabsContent>
        <TabsContent value="orders">
          <OrdersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ---------- Page ----------

export default function Admin() {
  return (
    <ProtectedRoute>
      <AdminBody />
    </ProtectedRoute>
  );
}
