import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from '@/store/features/apiSlice';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  genre: z.string().min(1),
  isbn: z.string().min(10),
  description: z.string().optional(),
  copies: z.coerce.number().min(0),
});

type BookFormData = z.infer<typeof bookSchema>;

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading } = useGetSingleBookQuery(id!);
  const [updateBook] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  // Load book data into form
  useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        copies: book.copies,
      });
    }
  }, [book, reset]);

  const onSubmit = async (data: BookFormData) => {
    if (!id) return;

    try {
      await updateBook({ id, data });
      toast.success('Book create successfully');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    }
    navigate('/');
  };

  if (isLoading)
    return <p className="text-center mt-8">Loading book details...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">✏️ Edit Book</h2>
      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className="mb-1 block">Title</Label>
            <Input {...register('title')} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-1 block">Author</Label>
            <Input {...register('author')} />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-1 block">Genre</Label>
            <Input {...register('genre')} />
            {errors.genre && (
              <p className="text-red-500 text-sm">{errors.genre.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-1 block">ISBN</Label>
            <Input {...register('isbn')} />
            {errors.isbn && (
              <p className="text-red-500 text-sm">{errors.isbn.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-1 block">Copies</Label>
            <Input type="number" {...register('copies')} />
            {errors.copies && (
              <p className="text-red-500 text-sm">{errors.copies.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-1 block">Description</Label>
            <Textarea rows={3} {...register('description')} />
          </div>

          <Button type="submit" className="mt-2 w-full">
            Update Book
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default EditBook;
