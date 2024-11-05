import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Dialog, DialogContent, DialogTitle, IconButton, Box, Typography } from '@mui/material';
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
      const response = await axios.get(`https://openlibrary.org/authors/${authorId}/works.json?limit=100`);
      setBooks(response.data.entries.slice(0, 5));
    };

    if (authorId) {
      fetchBooks();
    }
  }, [authorId]);

  const handleBookSelect = (book: any) => {
    setSelectedBook(book);
    console.log('selectedBook:', selectedBook);
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
        <img src={coverUrl} alt={selectedBook.title} style={{ maxWidth: '150px', marginRight: '20px' }} />
      );
    }
    return <div style={{ padding: '20px', textAlign: 'center' }}>No cover available</div>;
  };

  return (
    <div>
      <List>
        {books.map((book) => (
          <ListItem
            component="button"
            key={book.key}
            onClick={() => handleBookSelect(book)}
          >
            <ListItemText primary={book.title} />
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose} aria-labelledby="book-dialog-title" aria-describedby="book-dialog-description">
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
            <Box>
              <Typography variant="body1" paragraph>
                {selectedBook?.description || 'No description available'}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookList;
