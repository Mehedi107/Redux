import { AddNewTask } from '@/components/AddNewTask';
import FilterTab from '@/components/FilterTab';
import TaskCard from '@/components/TaskCard';
import { selectFilterTask } from '@/store/features/taskSlice';
import { useAppSelector } from '@/store/hooks';

export default function Home() {
  const taskAll = useAppSelector(selectFilterTask);

  return (
    <div className=" max-w-6xl mx-auto space-y-5">
      <div className="flex justify-between ">
        <AddNewTask />
        <FilterTab />
      </div>
      {taskAll.map(task => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
}
