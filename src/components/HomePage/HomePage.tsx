import React from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-around'}
      alignItems={'center'}
      height={'100vh'}
    >
      <Button component={Link} to="/photos" variant="contained" size={'large'}>
        Photos
      </Button>
      <Button component={Link} to="/todos" variant="contained" size={'large'}>
        Todos
      </Button>
    </Box>
  );
};

export default HomePage;
