import React, { useState } from 'react';
import { fetchPhoto } from './PhotosSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';

const Photos = () => {
  const dispatch = useAppDispatch();

  const [albumId, setAlbumId] = useState<number | null>(null);

  const search = () => {
    if (albumId) {
      dispatch(fetchPhoto({ id: albumId }));
    }
  };

  const photos = useAppSelector((state) => {
    return {
      photos: state.photosReducers.photo,
    };
  });

  console.log(photos);

  const onSearchValueChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setAlbumId(+event.target.value);
  };

  return (
    <div>
      <Box
        margin={5}
        display={'flex'}
        sx={{
          width: '95%',
        }}
      >
        <TextField
          fullWidth
          label="Album Id (1-100)"
          id="fullWidth"
          onChange={onSearchValueChange}
          type={'number'}
          //min-max value//
        />
        <Button onClick={search} variant="contained">
          Search
        </Button>
      </Box>
      <Box marginLeft={5.5}>
        {photos.photos &&
          photos.photos.map((photo) => <img src={photo.url} alt={'#'} />)}
      </Box>
    </div>
  );
};

export default Photos;
