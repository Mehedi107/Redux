import { Link } from 'react-router';
import { Button } from './ui/button';
import { Card } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from '@/store/features/apiSlice';

const Books = () => {
  const { data, isLoading } = useGetAllBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  if (isLoading) return <p className="text-center">Loading books...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">📚 All Books</h1>
        <Link to="/create-book">
          <Button>Add New Book</Button>
        </Link>
      </div>

      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map(book => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>
                  {book.available ? (
                    <span className="text-green-600 font-semibold">
                      Available
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Unavailable
                    </span>
                  )}
                </TableCell>
                <TableCell className="space-x-2">
                  <Link to={`/edit-book/${book._id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Link to={`/borrow/${book._id}`}>
                    <Button variant="secondary" size="sm">
                      Borrow
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteBook(book._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Books;
