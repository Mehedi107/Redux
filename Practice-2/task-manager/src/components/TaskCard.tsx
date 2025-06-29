import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, Flag } from 'lucide-react';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    isComplete: boolean;
    priority: 'low' | 'medium' | 'high';
  };
}

export default function TaskCard({ task }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-chart-2/10 text-chart-2 border-2 border-chart-2';
      case 'medium':
        return 'bg-chart-3/10 text-chart-3 border-2 border-chart-3';
      case 'high':
        return 'bg-destructive/10 text-destructive border-2 border-destructive';
      default:
        return '';
    }
  };

  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl font-semibold">{task.title}</CardTitle>
        <Badge
          className={`${getPriorityColor(
            task.priority
          )} px-2 py-1 text-xs rounded-md`}
        >
          {task.priority}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
        <div className="flex justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {task.dueDate}
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2
              className={`w-4 h-4 ${
                task.isComplete ? 'text-green-500' : 'text-gray-400'
              }`}
            />
            {task.isComplete ? 'Complete' : 'Pending'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
