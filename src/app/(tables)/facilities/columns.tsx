"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { TFacilityFormCValidator } from "@/lib/validators/facility-form-validator";

export const columns: ColumnDef<TFacilityFormCValidator>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "equipmentArea",
    header: "Equipment area",
  },
  {
    accessorKey: "areaUsed",
    header: "Used area",
  },
 
];
