import { useAppDispatch } from '@/store/hooks';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export default function FilterTab() {
  const dispatch = useAppDispatch();

  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger onClick={() => {}} value="all">
          All
        </TabsTrigger>
        <TabsTrigger onClick={() => {}} value="low">
          Low
        </TabsTrigger>
        <TabsTrigger onClick={() => {}} value="medium">
          Medium
        </TabsTrigger>
        <TabsTrigger onClick={() => {}} value="high">
          High
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
