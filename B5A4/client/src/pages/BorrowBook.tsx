import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';

import {
  useGetSingleBookQuery,
  useCreateBorrowMutation,
} from '@/store/features/apiSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import toast from 'react-hot-toast';

const borrowSchema = z.object({
  quantity: z.coerce.number().min(1, 'Must borrow at least 1 copy'),
  dueDate: z.string().refine(val => dayjs(val).isAfter(dayjs()), {
    message: 'Due date must be in the future',
  }),
});

type BorrowFormData = z.infer<typeof borrowSchema>;

const BorrowBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading } = useGetSingleBookQuery(bookId!);
  const [createBorrow] = useCreateBorrowMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BorrowFormData>({
    resolver: zodResolver(borrowSchema),
  });

  const onSubmit = async (data: BorrowFormData) => {
    console.log('from form', data);
    if (!bookId) return;

    if ((book?.copies || 0) < data.quantity) {
      toast.error('Not enough book available');
      return;
    }

    try {
      await createBorrow({ bookId, ...data });
      toast.success('Borrowed Successfully');
    } catch (error) {
      console.log(error);
      toast.success('Something went wrong');
    } finally {
      navigate('/');
    }
  };

  if (isLoading)
    return <p className="text-center mt-8">Loading book info...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">📥 Borrow Book</h2>
      <Card className="p-6 space-y-6">
        {/* ✅ Detailed Book Info */}
        <div className="space-y-1 text-sm ">
          <p>
            <strong>📖 Title:</strong> {book?.title}
          </p>
          <p>
            <strong>✍️ Author:</strong> {book?.author}
          </p>
          <p>
            <strong>🏷️ Genre:</strong> {book?.genre}
          </p>
          <p>
            <strong>📦 Available Copies:</strong> {book?.copies}
          </p>
        </div>

        {/* ✅ Borrow Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className="mb-1 block">Quantity</Label>
            <Input type="number" {...register('quantity')} />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-1 block">Due Date</Label>
            <Input type="date" {...register('dueDate')} />
            {errors.dueDate && (
              <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Confirm Borrow
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default BorrowBook;
