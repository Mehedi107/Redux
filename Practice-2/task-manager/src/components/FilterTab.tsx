import { useAppDispatch } from '@/store/hooks';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { updateFilter } from '@/store/features/taskSlice';

export default function FilterTab() {
  const dispatch = useAppDispatch();

  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger onClick={() => dispatch(updateFilter('all'))} value="all">
          All
        </TabsTrigger>
        <TabsTrigger onClick={() => dispatch(updateFilter('low'))} value="low">
          Low
        </TabsTrigger>
        <TabsTrigger
          onClick={() => dispatch(updateFilter('medium'))}
          value="medium"
        >
          Medium
        </TabsTrigger>
        <TabsTrigger
          onClick={() => dispatch(updateFilter('high'))}
          value="high"
        >
          High
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
