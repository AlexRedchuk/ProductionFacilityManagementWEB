"use client"
import { columns } from "./columns";
import { DataTable } from "@/lib/ui/data-table";
import facilityManagement from "@/APIs/facilityManagement";
import { useEffect, useState } from "react";
import {  buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TFacilityFormCValidator } from "@/lib/validators/facility-form-validator";
import { getRole } from "@/lib/utils/auth";

export default function Page() {
  const [facilities, setFacilities] = useState<TFacilityFormCValidator[]>([]);

  useEffect(() => {
    async function getData() {
      const res = await facilityManagement.get<TFacilityFormCValidator[]>(
        `/api/ProductionFacility`
      );
      setFacilities(res.data)
    }
    getData()
  }, [])
 
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={facilities} />
      { getRole() === 'Operator' || getRole() === "Admin" ? (<Link href="/facilities/create" className={cn(buttonVariants(), "mt-4")}>
        Create facility
      </Link>) : null}
      
    </div>
  );
}
