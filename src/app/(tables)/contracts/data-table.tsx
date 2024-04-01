"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Contract } from "@/lib/validators/contract-form-validator";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<Contract, TValue>[];
  data: Contract[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
        

          {data.length ? (
            data.map((contract) => {
              return (
                <TableRow key={contract.contractNumber}>
                  {Object.keys(contract).map((key) => {
                    if (key === "facility") {
                      return (
                        <TableCell key={key}>
                          <div className="flex flex-col">
                            <span>
                              <span className="font-bold">Facility: </span>
                              {contract.facility.description}
                            </span>
                            <span>
                              <span className="font-bold">Total area: </span>
                              {contract.facility.equipmentArea}
                            </span>
                            <span>
                              <span className="font-bold"> Used area: </span>
                              {contract.facility.areaUsed}
                            </span>
                          </div>
                        </TableCell>
                      );
                    }
                    if (key === "equipmentTypeToQuantities") {
                      return (
                        <TableCell key={key}>
                          {contract.equipmentTypeToQuantities.map((el, i) => {
                            return (
                              <div key={el.equipmentType.code} className="flex flex-col">
                                <span>
                                  <span className="font-bold">
                                    {" "}
                                    Equipment type:{" "}
                                  </span>
                                  {el.equipmentType.description}
                                </span>
                                <span>
                                  <span className="font-bold">Quantity </span>{" "}
                                  {el.quantity}
                                </span>
                                {i + 1 !==
                                contract.equipmentTypeToQuantities.length ? (
                                  <div className="w-full h-0.5 bg-neutral-500" />
                                ) : null}
                              </div>
                            );
                          })}
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={key}>{contract.contractNumber}</TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
