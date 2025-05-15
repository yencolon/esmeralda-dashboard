"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/interfaces/rest/category";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import ImageWithFallback from "@/components/image-with-fallback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleArrowRight, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DataTableColumnsProps<T> {
  onEdit: (value: T) => void;
  onDelete: (value: T) => void;
}

export const getColumns = ({
  onDelete,
  onEdit,
}: DataTableColumnsProps<Category>): ColumnDef<Category>[] => [
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
    id: "editar",
    header: "Editar",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(row.original)}
            className="gap-2 cursor-pointer"
          >
            <CircleArrowRight className="h-5 w-5 text-green-500" />
          </Button>
        </div>
      );
    },
  },
  {
    id: "borrar",
    header: "Borrar",
    cell: ({ row }) => {
      return (
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 cursor-pointer"
              >
                <Trash className="h-5 w-5 text-destructive" />
              </Button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600 cursor-pointer"
                asChild
              >
                <Button variant="ghost" onClick={() => onDelete(row.original)}>
                  Continuar
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
