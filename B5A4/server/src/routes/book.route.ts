import express from 'express';
import {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} from '../controllers/book.controller';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', createBook);
router.get('/:id', getSingleBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
