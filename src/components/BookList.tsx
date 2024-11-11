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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

interface BookListProps {
  authorId: string;
  onBookSelect: (book: any) => void;
}

const BookList: React.FC<BookListProps> = ({ authorId, onBookSelect }) => {
  const [books, setBooks] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(`https://openlibrary.org/authors/${authorId}/works.json?limit=10`);
      setBooks(response.data.entries.slice(0, 5));
    };

    if (authorId) {
      fetchBooks();
    }
  }, [authorId]);

  const handleBookSelect = (book: any) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };

  const renderCoverImage = () => {
    if (selectedBook && selectedBook.covers && selectedBook.covers.length > 0) {
      const coverId = selectedBook.covers[0];
      const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
      return (
        <CardMedia
          component="img"
          image={coverUrl}
          alt={selectedBook.title}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => (e.currentTarget.src = '/images/book_cover_placeholder.gif')}
          style={{ maxWidth: '200px', marginRight: '20px' }}
        />
      );
    }
    return (
      <CardMedia
        component="img"
        image="/images/book_cover_placeholder.gif"
        alt="No cover available"
        style={{ maxWidth: '200px', marginRight: '20px' }}
      />
    );
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.key}>
            <Card
              onClick={() => handleBookSelect(book)}
              style={{
                cursor: 'pointer',
                maxHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardMedia
                component="img"
                height="150"
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
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" alignItems="center">
            {renderCoverImage()}
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
};

export default BookList;
