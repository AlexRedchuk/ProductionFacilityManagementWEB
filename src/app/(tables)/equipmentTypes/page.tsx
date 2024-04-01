"use client"
import { columns } from "./columns";
import { DataTable } from "@/lib/ui/data-table";
import facilityManagement from "@/APIs/facilityManagement";
import { useEffect, useState } from "react";
import {  buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getRole } from "@/lib/utils/auth";
import { TEquipmentTypeFormCValidator } from "@/lib/validators/equipmentTypes-form-validator";

export default function Page() {
  const [equipmentTypes, setEquipmentTypes] = useState<
    TEquipmentTypeFormCValidator[]
  >([]);

  useEffect(() => {
    async function getData() {
      const res = await facilityManagement.get<TEquipmentTypeFormCValidator[]>(
        `/api/EquipmentType`
      );
      setEquipmentTypes(res.data)
    }
    getData()
  }, [])
 
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={equipmentTypes} />
      { getRole() === 'Operator' || getRole() === "Admin" ? (<Link href="/equipmentTypes/create" className={cn(buttonVariants(), "mt-4")}>
        Create Equipment type
      </Link>) : null}
      
    </div>
  );
}
