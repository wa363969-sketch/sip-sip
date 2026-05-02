import type { Category, Product } from "@/backend.d";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORY_LABELS } from "@/types";
import { useEffect, useState } from "react";

const EMPTY_FORM = {
  name: "",
  description: "",
  category: "hotDrinks" as Category,
  priceInCents: "",
  imageUrl: "",
  calories: "",
  fat: "",
  carbs: "",
  protein: "",
  available: true,
};

type FormValues = typeof EMPTY_FORM;

interface AdminProductFormProps {
  initial?: Product | null;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
  isPending?: boolean;
}

export function AdminProductForm({
  initial,
  onSubmit,
  onCancel,
  isPending = false,
}: AdminProductFormProps) {
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name,
        description: initial.description,
        category: initial.category as Category,
        priceInCents: String(initial.priceInCents),
        imageUrl: initial.imageUrl,
        calories: String(initial.nutritionalInfo.calories),
        fat: String(initial.nutritionalInfo.fat),
        carbs: String(initial.nutritionalInfo.carbs),
        protein: String(initial.nutritionalInfo.protein),
        available: initial.available,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [initial]);

  const set = (key: keyof FormValues, val: string | boolean) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: initial?.id ?? crypto.randomUUID(),
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      priceInCents: BigInt(Math.round(Number(form.priceInCents) * 100)),
      imageUrl: form.imageUrl.trim(),
      nutritionalInfo: {
        calories: BigInt(Math.round(Number(form.calories))),
        fat: Number(form.fat),
        carbs: Number(form.carbs),
        protein: Number(form.protein),
      },
      available: form.available,
    };
    onSubmit(product);
  };

  const isEditing = !!initial;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
      data-ocid="product_form"
    >
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="pf-name">Name</Label>
        <Input
          id="pf-name"
          required
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Iced Caramel Macchiato"
          data-ocid="product_form.name_input"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="pf-desc">Description</Label>
        <Textarea
          id="pf-desc"
          rows={2}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="A sweet and refreshing iced espresso beverage…"
          data-ocid="product_form.description_textarea"
        />
      </div>

      {/* Category + Price */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pf-cat">Category</Label>
          <Select
            value={form.category}
            onValueChange={(v) => set("category", v)}
          >
            <SelectTrigger id="pf-cat" data-ocid="product_form.category_select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {CATEGORY_LABELS[cat]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pf-price">Price ($)</Label>
          <Input
            id="pf-price"
            type="number"
            step="0.01"
            min="0"
            required
            value={form.priceInCents}
            onChange={(e) => set("priceInCents", e.target.value)}
            placeholder="5.75"
            data-ocid="product_form.price_input"
          />
        </div>
      </div>

      {/* Image URL */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="pf-img">Image URL</Label>
        <Input
          id="pf-img"
          value={form.imageUrl}
          onChange={(e) => set("imageUrl", e.target.value)}
          placeholder="https://example.com/product.jpg"
          data-ocid="product_form.image_url_input"
        />
      </div>

      {/* Nutritional Info */}
      <fieldset className="border border-border rounded-xl p-4 flex flex-col gap-3">
        <legend className="text-sm font-semibold text-muted-foreground px-1">
          Nutritional Info
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              ["calories", "Calories (kcal)"],
              ["fat", "Fat (g)"],
              ["carbs", "Carbs (g)"],
              ["protein", "Protein (g)"],
            ] as [keyof FormValues, string][]
          ).map(([key, label]) => (
            <div key={key} className="flex flex-col gap-1">
              <Label
                htmlFor={`pf-${key}`}
                className="text-xs text-muted-foreground"
              >
                {label}
              </Label>
              <Input
                id={`pf-${key}`}
                type="number"
                min="0"
                step="0.1"
                value={form[key] as string}
                onChange={(e) => set(key, e.target.value)}
                placeholder="0"
                data-ocid={`product_form.${key}_input`}
              />
            </div>
          ))}
        </div>
      </fieldset>

      {/* Available toggle */}
      <div className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
        <span className="text-sm font-medium">Available for ordering</span>
        <Switch
          checked={form.available}
          onCheckedChange={(v) => set("available", v)}
          data-ocid="product_form.available_switch"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          data-ocid="product_form.cancel_button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-primary text-primary-foreground rounded-xl"
          data-ocid="product_form.submit_button"
        >
          {isPending ? "Saving…" : isEditing ? "Save Changes" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
