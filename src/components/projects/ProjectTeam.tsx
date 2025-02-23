import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProjectTeam() {
  const team = [
    { name: "João Silva", role: "Project Manager", email: "joao@example.com" },
    { name: "Maria Santos", role: "Developer", email: "maria@example.com" },
    { name: "Ana Pereira", role: "Designer", email: "ana@example.com" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {team.map((member) => (
        <Card key={member.email}>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{member.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{member.email}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
