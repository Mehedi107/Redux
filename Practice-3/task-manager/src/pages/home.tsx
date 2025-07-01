import { AddNewTask } from '@/components/AddNewTask';
import FilterTab from '@/components/FilterTab';
import TaskCard from '@/components/TaskCard';
import { useGetTaskAllQuery } from '@/store/api/baseApi';

export default function Home() {
  const { data, isError, isLoading } = useGetTaskAllQuery(undefined);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className=" max-w-3xl mx-auto space-y-10 mt-10">
      <div className="flex justify-between ">
        <AddNewTask />
        <FilterTab />
      </div>
      {data.tasks.map((task: any) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}
