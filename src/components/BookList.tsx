import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Container,
  Skeleton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import '../styles/BookList.css';

interface Book {
  key: string;
  title: string;
  description?: string;
  covers?: number[];
  cover_i?: number;
}

interface BookListProps {
  authorId: string;
}

const placeholderBooks = Array.from({ length: 5 }, (_, i) => ({ id: `placeholder-${i}` }));

function BookList({ authorId }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ entries: Book[] }>(
          `https://openlibrary.org/authors/${authorId}/works.json?limit=10`
        );
        const fetchedBooks = response.data.entries.slice(0, 5).map((book) => ({
          ...book,
          cover_i: book.covers?.[0],
        }));
        setBooks(fetchedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    if (authorId) {
      fetchBooks();
    }
  }, [authorId]);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };

  return (
    <Container className="container">
      <Grid container spacing={3}>
      {loading
        ? placeholderBooks.map((placeholder) => (
            <Grid item xs={12} sm={6} md={4} key={placeholder.id}>
              <Card className="skeleton-card-container">
                <Skeleton variant="rectangular" className="skeleton-card"/>
                <CardContent className="skeleton-content">
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                </CardContent>
              </Card>
            </Grid>
          ))
        : books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.key}>
              <Card className="card" onClick={() => handleBookSelect(book)}>
                <CardMedia
                  className="card-media"
                  component="img"
                  image={
                    book.covers && book.covers.length > 0
                      ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`
                      : '/images/booklist_placeholder.png'
                  }
                  alt={book.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div" noWrap>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {book.description || 'No description available'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} aria-labelledby="book-dialog-title">
        <DialogTitle id="book-dialog-title">
          {selectedBook?.title}
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="dialog-content">
          <Box>
            {selectedBook && selectedBook.cover_i ? (
              <CardMedia
                component="img"
                loading="lazy"
                image={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`}
                alt={selectedBook.title}
                onError={(e) => {
                  e.currentTarget.src = '/images/book_cover_placeholder.gif';
                }}
                className="dialog-media"
              />
            ) : (
              <CardMedia
                component="img"
                image="/images/book_cover_placeholder.gif"
                alt="No cover available"
                className="dialog-media"
              />
            )}
            <Box marginLeft={2}>
              <Typography variant="body1" paragraph>
                {selectedBook?.description || 'No description available'}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default BookList;
