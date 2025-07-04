import { Card } from '@/components/ui/card';
import { useGetBorrowSummaryQuery } from '@/store/features/apiSlice';

const BorrowSummary = () => {
  const { data, isLoading, error } = useGetBorrowSummaryQuery(undefined);

  if (isLoading) return <p className="text-center mt-6">Loading summary...</p>;
  if (error)
    return (
      <p className="text-center mt-6 text-red-500">Failed to load summary.</p>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">📊 Borrow Summary</h2>
      <Card className="overflow-x-auto p-4">
        {data?.length === 0 ? (
          <p>No borrowed books yet.</p>
        ) : (
          <table className="min-w-full table-auto text-sm">
            <thead className="text-left">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">ISBN</th>
                <th className="px-4 py-2">Total Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: number) => (
                <tr key={item.bookId} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.isbn}</td>
                  <td className="px-4 py-2 font-semibold">
                    {item.totalQuantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default BorrowSummary;
