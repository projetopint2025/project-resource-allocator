import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function ProjectTasks() {
  const tasks = [
    { id: 1, name: "Análise de Requisitos", status: "Concluído", assignee: "João Silva", deadline: "2024-03-15" },
    { id: 2, name: "Desenvolvimento Frontend", status: "Em Progresso", assignee: "Maria Santos", deadline: "2024-04-01" },
    { id: 3, name: "Testes de Integração", status: "Pendente", assignee: "Ana Pereira", deadline: "2024-04-15" },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tarefa</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Responsável</TableHead>
          <TableHead>Prazo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.name}</TableCell>
            <TableCell>
              <Badge variant={task.status === "Concluído" ? "default" : "secondary"}>
                {task.status}
              </Badge>
            </TableCell>
            <TableCell>{task.assignee}</TableCell>
            <TableCell>{task.deadline}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
