import React, { useState } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';
import '../styles/AuthorSearch.css';

interface Author {
  key: string;
  name: string;
}

interface AuthorSearchProps {
  onAuthorSelect: (authorId: string) => void;
}

function AuthorSearch({ onAuthorSelect }: AuthorSearchProps) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (query) {
      setLoading(true);
      try {
        const response = await axios.get(`https://openlibrary.org/search/authors.json?q=${query}`);
        setAuthors(response.data.docs.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch authors', error);
      } finally {
        setLoading(false);
      }
    } else {
      setAuthors([]);
    }
  };

  return (
    <Autocomplete
      className="autocomplete-root"
      options={authors}
      getOptionLabel={(option) => option.name}
      onInputChange={(event, value) => handleSearch(value)}
      onChange={(event, newValue) => onAuthorSelect(newValue?.key || '')}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for an author"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress className="loading-spinner" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.key}>
          {option.name}
        </li>
      )}
    />
  );
}

export default AuthorSearch;
