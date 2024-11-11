import React, { useState } from 'react';
import { Container, Typography, Modal, Box } from '@mui/material';
import AuthorSearch from './components/AuthorSearch';
import BookList from './components/BookList';

interface Book {
  cover_i: number;
  title: string;
}

function App() {
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        OpenLibrary Client
      </Typography>
      <AuthorSearch onAuthorSelect={(authorId) => setSelectedAuthor(authorId)} />
      {selectedAuthor && <BookList authorId={selectedAuthor} onBookSelect={(book) => setSelectedBook(book)} />}
      <Modal open={Boolean(selectedBook)} onClose={() => setSelectedBook(null)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: 600,
            padding: 3,
            margin: 'auto',
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
            boxShadow: 3,
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
          }}
        >
          {selectedBook && (
            <img
              src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-M.jpg`}
              alt={selectedBook.title}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = '/images/book_cover_placeholder.gif';
              }}
            />
          )}
        </Box>
      </Modal>
    </Container>
  );
}

export default App;
