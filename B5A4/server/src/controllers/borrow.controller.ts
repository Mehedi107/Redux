import { Request, Response } from 'express';
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/book.model';
import mongoose from 'mongoose';

// ✅ Borrow a book
export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { bookId, quantity, dueDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const book = await Book.findById(bookId);

    if (!book || book.copies < quantity) {
      return res.status(400).json({ message: 'Not enough copies available' });
    }

    // Create borrow record
    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });

    // Update book copies and availability
    book.copies -= quantity;
    book.available = book.copies > 0;
    await book.save();

    res.status(201).json({ message: 'Book borrowed successfully', borrow });
  } catch (error) {
    res.status(500).json({ message: 'Failed to borrow book', error });
  }
};

// ✅ Borrow summary (total quantity borrowed per book)
export const getBorrowSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
      {
        $unwind: '$bookDetails',
      },
      {
        $project: {
          _id: 0,
          bookId: '$bookDetails._id',
          title: '$bookDetails.title',
          isbn: '$bookDetails.isbn',
          totalQuantity: 1,
        },
      },
    ]);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get borrow summary', error });
  }
};
