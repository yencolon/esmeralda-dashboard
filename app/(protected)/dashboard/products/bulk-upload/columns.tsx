"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { PreProduct } from "@/interfaces/rest/products/PreProduct";
import { Button } from "@/components/ui/button";
import { CircleArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableColumnsProps<T> {
  onPublish: (value: T) => void;
}

export const getColumns = ({
  onPublish,
}: DataTableColumnsProps<PreProduct>): ColumnDef<PreProduct>[] => [
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
    accessorKey: "code",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Código" />;
    },
    cell: ({ row }) => {
      const code = row.getValue("code") as string;
      return (
        <div className="font-medium">
          {code || (
            <span className="text-muted-foreground italic">Sin código</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nombre" />;
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return (
        <div className="font-medium">
          {name || (
            <span className="text-muted-foreground italic">Sin nombre</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="max-w-[300px] truncate">
          {description || (
            <span className="text-muted-foreground italic">Sin descripción</span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const hasRequiredFields = product.code && product.name;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPublish(product)}
            disabled={!hasRequiredFields}
            className={cn(
              "gap-2",
              !hasRequiredFields && "opacity-50 cursor-not-allowed"
            )}
          >
            Publicar
            <CircleArrowRight className="h-5 w-5 text-green-500" />
          </Button>
          
        </div>
      );
    },
  },
];
