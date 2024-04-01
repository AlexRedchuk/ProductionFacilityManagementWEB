"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TEquipmentTypeFormCValidator } from "@/lib/validators/equipmentTypes-form-validator";

export const columns: ColumnDef<TEquipmentTypeFormCValidator>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "area",
    header: "Area needed",
  },
];
