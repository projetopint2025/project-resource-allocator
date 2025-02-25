import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Calendar, 
  Download, 
  FileText, 
  Sparkles, 
  Clock, 
  Activity, 
  ArrowUpDown, 
  Filter, 
  Check, 
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

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
  userName?: string;
}

export function RelatorioUser({ year, onYearChange, data, userName = "Vasco Fernandes" }: RelatorioUserProps) {
  const [allocations, setAllocations] = useState<WorkPackageAllocation[]>(data);
  const [targetTotals, setTargetTotals] = useState<number[]>(Array(12).fill(0.8)); // Valores padrão mais realistas
  const [viewMonth, setViewMonth] = useState<number | null>(null); // null significa todos os meses
  const { toast } = useToast();
  const navigate = useNavigate();

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  const handleAllocationChange = (
    wpIndex: number,
    taskIndex: number,
    timeIndex: number,
    value: string
  ) => {
    // Validar entrada
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
                          k === timeIndex ? 0 : alloc
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
        description: "Por favor, insira um número válido.",
        variant: "destructive",
      });
      return;
    }

    if (numValue < 0) {
      toast({
        title: "Entrada inválida",
        description: "Por favor, insira um número maior ou igual a 0.",
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
                        k === timeIndex ? numValue : alloc
                      ),
                    }
                  : task
              ),
            }
          : wp
      )
    );
  };

  const handleTargetTotalChange = (timeIndex: number, value: string) => {
    if (value === "") {
      setTargetTotals((prev) => {
        const newTargetTotals = [...prev];
        newTargetTotals[timeIndex] = 0;
        return newTargetTotals;
      });
      return;
    }

    const numValue = parseFloat(value);

    if (isNaN(numValue)) {
      toast({
        title: "Entrada inválida",
        description: "Por favor, insira um número válido.",
        variant: "destructive",
      });
      return;
    }

    if (numValue < 0) {
      toast({
        title: "Valor inválido",
        description: "O valor deve ser maior ou igual a 0.",
        variant: "destructive",
      });
      return;
    }

    setTargetTotals((prev) => {
      const newTargetTotals = [...prev];
      newTargetTotals[timeIndex] = numValue;
      return newTargetTotals;
    });
  };

  const calculateMonthTotal = useCallback(
    (timeIndex: number): number => {
      return allocations.reduce(
        (sum, wp) =>
          sum +
          wp.tasks.reduce(
            (taskSum, task) => taskSum + task.allocations[timeIndex],
            0
          ),
        0
      );
    },
    [allocations]
  );

  const calculateAvailable = useCallback(
    (timeIndex: number): number => {
      return targetTotals[timeIndex] - calculateMonthTotal(timeIndex);
    },
    [targetTotals, calculateMonthTotal]
  );

  const calculatePercentage = useCallback(
    (timeIndex: number): number => {
      return targetTotals[timeIndex] === 0 
        ? 0 
        : (calculateMonthTotal(timeIndex) / targetTotals[timeIndex]) * 100;
    },
    [targetTotals, calculateMonthTotal]
  );

  const getVisibleMonths = () => {
    if (viewMonth === null) {
      return months.map((_, index) => index);
    } else {
      return [viewMonth];
    }
  };

  const calculateWPAllocations = useCallback(
    (tasks: TaskAllocation[]) => {
      return Array(12)
        .fill(0)
        .map((_, monthIndex) => {
          return tasks.reduce((sum, task) => sum + task.allocations[monthIndex], 0);
        });
    },
    []
  );

  const getStatusColor = (percentage: number) => {
    if (percentage > 95 && percentage < 105) return "text-green-500";
    if (percentage >= 105) return "text-red-500"; 
    if (percentage < 95 && percentage >= 80) return "text-amber-500";
    return "text-red-500";
  };
  
  const getProgressColor = (percentage: number) => {
    if (percentage > 95 && percentage < 105) return "bg-gradient-to-r from-green-400 to-green-500";
    if (percentage >= 105) return "bg-gradient-to-r from-red-400 to-red-500"; 
    if (percentage < 95 && percentage >= 80) return "bg-gradient-to-r from-amber-400 to-amber-500";
    return "bg-gradient-to-r from-red-400 to-red-500";
  };

  const calculateTotalYearAllocation = useCallback(() => {
    return Array(12)
      .fill(0)
      .map((_, i) => calculateMonthTotal(i))
      .reduce((a, b) => a + b, 0);
  }, [calculateMonthTotal]);

  const calculateTotalYearTarget = useCallback(() => {
    return targetTotals.reduce((a, b) => a + b, 0);
  }, [targetTotals]);

  const calculateAverageEfficiency = useCallback(() => {
    return (
      Array(12)
        .fill(0)
        .reduce((sum, _, i) => sum + calculatePercentage(i), 0) / 12
    );
  }, [calculatePercentage]);

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        <Card className="glass-card border-white/20 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:translate-y-[-2px] bg-gradient-to-br from-white/80 to-white/50">
          <div className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-50/70 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-blue-100/80 border border-blue-100/50">
              <Clock className="h-6 w-6 text-customBlue" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tempo Total Alocado</p>
              <p className="text-2xl font-bold">
                {calculateTotalYearAllocation().toFixed(1)}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="glass-card border-white/20 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:translate-y-[-2px] bg-gradient-to-br from-white/80 to-white/50">
          <div className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-green-50/70 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-green-100/80 border border-green-100/50">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">WorkPackages</p>
              <p className="text-2xl font-bold">{allocations.length}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card border-white/20 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:translate-y-[-2px] bg-gradient-to-br from-white/80 to-white/50">
          <div className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-50/70 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-amber-100/80 border border-amber-100/50">
              <Activity className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Meses Sobrealoc.</p>
              <p className="text-2xl font-bold">
                {Array(12).fill(0).filter((_, i) => calculateAvailable(i) < 0).length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass-card border-white/20 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:translate-y-[-2px] bg-gradient-to-br from-white/80 to-white/50">
          <div className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-purple-50/70 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-purple-100/80 border border-purple-100/50">
              <BarChart className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Eficiência Média</p>
              <p className="text-2xl font-bold">
                {calculateAverageEfficiency().toFixed(0)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Seletor de mês */}
      <div className="px-6 flex items-center justify-end gap-2">
        <Select 
          value={viewMonth !== null ? viewMonth.toString() : "todos"} 
          onValueChange={(value) => setViewMonth(value === "todos" ? null : parseInt(value))}
        >
          <SelectTrigger className="w-[160px] rounded-full border-gray-200 bg-white/70 shadow-md backdrop-blur-sm text-gray-700 focus:ring-2 focus:ring-customBlue/20 hover:shadow-lg transition-all duration-300 ease-in-out">
            <SelectValue placeholder="Mês" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-gray-200 bg-white/80 backdrop-blur-md shadow-lg">
            <SelectItem value="todos" className="text-gray-700 hover:bg-white/90 transition-all duration-300 ease-in-out">
              Todos os meses
            </SelectItem>
            {months.map((month, index) => (
              <SelectItem 
                key={index} 
                value={index.toString()} 
                className="text-gray-700 hover:bg-white/90 transition-all duration-300 ease-in-out"
              >
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {viewMonth !== null && (
          <Badge variant="outline" className="bg-white/70 px-3 py-1.5 gap-1 flex items-center rounded-full border-gray-200 shadow-sm">
            <Calendar className="h-3.5 w-3.5 text-customBlue" />
            <span className="text-gray-700 font-medium">{months[viewMonth]}</span>
          </Badge>
        )}
      </div>

      {/* Tabela de alocações */}
      <div className="border-t border-white/20 pt-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gradient-to-b from-gray-50/80 to-white/60 backdrop-blur-sm">
              <TableRow className="border-b border-white/20 hover:bg-transparent">
                <TableHead className="w-[300px] text-sm font-medium text-gray-700 py-4">
                  <div className="flex items-center gap-1">
                    WorkPackage/Tarefa
                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-gray-400 hover:text-customBlue">
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </div>
                </TableHead>
                {getVisibleMonths().map((monthIndex) => (
                  <TableHead key={monthIndex} className="text-right w-24 text-sm font-medium text-gray-700">
                    {months[monthIndex]}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocations.map((wp, wpIndex) => (
                <React.Fragment key={wp.name}>
                  <TableRow className="bg-white/10 hover:bg-white/30 transition-all duration-200">
                    <TableCell className="font-semibold text-gray-900">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-customBlue/10 border border-customBlue/30 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-customBlue" />
                        </div>
                        {wp.name}
                      </div>
                    </TableCell>
                    {getVisibleMonths().map((monthIndex) => (
                      <TableCell key={monthIndex} className="text-right">
                        <Badge variant="outline" className="bg-white/70 backdrop-blur-sm px-3 py-1 text-gray-700 shadow-sm border-gray-200 font-medium">
                          {calculateWPAllocations(wp.tasks)[monthIndex].toFixed(1)}
                        </Badge>
                      </TableCell>
                    ))}
                  </TableRow>
                  {wp.tasks.map((task, taskIndex) => (
                    <TableRow key={task.id} className="hover:bg-white/10 backdrop-blur-sm transition-all duration-200">
                      <TableCell className="pl-8 text-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-md bg-gray-100 flex items-center justify-center">
                            <Activity className="h-3 w-3 text-gray-500" />
                          </div>
                          {task.name}
                        </div>
                      </TableCell>
                      {getVisibleMonths().map((monthIndex) => (
                        <TableCell key={monthIndex} className="text-right py-3">
                          <div className="relative flex justify-end">
                            <Input
                              type="number"
                              step="0.1"
                              value={task.allocations[monthIndex] === 0 ? "" : task.allocations[monthIndex].toFixed(1)}
                              onChange={(e) => handleAllocationChange(wpIndex, taskIndex, monthIndex, e.target.value)}
                              className="w-20 text-right text-gray-900 border border-gray-200 rounded-md focus:ring-customBlue/50 focus:border-customBlue/50 shadow-sm hover:shadow-md transition-all duration-200"
                              placeholder="0.0"
                            />
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="bg-gray-50/70 backdrop-blur-sm">
                <TableCell className="text-gray-700 font-medium">Disponível</TableCell>
                {getVisibleMonths().map((monthIndex) => {
                  const available = calculateAvailable(monthIndex);
                  return (
                    <TableCell
                      key={monthIndex}
                      className={cn(
                        "text-right font-medium transition-colors duration-300",
                        available < 0 
                          ? "text-red-500" 
                          : available < 0.1 
                            ? "text-amber-500" 
                            : "text-green-500"
                      )}
                    >
                      {available.toFixed(1)}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow className="bg-white">
                <TableCell className="text-gray-700 font-medium">Total Definido</TableCell>
                {getVisibleMonths().map((monthIndex) => (
                  <TableCell key={monthIndex} className="text-right">
                    <div className="relative flex justify-end">
                      <Input
                        type="number"
                        step="0.1"
                        value={targetTotals[monthIndex] === 0 ? "" : targetTotals[monthIndex].toFixed(1)}
                        onChange={(e) => handleTargetTotalChange(monthIndex, e.target.value)}
                        className="w-20 text-right text-gray-900 border border-gray-200 rounded-md font-medium focus:ring-customBlue/50 shadow-sm hover:shadow-md transition-all duration-200"
                        placeholder="0.0"
                      />
                    </div>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="bg-white">
                <TableCell className="text-gray-700 font-medium">Total Alocado</TableCell>
                {getVisibleMonths().map((monthIndex) => (
                  <TableCell key={monthIndex} className="text-right text-gray-700 font-medium">
                    {calculateMonthTotal(monthIndex).toFixed(1)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="bg-gray-50/70 backdrop-blur-sm">
                <TableCell className="text-gray-700 font-medium">Progresso</TableCell>
                {getVisibleMonths().map((monthIndex) => {
                  const percentage = calculatePercentage(monthIndex);
                  return (
                    <TableCell key={monthIndex} className="pt-3 pb-3">
                      <div className="flex flex-col items-end gap-1">
                        <div className="w-full">
                          <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={getProgressColor(percentage)}
                              style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
                              role="progressbar"
                              aria-valuenow={percentage > 100 ? 100 : percentage}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            ></div>
                          </div>
                        </div>
                        <span className={cn("text-xs font-medium", getStatusColor(percentage))}>
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
      
      {/* Rodapé com informações */}
      <div className="p-4 flex justify-between items-center bg-gray-50/40 backdrop-blur-sm">
        <div className="text-sm text-gray-500">
          {viewMonth === null 
            ? `Exibindo todos os meses de ${year}` 
            : `Exibindo ${months[viewMonth]} de ${year}`}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1 rounded-full px-3">
            <Check className="h-3 w-3 text-green-500" />
            Guardar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
}
