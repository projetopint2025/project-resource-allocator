
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const mockNotifications = [
  {
    id: 1,
    title: "Nova tarefa atribuída",
    description: "Você foi designado para a tarefa 'Análise de Requisitos' no projeto INOVC+",
    type: "task",
    read: false,
    date: "2024-03-15T10:00:00",
  },
  {
    id: 2,
    title: "Validação pendente",
    description: "O relatório final do projeto DreamFAB aguarda sua validação",
    type: "validation",
    read: true,
    date: "2024-03-14T15:30:00",
  },
  {
    id: 3,
    title: "Milestone atingido",
    description: "O projeto IAMFat completou com sucesso o milestone 'Fase 1'",
    type: "milestone",
    read: false,
    date: "2024-03-13T09:15:00",
  },
];

export function NotificationsPopover() {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-gray-100 rounded-full"
        >
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 p-0 bg-white rounded-xl shadow-xl border border-gray-100"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Notificações</h3>
          <Button variant="ghost" size="sm" className="text-sm text-gray-500 hover:text-gray-700">
            Marcar tudo como lido
          </Button>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="divide-y divide-gray-100">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 hover:bg-gray-50 transition-colors cursor-pointer",
                  !notification.read && "bg-blue-50/50"
                )}
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {notification.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(notification.date).toLocaleDateString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-gray-100">
          <Button
            variant="ghost"
            className="w-full justify-center text-sm text-customBlue hover:bg-blue-50"
          >
            Ver todas as notificações
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
