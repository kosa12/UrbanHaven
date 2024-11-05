import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';

interface Author {
  key: string;
  name: string;
}

interface AuthorSearchProps {
  onAuthorSelect: (authorId: string) => void;
}

const AuthorSearch: React.FC<AuthorSearchProps> = ({ onAuthorSelect }) => {
  const [authors, setAuthors] = useState<Author[]>([]);

  const handleSearch = async (query: string) => {
    if (query) {
      const response = await axios.get(`https://openlibrary.org/search/authors.json?q=${query}`);
      setAuthors(response.data.docs);
    } else {
      setAuthors([]);
    }
  };

  const handleAuthorSelect = (authorId: string) => {
    onAuthorSelect(authorId);
  };

  return (
    <Autocomplete
      options={authors}
      getOptionLabel={(option) => option.name}
      onInputChange={(event, value) => handleSearch(value)}
      onChange={(event, newValue) => handleAuthorSelect(newValue?.key)}
      renderInput={(params) => <TextField {...params} label="Search for an author" />}
      renderOption={(props, option) => (
        <li {...props} key={option.key}>
          {option.name}
        </li>
      )}
    />
  );
};

export default AuthorSearch;
