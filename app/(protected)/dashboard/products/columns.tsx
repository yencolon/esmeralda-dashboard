"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import ImageWithFallback from "@/components/image-with-fallback";
import { Product } from "@/interfaces/rest/products";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import DataTableRowActions from "@/components/data-table-row-actions";

interface DataTableColumnsProps<T> {
  onEdit: (value: T) => void;
  onDelete: (value: T) => void;
}

export const getColumns = ({
  onDelete,
  onEdit,
}: DataTableColumnsProps<Product>): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Imagen",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <ImageWithFallback
            src={row.original.pathImage}
            alt={row.original.name}
            width={100}
            objectFit="cover"
            className="rounded-lg"
            fallbackSrc="/next.svg"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nombre" />;
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "enabled",
    header: "Estado",
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.enabled ? "default" : "destructive"}>
          {row.original.enabled ? "Activa" : "Inactiva"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
      );
    },
  },
];
