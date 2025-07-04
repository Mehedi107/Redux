import { Request, Response } from 'express';
import { Book } from '../models/book.model';

// ✅ Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create book', error });
  }
};

// ✅ Get all books (with pagination)
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const books = await Book.find().skip(skip).limit(limit);
    const total = await Book.countDocuments();

    res.json({ data: books, total });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get books', error });
  }
};

// ✅ Get a single book
export const getSingleBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get book', error });
  }
};

// ✅ Update book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: 'Book not found' });

    // Update availability if copies = 0
    if (updated.copies === 0) {
      updated.available = false;
      await updated.save();
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update book', error });
  }
};

// ✅ Delete book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: 'Book not found' });

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book', error });
  }
};
