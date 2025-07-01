import { CreateUser } from '@/components/CreateUser';
import { Card } from '@/components/ui/card';
import { useAppSelector } from '@/store/hooks';

export default function User() {
  const users = useAppSelector(state => state.user.users);
  console.log(users);
  return (
    <>
      <div className="max-w-5xl mx-auto">
        <CreateUser />
        <div className="grid grid-cols-3 gap-5 mt-5">
          {users.map(user => (
            <Card key={user.name} className="text-center">
              {user.name}
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
