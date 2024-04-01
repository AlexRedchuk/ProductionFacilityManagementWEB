"use client"
import { columns } from "./columns";
import { DataTable } from "./data-table";
import facilityManagement from "@/APIs/facilityManagement";
import { useEffect, useState } from "react";
import {  buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getRole } from "@/lib/utils/auth";
import { Contract } from "@/lib/validators/contract-form-validator";

export default function Page() {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    async function getData() {
      const res = await facilityManagement.get<Contract[]>(`/api/Contract`);
      setContracts(res.data)
      
    }
    getData()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={contracts} />
      { getRole() === 'Client' || getRole() === "Admin" ? (<Link href="/contracts/create" className={cn(buttonVariants(), "mt-4")}>
        Create contract
      </Link>) : null}
      
    </div>
  );
}
