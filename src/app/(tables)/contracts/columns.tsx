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
import { Contract } from "@/lib/validators/contract-form-validator";

export const columns: ColumnDef<Contract>[] = [
  {
    accessorKey: "contactNumber",
    header: "Contract number",
  },
  {
    accessorKey: "facility.description",
    header: "Facility",
  },

  {
    accessorKey: "equipment",
    header: "Equipment"
  }
  
];
