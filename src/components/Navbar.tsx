import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import Link from 'next/link';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" passHref>
          <Button color="inherit">Home</Button>
        </Link>
        <Link href="/create" passHref>
          <Button color="inherit">Create</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
