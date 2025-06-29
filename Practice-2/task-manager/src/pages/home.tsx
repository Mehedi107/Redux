import { AddNewTask } from '@/components/AddNewTask';
import TaskCard from '@/components/TaskCard';
import { useAppSelector } from '@/store/hooks';

export default function Home() {
  const taskAll = useAppSelector(state => state.todo.tasks);

  return (
    <div className=" max-w-6xl mx-auto space-y-5">
      <AddNewTask />
      {taskAll.map(task => (
        <TaskCard task={task} />
      ))}
    </div>
  );
}
