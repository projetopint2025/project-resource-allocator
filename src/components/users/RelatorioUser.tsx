import * as React from "react";
import { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { format } from "date-fns";

interface TaskAllocation {
  id: number;
  name: string;
  workpackage: string;
  allocations: number[];
}

interface WorkPackageAllocation {
  name: string;
  tasks: TaskAllocation[];
}

interface RelatorioUserProps {
  year: number;
  onYearChange: (year: number) => void;
  data: WorkPackageAllocation[];
}

export function RelatorioUser({ year, onYearChange, data }: RelatorioUserProps) {
  const [allocations, setAllocations] = useState<WorkPackageAllocation[]>(data);
  const [targetTotals, setTargetTotals] = useState<number[]>(Array(12).fill(0));
  const { toast } = useToast();

  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ];

  const calculateWPAllocations = useCallback(
    (tasks: TaskAllocation[]) => {
      return Array(12)
        .fill(0)
        .map((_, monthIndex) => {
          return tasks.reduce((sum, task) => sum + task.allocations[monthIndex], 0);
        });
    },
    [year]
  );

  const handleAllocationChange = (
    wpIndex: number,
    taskIndex: number,
    monthIndex: number,
    value: string
  ) => {
    if (value === "") {
      setAllocations((prev) =>
        prev.map((wp, i) =>
          i === wpIndex
            ? {
                ...wp,
                tasks: wp.tasks.map((task, j) =>
                  j === taskIndex
                    ? {
                        ...task,
                        allocations: task.allocations.map((alloc, k) =>
                          k === monthIndex ? 0 : alloc
                        ),
                      }
                    : task
                ),
              }
            : wp
        )
      );
      return;
    }

    const numValue = parseFloat(value);

    if (isNaN(numValue)) {
      toast({
        title: "Entrada inválida",
        description: "Por favor, insira um número válido entre 0 e 1.",
        variant: "destructive",
      });
      return;
    }

    if (numValue < 0 || numValue > 1.0) {
      toast({
        title: "Entrada inválida",
        description: "Por favor, insira um número válido entre 0 e 1.0.",
        variant: "destructive",
      });
      return;
    }

    setAllocations((prev) =>
      prev.map((wp, i) =>
        i === wpIndex
          ? {
              ...wp,
              tasks: wp.tasks.map((task, j) =>
                j === taskIndex
                  ? {
                      ...task,
                      allocations: task.allocations.map((alloc, k) =>
                        k === monthIndex ? numValue : alloc
                      ),
                    }
                  : task
              ),
            }
          : wp
      )
    );
  };

  const handleTargetTotalChange = (monthIndex: number, value: string) => {
    if (value === "") {
      setTargetTotals((prev) => {
        const newTargetTotals = [...prev];
        newTargetTotals[monthIndex] = 0;
        return newTargetTotals;
      });
      return;
    }

    const numValue = parseInt(value, 10);

    if (isNaN(numValue)) {
      toast({
        title: "Entrada inválida",
        description: "Por favor, insira um número válido.",
        variant: "destructive",
      });
      return;
    }

    const newValue = numValue;

    setTargetTotals((prev) => {
      const newTargetTotals = [...prev];
      newTargetTotals[monthIndex] = newValue;
      return newTargetTotals;
    });
  };

  const calculateMonthTotal = useCallback(
    (monthIndex: number): number => {
      return allocations.reduce(
        (sum, wp) =>
          sum +
          wp.tasks.reduce((taskSum, task) => taskSum + task.allocations[monthIndex], 0),
        0
      );
    },
    [allocations]
  );

  const calculateAvailable = useCallback(
    (monthIndex: number): number => {
      return targetTotals[monthIndex] - calculateMonthTotal(monthIndex);
    },
    [targetTotals, calculateMonthTotal]
  );

  return (
    <Card className="border-none shadow-lg rounded-2xl bg-white">
      <CardHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Relatório de Alocação</h2>
        <Select value={year.toString()} onValueChange={(value) => onYearChange(parseInt(value))}>
          <SelectTrigger className="w-[120px] rounded-md border-gray-200 text-gray-700 focus:ring-customBlue/50">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent className="rounded-md border-gray-200">
            {[2023, 2024, 2025, 2026, 2027, 2028].map((y) => (
              <SelectItem key={y} value={y.toString()} className="text-gray-700 hover:bg-gray-50">
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100">
              <TableHead className="w-[300px] text-sm font-medium text-gray-700">WorkPackage/Tarefa</TableHead>
              {months.map((month) => (
                <TableHead key={month} className="text-right w-20 text-sm font-medium text-gray-700">
                  {month}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {allocations.map((wp, wpIndex) => (
              <React.Fragment key={wp.name}>
                <TableRow className="bg-gray-50 hover:bg-gray-100">
                  <TableCell className="font-semibold text-gray-900">{wp.name}</TableCell>
                  {calculateWPAllocations(wp.tasks).map((total, monthIndex) => (
                    <TableCell key={monthIndex} className="text-right text-gray-700">
                      {total.toFixed(1)}
                    </TableCell>
                  ))}
                </TableRow>
                {wp.tasks.map((task, taskIndex) => (
                  <TableRow key={task.id} className="hover:bg-gray-50">
                    <TableCell className="pl-6 text-gray-600">{task.name}</TableCell>
                    {task.allocations.map((allocation, monthIndex) => (
<TableCell key={monthIndex} className="text-right">
  <Input
    type="number"
    value={allocation === 0 ? "" : allocation.toFixed(1)}
    onChange={(e) => handleAllocationChange(wpIndex, taskIndex, monthIndex, e.target.value)}
    className="w-16 text-right text-gray-900 border border-gray-200 rounded-md focus:ring-customBlue/50 shadow-sm"
    placeholder="0.0"
  />
</TableCell>
                    ))}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-gray-50">
              <TableCell className="text-gray-700 font-medium">Disponível</TableCell>
              {months.map((_, monthIndex) => {
                const available = calculateAvailable(monthIndex);
                return (
                  <TableCell
                    key={monthIndex}
                    className={`text-right font-medium ${
                      available < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {available.toFixed(1)}
                  </TableCell>
                );
              })}
            </TableRow>
<TableRow>
  <TableCell className="text-gray-700 font-medium">Total Definido</TableCell>
  {months.map((_, monthIndex) => (
    <TableCell key={monthIndex} className="text-right">
      <Input
        type="number"
        value={targetTotals[monthIndex]}
        onChange={(e) => handleTargetTotalChange(monthIndex, e.target.value)}
        className="w-16 text-right text-gray-900 border border-gray-200 rounded-md font-medium focus:ring-customBlue/50 shadow-sm"
        placeholder="0"
      />
    </TableCell>
  ))}
</TableRow>
            <TableRow className="bg-gray-50">
              <TableCell className="text-gray-700 font-medium">Total Alocado</TableCell>
              {months.map((_, monthIndex) => (
                <TableCell key={monthIndex} className="text-right text-gray-700 font-medium">
                  {calculateMonthTotal(monthIndex).toFixed(1)}
                </TableCell>
              ))}
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
