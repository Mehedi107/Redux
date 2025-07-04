import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router';
import { useCreateBookMutation } from '@/store/features/apiSlice';
import toast from 'react-hot-toast';

const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  genre: z.string().min(1),
  isbn: z.string().min(10),
  description: z.string().optional(),
  copies: z.coerce.number().min(1),
});

type BookFormData = z.infer<typeof bookSchema>;

const CreateBook = () => {
  const navigate = useNavigate();
  const [createBook] = useCreateBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  const onSubmit = async (data: BookFormData) => {
    try {
      await createBook(data);
      toast.success('Book create successfully');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
      toast;
    }
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">➕ Add New Book</h2>
      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className="mb-2 block">Title</Label>
            <Input {...register('title')} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2 block">Author</Label>
            <Input {...register('author')} />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2 block">Genre</Label>
            <Input {...register('genre')} />
            {errors.genre && (
              <p className="text-red-500 text-sm">{errors.genre.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2 block">ISBN</Label>
            <Input {...register('isbn')} />
            {errors.isbn && (
              <p className="text-red-500 text-sm">{errors.isbn.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2 block">Copies</Label>
            <Input type="number" {...register('copies')} />
            {errors.copies && (
              <p className="text-red-500 text-sm">{errors.copies.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2 block">Description</Label>
            <Textarea rows={3} {...register('description')} />
          </div>

          <Button type="submit" className="mt-2 w-full">
            Create Book
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateBook;
