import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProjectDocuments() {
  const documents = [
    { id: 1, name: "Especificação Técnica", type: "PDF", date: "2024-03-01" },
    { id: 2, name: "Manual do Usuário", type: "DOC", date: "2024-03-15" },
    { id: 3, name: "Relatório de Testes", type: "PDF", date: "2024-03-30" },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Documento</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {doc.name}
            </TableCell>
            <TableCell>{doc.type}</TableCell>
            <TableCell>{doc.date}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
